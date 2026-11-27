"use client";

import { type RefObject, useEffect, useRef } from "react";

type GliderUpdater<G extends HTMLElement = HTMLElement> = (
  glider: G,
  rootRect: DOMRect,
  scrollLeft: number,
  scrollTop: number,
) => void;
export type UseGliderReturn<
  R extends HTMLElement = HTMLElement,
  G extends HTMLElement = HTMLElement,
> = {
  rootRef: RefObject<R | null>;
  gliderRef: RefObject<G | null>;
};

export function useGlider<
  R extends HTMLElement = HTMLElement,
  G extends HTMLElement = HTMLElement,
>(updater: GliderUpdater<G>, deps: unknown[] = []): UseGliderReturn<R, G> {
  const gliderRef = useRef<G>(null);
  const rootRef = useRef<R>(null);
  const updaterRef = useRef<GliderUpdater<G>>(updater);

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
    // biome-ignore lint/correctness/useExhaustiveDependencies: deps are provided by the caller
  }, deps);

  return { gliderRef, rootRef };
}
