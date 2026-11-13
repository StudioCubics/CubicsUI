"use client";

import {
  type ReactElement,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./RefractiveGlass.module.css";
import type {
  GlassCSSVariables,
  RefractiveGlassProps,
  Vector2D,
} from "./RefractiveGlass.types";
import { buildBevelDisplacementDataUri } from "./RefractiveGlass.utils";

export function RefractiveGlass({
  children,
  className,
  style,
  refractionScale = 32,
  bevelWidth = 10,
  blur = 2,
  reflectionIntensity = 0.3,
  br = 5.6,
  smoothing = 0.14,
  draggable = true,
  debug = false,
}: RefractiveGlassProps): ReactElement {
  const rawId = useId();
  const filterId = `refraction-filter-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({
    width: 320,
    height: 200,
  });
  const [svgBackdrop, setSvgBackdrop] = useState(false);

  useEffect(() => {
    // url() SVG filters in backdrop-filter only work in Chromium (Chrome/Edge)
    setSvgBackdrop(/Chrome\//.test(navigator.userAgent));
  }, []);
  // Dragging offset state
  const dragOffsetRef = useRef<Vector2D>({ x: 0, y: 0 });
  const dragStartRef = useRef<Vector2D | null>(null);

  // Pointer & smoothed unit vector state
  const pointerRef = useRef<Vector2D>({ x: 0, y: 0 });
  const smoothedVecRef = useRef<Vector2D>({ x: 0, y: -1 });

  // Track live card dimensions for accurate bevel map generation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setBoxSize({ width: el.offsetWidth, height: el.offsetHeight });
    });
    observer.observe(el);
    setBoxSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => observer.disconnect();
  }, []);

  // Track global pointer coordinates & run smooth ray-box reflection loop
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    let rafId = 0;

    const updateReflection = () => {
      const el = cardRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = pointerRef.current.x - cx;
        const dy = pointerRef.current.y - cy;
        const dist = Math.hypot(dx, dy);

        // Soft deadzone near center so crossing center never snaps violently
        const targetNx = dist > 1 ? dx / dist : smoothedVecRef.current.x;
        const targetNy = dist > 1 ? dy / dist : smoothedVecRef.current.y;

        const alpha = Math.max(0.01, Math.min(1, smoothing));
        let nx =
          smoothedVecRef.current.x +
          (targetNx - smoothedVecRef.current.x) * alpha;
        let ny =
          smoothedVecRef.current.y +
          (targetNy - smoothedVecRef.current.y) * alpha;

        const norm = Math.hypot(nx, ny) || 1;
        nx /= norm;
        ny /= norm;
        smoothedVecRef.current = { x: nx, y: ny };

        // Project ray from card center onto card perimeter: t = min((w/2)/|nx|, (h/2)/|ny|)
        const halfW = rect.width / 2;
        const halfH = rect.height / 2;
        const tx =
          Math.abs(nx) > 1e-4 ? halfW / Math.abs(nx) : Number.POSITIVE_INFINITY;
        const ty =
          Math.abs(ny) > 1e-4 ? halfH / Math.abs(ny) : Number.POSITIVE_INFINITY;
        const t = Math.min(tx, ty);

        // Card-local pixel coordinates (strictly 0..width and 0..height)
        const nearX = halfW + nx * t;
        const nearY = halfH + ny * t;
        const farX = halfW - nx * t;
        const farY = halfH - ny * t;
        // Distance normalized against the window (Manhattan, capped at 1), same as GlassCard
        const ndX = Math.min(Math.abs(dx) / window.innerWidth, 1);
        const ndY = Math.min(Math.abs(dy) / window.innerHeight, 1);
        const md = Math.min(ndX + ndY, 1);

        el.style.setProperty("--near-x", `${nearX.toFixed(1)}px`);
        el.style.setProperty("--near-y", `${nearY.toFixed(1)}px`);
        el.style.setProperty("--far-x", `${farX.toFixed(1)}px`);
        el.style.setProperty("--far-y", `${farY.toFixed(1)}px`);
        el.style.setProperty("--nx", nx.toFixed(4));
        el.style.setProperty("--ny", ny.toFixed(4));
        // Sheen radius scale: 1 when the pointer is at the card, shrinking to 0.3 at max distance
        el.style.setProperty("--sheen-scale", (1 - 0.7 * md).toFixed(3));
        // Near side and pointer: 1 -> 0.2. Far bounce: fades out quickly so it never competes with the near ball.
        el.style.setProperty("--near-light", (1 - 0.8 * md).toFixed(3));
        el.style.setProperty("--far-light", (0.8 * (1 - md) ** 3).toFixed(3));
        // Card-local pointer position for the pointer hotspot
        el.style.setProperty(
          "--mouse-x",
          `${(pointerRef.current.x - rect.left).toFixed(1)}px`,
        );
        el.style.setProperty(
          "--mouse-y",
          `${(pointerRef.current.y - rect.top).toFixed(1)}px`,
        );
      }

      rafId = requestAnimationFrame(updateReflection);
    };

    rafId = requestAnimationFrame(updateReflection);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [smoothing]);

  const displacementHref = useMemo(
    () =>
      buildBevelDisplacementDataUri(
        boxSize.width,
        boxSize.height,
        bevelWidth,
        br,
      ),
    [boxSize.width, boxSize.height, bevelWidth, br],
  );

  const handleDragStart = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      x: e.clientX - dragOffsetRef.current.x,
      y: e.clientY - dragOffsetRef.current.y,
    };
  };

  const handleDragMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable || !dragStartRef.current || !cardRef.current) return;
    const nextX = e.clientX - dragStartRef.current.x;
    const nextY = e.clientY - dragStartRef.current.y;
    dragOffsetRef.current = { x: nextX, y: nextY };
    cardRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
  };

  const handleDragEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragStartRef.current = null;
  };

  return (
    <>
      <svg className={styles.svgDefs} aria-hidden="true">
        <defs>
          <filter
            id={filterId}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={displacementHref}
              x="0"
              y="0"
              width={boxSize.width}
              height={boxSize.height}
              preserveAspectRatio="none"
              result="bevelMap"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="bevelMap"
              scale={refractionScale}
              xChannelSelector="R"
              yChannelSelector="G"
              edgeMode="duplicate"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={cardRef}
        className={[
          styles.glassCard,
          draggable ? styles.draggable : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={
          {
            "--bevel-width": `${bevelWidth}px`,
            "--br": `${br}px`,
            "--frost-blur": `${blur}px`,
            "--reflection-intensity": `${reflectionIntensity}`,
            "--near-x": `${boxSize.width / 2}px`,
            "--near-y": "0px",
            "--far-x": `${boxSize.width / 2}px`,
            "--far-y": `${boxSize.height}px`,
            "--nx": "0",
            "--ny": "-1",
            ...style,
            // Chromium: blur + refraction on the child layer, so disable the card-level one
            ...(!svgBackdrop && {
              backdropFilter: "blur(var(--frost-blur))",
            }),
          } as GlassCSSVariables
        }
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
      >
        <div
          className={styles.refractionLayer}
          style={
            svgBackdrop
              ? {
                  display: "block",
                  backdropFilter: `blur(${blur}px) url(#${filterId})`,
                  WebkitBackdropFilter: `blur(${blur}px) url(#${filterId})`,
                }
              : undefined
          }
        />
        <div className={styles.fresnelRim} />
        <div className={styles.internalSheen} />

        {debug && (
          <div className={styles.debugOverlay} aria-hidden="true">
            <span className={styles.debugCenter} />
            <span className={styles.debugNearDot} />
            <span className={styles.debugFarDot} />
          </div>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
