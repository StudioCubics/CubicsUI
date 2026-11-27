"use client";

import {
  useBrowserDetector,
  useId,
  useInView,
  usePointerPosition,
} from "@cubicsui/hooks";
import type { Point2D, Size2D } from "@cubicsui/types";
import { cssSafeString, remap } from "@cubicsui/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./RefractiveGlass.module.css";
import type {
  RefractiveGlassCSSVars,
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
  const inView = useInView(glassRef);

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

  const glassStyle: RefractiveGlassCSSVars = {
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
    "--sheen-near-r": `${bevelWidth * 10}px`,
    "--sheen-far-r": `${bevelWidth * 8}px`,
    backdropFilter: backdrop,
    WebkitBackdropFilter: backdrop,
  };

  // Track live card dimensions for accurate bevel map generation
  useEffect(() => {
    const el = glassRef.current;
    if (!el || !inView) return;
    const measure = () => {
      setBoxSize({ width: el.offsetWidth, height: el.offsetHeight });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, [inView]);

  // Track global pointer coordinates & run smooth ray-box reflection loop
  useEffect(() => {
    // TODO extract logic to make it reusable.
    if (!inView) return;
    let rafId = 0;
    const updateReflection = () => {
      const el = glassRef.current;
      if (!el) {
        rafId = requestAnimationFrame(updateReflection);
        return;
      }
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

      let nx = prevX + (targetNx - prevX) * smoothing;
      let ny = prevY + (targetNy - prevY) * smoothing;

      const norm = Math.hypot(nx, ny) || 1;
      nx /= norm;
      ny /= norm;
      smoothedVecRef.current = { x: nx, y: ny };

      // Project ray from card center onto card perimeter: t = min((w/2)/|nx|, (h/2)/|ny|)
      const t = Math.min(halfW / Math.abs(nx), halfH / Math.abs(ny));

      // Pointer inside the card: near point follows the pointer instead of the perimeter
      const inside = Math.abs(dx) <= halfW && Math.abs(dy) <= halfH;
      const nearX = inside ? px - rect.left : halfW + nx * t;
      const nearY = inside ? py - rect.top : halfH + ny * t;

      // Distance normalized against the window (Manhattan, capped at 1), same as GlassCard
      const md = Math.min(
        Math.min(Math.abs(dx) / window.innerWidth, 1) +
          Math.min(Math.abs(dy) / window.innerHeight, 1),
        1,
      );

      const sheenScale = remap(md, [0, 1], [1, 0.3]);
      const vars: Record<string, string> = {
        // Card-local pixel coordinates (strictly 0..width and 0..height)
        "--near-x": `${nearX.toFixed(1)}px`,
        "--near-y": `${nearY.toFixed(1)}px`,
        "--far-x": `${(2 * halfW - nearX).toFixed(1)}px`,
        "--far-y": `${(2 * halfH - nearY).toFixed(1)}px`,
        "--nx": nx.toFixed(4),
        "--ny": ny.toFixed(4),
        // Sheen radius scale: 1 when the pointer is at the card, shrinking to 0.3 at max distance
        "--sheen-scale": sheenScale.toFixed(3),
        "--sheen-near-r": `${(bevelWidth * 30 * sheenScale).toFixed(1)}px`,
        "--sheen-far-r": `${(bevelWidth * 15 * sheenScale).toFixed(1)}px`,
        // Near side and pointer: 1 -> 0.2. Far bounce: fades out quickly so it never competes with the near ball.
        "--near-light": remap(md, [0, 1], [1, 0.2]).toFixed(3),
        "--far-light": (0.8 * (1 - md) ** 3).toFixed(3),
        // Card-local pointer position for the pointer hotspot
        "--mouse-x": `${(px - rect.left).toFixed(1)}px`,
        "--mouse-y": `${(py - rect.top).toFixed(1)}px`,
      };
      for (const [key, value] of Object.entries(vars))
        el.style.setProperty(key, value);
      rafId = requestAnimationFrame(updateReflection);
    };

    rafId = requestAnimationFrame(updateReflection);
    return () => cancelAnimationFrame(rafId);
  }, [smoothing, inView]);

  return { svgFilterDefs, glassRef, boxSize, filterId, glassStyle };
}
