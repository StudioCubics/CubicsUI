"use client";

import { useCallback, useEffect, useRef } from "react";

type Timer = ReturnType<typeof setTimeout>;

export type UseDelayedActionReturn = {
  /** Runs `fn` after `ms` milliseconds. Returns a function that cancels this timer. */
  delayAction: <T extends () => unknown>(fn: T, ms: number) => () => void;
  /** Cancels all pending timers. */
  clearDelay: () => void;
};

/**
 * Returns functions to run callbacks after a delay and to cancel them.
 *
 * All pending timers are cancelled automatically on unmount.
 *
 * @param deps - Dependencies that control when `delay` is re-created.
 * Keep the array length constant between renders.
 *
 * @example
 * const { delay, clear } = useDelayedAction();
 *
 * // Debounce: restart the countdown on every call
 * clear();
 * delay(() => setValue(initial), 3000);
 */
export function useDelayedAction(deps: unknown[] = []): UseDelayedActionReturn {
  const timers = useRef<Set<Timer>>(new Set());

  const clearDelay = useCallback(() => {
    for (const id of timers.current) clearTimeout(id);
    timers.current.clear();
  }, []);

  const delayAction = useCallback(
    <T extends () => unknown>(fn: T, ms: number) => {
      const id = setTimeout(() => {
        timers.current.delete(id);
        fn();
      }, ms);
      timers.current.add(id);

      return () => {
        clearTimeout(id);
        timers.current.delete(id);
      };
    },
    // biome-ignore lint/correctness/useExhaustiveDependencies: deps are provided by the caller
    deps,
  );

  // Cancel pending timers on unmount
  useEffect(() => clearDelay, [clearDelay]);

  return { delayAction, clearDelay };
}
