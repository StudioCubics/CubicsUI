"use client";

import { useBrowserDetector, useId, usePointerPosition } from "@cubicsui/hooks";
import type { Point2D, Size2D } from "@cubicsui/types";
import { cssSafeString } from "@cubicsui/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./RefractiveGlass.module.css";
import type {
  GlassCSSVariables,
  UseRefractiveGlassProps,
  UseRefractiveGlassReturn,
} from "./RefractiveGlass.types";
import { buildBevelDisplacementDataUri } from "./RefractiveGlass.utils";

export function useRefractiveGlass(
  props: Required<UseRefractiveGlassProps>,
): UseRefractiveGlassReturn {
  const {
    bevelWidth,
    br,
    refractionScale,
    smoothing,
    reflectionIntensity,
    blur,
  } = props;
  const filterId = `refraction-filter-${cssSafeString(useId())}`;
  const { isBlink: isUrlInBackdropAllowed } = useBrowserDetector();
  const { pointerPositionRef } = usePointerPosition();
  const [boxSize, setBoxSize] = useState<Size2D>({ width: 320, height: 200 });
  const glassRef = useRef<HTMLDivElement | null>(null);
  const smoothedVecRef = useRef<Point2D>({ x: 0, y: -1 });

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
  const svgFilterDefs = (
    <svg className={styles.svgFilterDefs} aria-hidden="true">
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
            width={1}
            height={1}
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
  );

  // Chromium: blur + SVG refraction on the card itself; other browsers keep the CSS blur
  const backdrop = isUrlInBackdropAllowed
    ? `blur(${blur}px) url(#${filterId})`
    : `blur(var(--frost-blur))`;

  const glassStyle: GlassCSSVariables = {
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
    backdropFilter: backdrop,
    WebkitBackdropFilter: backdrop,
  };

  // Track live card dimensions for accurate bevel map generation
  useEffect(() => {
    const el = glassRef.current;
    if (!el) return;

    const measure = () => {
      setBoxSize({ width: el.offsetWidth, height: el.offsetHeight });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, []);

  // Track global pointer coordinates & run smooth ray-box reflection loop
  useEffect(() => {
    let rafId = 0;

    const updateReflection = () => {
      const el = glassRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const { x: px, y: py } = pointerPositionRef.current;
        const { x: prevX, y: prevY } = smoothedVecRef.current;
        const halfW = rect.width / 2;
        const halfH = rect.height / 2;

        const dx = px - (rect.left + halfW);
        const dy = py - (rect.top + halfH);
        const dist = Math.hypot(dx, dy);

        // Soft deadzone near center so crossing center never snaps violently
        const targetNx = dist > 1 ? dx / dist : prevX;
        const targetNy = dist > 1 ? dy / dist : prevY;

        const alpha = Math.max(0.01, Math.min(1, smoothing));
        let nx = prevX + (targetNx - prevX) * alpha;
        let ny = prevY + (targetNy - prevY) * alpha;

        const norm = Math.hypot(nx, ny) || 1;
        nx /= norm;
        ny /= norm;
        smoothedVecRef.current = { x: nx, y: ny };

        // Project ray from card center onto card perimeter: t = min((w/2)/|nx|, (h/2)/|ny|)
        const t = Math.min(halfW / Math.abs(nx), halfH / Math.abs(ny));

        // Distance normalized against the window (Manhattan, capped at 1), same as GlassCard
        const md = Math.min(
          Math.min(Math.abs(dx) / window.innerWidth, 1) +
            Math.min(Math.abs(dy) / window.innerHeight, 1),
          1,
        );

        const vars: Record<string, string> = {
          // Card-local pixel coordinates (strictly 0..width and 0..height)
          "--near-x": `${(halfW + nx * t).toFixed(1)}px`,
          "--near-y": `${(halfH + ny * t).toFixed(1)}px`,
          "--far-x": `${(halfW - nx * t).toFixed(1)}px`,
          "--far-y": `${(halfH - ny * t).toFixed(1)}px`,
          "--nx": nx.toFixed(4),
          "--ny": ny.toFixed(4),
          // Sheen radius scale: 1 when the pointer is at the card, shrinking to 0.3 at max distance
          "--sheen-scale": (1 - 0.7 * md).toFixed(3),
          // Near side and pointer: 1 -> 0.2. Far bounce: fades out quickly so it never competes with the near ball.
          "--near-light": (1 - 0.8 * md).toFixed(3),
          "--far-light": (0.8 * (1 - md) ** 3).toFixed(3),
          // Card-local pointer position for the pointer hotspot
          "--mouse-x": `${(px - rect.left).toFixed(1)}px`,
          "--mouse-y": `${(py - rect.top).toFixed(1)}px`,
        };
        for (const [key, value] of Object.entries(vars))
          el.style.setProperty(key, value);
      }

      rafId = requestAnimationFrame(updateReflection);
    };

    rafId = requestAnimationFrame(updateReflection);
    return () => cancelAnimationFrame(rafId);
  }, [smoothing]);

  return { svgFilterDefs, glassRef, boxSize, filterId, glassStyle };
}
