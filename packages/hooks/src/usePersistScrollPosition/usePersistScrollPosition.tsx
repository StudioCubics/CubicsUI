import { useLayoutEffect, useRef, type RefObject } from "react";

/**
 * This will remember the scroll position of the user and restore it on navigation for reload and back_forward
 * Chromium doesn't restore scroll for inner scrollers, Firefox does.
 */
export function usePersistScrollPosition({
  id,
  disabled,
}: {
  /** Unique identifier for storing scroll position in localStorage */
  id: string;
  /** Disables remembering */
  disabled?: boolean;
}): { containerRef: RefObject<HTMLElement | null> } {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const key = () => `${id}-scroll:${location.pathname}${location.search}`;

    // Only restore on reload / back-forward, not on fresh navigations
    const navType = (
      performance.getEntriesByType("navigation")[0] as
        PerformanceNavigationTiming | undefined
    )?.type;

    let saved: string | null = null;
    try {
      if (navType === "reload" || navType === "back_forward")
        saved = sessionStorage.getItem(key());
    } catch (_) {}

    const ac = new AbortController();
    const opts = { signal: ac.signal, passive: true };
    const target = Number(saved);
    const start = performance.now();
    let restoring = saved !== null;
    let restoreRaf = 0;
    let saveRaf = 0;

    // Retry each frame until the target is reached, the user interacts, or 2s pass
    const restore = () => {
      if (!restoring) return;
      el.scrollTop = target;
      restoring =
        Math.abs(el.scrollTop - target) > 1 && performance.now() - start < 2000;
      if (restoring) restoreRaf = requestAnimationFrame(restore);
    };

    if (restoring) {
      restore();
      for (const e of ["wheel", "touchstart", "keydown", "pointerdown"])
        el.addEventListener(e, () => (restoring = false), opts);
    }

    // Save on scroll (one write per frame), paused while restoring
    el.addEventListener(
      "scroll",
      () => {
        if (restoring) return;
        cancelAnimationFrame(saveRaf);
        saveRaf = requestAnimationFrame(() => {
          try {
            sessionStorage.setItem(key(), String(el.scrollTop));
          } catch (_) {}
        });
      },
      opts,
    );

    return () => {
      ac.abort();
      cancelAnimationFrame(restoreRaf);
      cancelAnimationFrame(saveRaf);
    };
  }, [id]);

  return { containerRef };
}
