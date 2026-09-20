"use client";

import { useEffect, useRef, type RefObject } from "react";

type GliderUpdater = (
  glider: HTMLDivElement,
  rootRect: DOMRect,
  scrollLeft: number,
  scrollTop: number,
) => void;

export type UseGliderReturnType = {
  gliderRef: RefObject<HTMLElement | null>;
  rootRef: RefObject<HTMLElement | null>;
};

export function useGlider(
  updater: GliderUpdater,
  deps: unknown[],
): UseGliderReturnType {
  const gliderRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLOListElement>(null);
  const updaterRef = useRef<GliderUpdater>(updater);

  updaterRef.current = updater;

  useEffect(() => {
    if (!rootRef.current || !gliderRef.current) return;

    const updateGliderPosition = () => {
      if (!rootRef.current || !gliderRef.current) return;

      const rootRect = rootRef.current.getBoundingClientRect();

      // Account for scroll offset
      const scrollLeft = rootRef.current.scrollLeft;
      const scrollTop = rootRef.current.scrollTop;

      updaterRef.current(gliderRef.current, rootRect, scrollLeft, scrollTop);
    };

    updateGliderPosition();

    // Update marker position when container resizes
    const resizeObserver = new ResizeObserver(updateGliderPosition);
    resizeObserver.observe(rootRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, deps);

  return { gliderRef, rootRef };
}
