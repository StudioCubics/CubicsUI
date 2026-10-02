"use client";

import { useId, type ReactElement } from "react";
import type { useTableOfContentsMarker } from "./useTableOfContentsMarker";
import styles from "./TableOfContentsMarker.module.css";
import { cn } from "@cubicsui/utils";

export function TableOfContentsMarker(
  props: ReturnType<typeof useTableOfContentsMarker>,
): ReactElement {
  const { viewBox, path, markerRect, shadowPath } = props;
  const tocMarkerColor = useId();
  const tocMarkerClip = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={viewBox.w}
      height={viewBox.h}
      viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
      className={cn("lucide", styles.markerContainer)}
    >
      <path d={`${path}`} fill="none" stroke="var(--color-primary-alpha)" />
      {markerRect && (
        <>
          <defs>
            <linearGradient
              id={tocMarkerColor}
              gradientUnits="userSpaceOnUse"
              x1={0}
              x2={viewBox.w}
              y1={0}
              y2={viewBox.h}
            >
              <stop className={styles.color1} offset="0%" />
              <stop className={styles.color2} offset="25%" />
              <stop className={styles.color2} offset="75%" />
              <stop className={styles.color1} offset="100%" />
            </linearGradient>
            <clipPath id={tocMarkerClip}>
              <rect
                className={styles.clipPath}
                style={{
                  x: 0,
                  y: markerRect.top,
                  width: viewBox.w,
                  height: markerRect.height,
                }}
              />
            </clipPath>
          </defs>
          <path
            className={styles.shadow}
            stroke={`url(#${tocMarkerColor})`}
            d={shadowPath}
            clipPath={`url(#${tocMarkerClip})`}
          />
          <path
            className={styles.marker}
            stroke={`url(#${tocMarkerColor})`}
            d={path}
            clipPath={`url(#${tocMarkerClip})`}
          />
        </>
      )}
    </svg>
  );
}
