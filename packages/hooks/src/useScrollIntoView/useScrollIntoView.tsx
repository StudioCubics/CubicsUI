"use client";

import {
  type DependencyList,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";

/**
 * Returns a `trigger` function. Calling it scrolls `ref.current`
 * into view after the next time `deps` change.
 */
export function useScrollIntoView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  deps: DependencyList,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "nearest" },
): () => void {
  const shouldScrollRef = useRef(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (!shouldScrollRef.current) return;
    shouldScrollRef.current = false;
    ref.current?.scrollIntoView(optionsRef.current);
    // biome-ignore lint/correctness/useExhaustiveDependencies: deps are provided by the caller
  }, deps);

  return useCallback(() => {
    shouldScrollRef.current = true;
  }, []);
}
