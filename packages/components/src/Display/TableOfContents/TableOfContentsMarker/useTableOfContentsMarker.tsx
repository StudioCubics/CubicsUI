"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import type {
  TableOfContentsTree,
  UseTableOfContentsMarkerReturn,
} from "../TableOfContents.types";

export function useTableOfContentsMarker(
  tree: TableOfContentsTree,
  scrollContainerRef?: RefObject<HTMLElement | null>,
  shadowOffset = 6, // positive = right, negative = left
): UseTableOfContentsMarkerReturn {
  const [path, setPath] = useState("");
  const [shadowPath, setShadowPath] = useState("");
  const [viewBox, setViewBox] = useState({ h: 0, w: 32 });
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  // top/bottom of every <li> relative to the list, kept in sync by ResizeObserver
  const [itemRects, setItemRects] = useState<{ top: number; bottom: number }[]>(
    [],
  );
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  /**
   * Measure list, build paths + item rects.
   * Re-runs whenever the list or any item changes size (wrapping, bold, fonts...)
   */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const listRect = list.getBoundingClientRect();
      const items: HTMLLIElement[] = Array.from(list.querySelectorAll("li"));

      if (!items.length) {
        setPath("");
        setShadowPath("");
        setItemRects([]);
        return;
      }

      const radius = 20;
      const padding = 3;
      let maxX = 0;

      const buildPath = (xShift: number) => {
        let d = "";
        let prevX = 0;
        let prevY = 0; // tracks where the pen actually is, not the previous item's rect
        let first = true;

        items.forEach((li, i) => {
          const rect = li.getBoundingClientRect();

          const x =
            Math.round(rect.left - listRect.left + padding + xShift) + 0.5;
          const yTop = rect.top - listRect.top;
          const yBottom = rect.bottom - listRect.top;
          const isLast = i === items.length - 1;

          if (first) {
            d += `M ${x} ${yTop}`;
            prevY = yTop;
            first = false;
          } else {
            const dx = x - prevX;
            const dir = dx >= 0 ? 1 : -1;

            // radius is capped by the distance the pen still has to travel
            // to reach this item's top, so it can never need to backtrack
            const r = Math.min(
              radius,
              Math.abs(dx) / 2,
              Math.abs(yTop - prevY) / 2,
            );

            // move vertically near next row
            d += ` V ${yTop - r}`;

            // rounded turn toward new x
            d += ` Q ${prevX} ${yTop} ${prevX + r * dir} ${yTop}`;

            // horizontal travel toward target x
            d += ` H ${x - r * dir}`;

            // rounded turn downward
            d += ` Q ${x} ${yTop} ${x} ${yTop + r}`;

            prevY = yTop + r; // pen now sits just below the curve, not at yBottom
          }

          if (isLast) {
            // only the final item needs its line drawn all the way to its bottom
            d += ` V ${yBottom}`;
          }

          prevX = x;
        });

        return d.trim();
      };

      // Compute maxX from unshifted positions for viewBox sizing
      items.forEach((li) => {
        const rect = li.getBoundingClientRect();
        maxX = Math.max(maxX, rect.left - listRect.left + padding);
      });

      setPath(buildPath(0));
      setShadowPath(buildPath(shadowOffset));
      // padding so stroke doesn't clip; account for shadow spilling outward
      setViewBox({ h: listRect.height, w: maxX + 16 });
      setItemRects(
        items.map((li) => {
          const r = li.getBoundingClientRect();
          return { top: r.top - listRect.top, bottom: r.bottom - listRect.top };
        }),
      );
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(list);
    list.querySelectorAll("li").forEach((li) => resizeObserver.observe(li));

    return () => resizeObserver.disconnect();
  }, [tree, shadowOffset]);

  /**
   * Active headings = every section (heading, next heading) that overlaps the viewport
   */
  useEffect(() => {
    if (!tree.length) return;

    const root = scrollContainerRef?.current; // null, fall back to window
    const scrollTarget: HTMLElement | Window = root ?? window;
    let frame = 0;

    const update = () => {
      frame = 0;

      const viewTop = root ? root.getBoundingClientRect().top : 0;
      const viewBottom = root
        ? root.getBoundingClientRect().bottom
        : window.innerHeight;

      const ids = tree.map((node) =>
        node.href.startsWith("#") ? node.href.slice(1) : node.href,
      );
      const tops = ids.map(
        (id) =>
          document.getElementById(id)?.getBoundingClientRect().top ?? null,
      );

      const next = new Set<string>();
      ids.forEach((id, i) => {
        const sectionTop = tops[i];
        if (sectionTop === null) return;

        // section ends where the next existing heading starts (last one runs to the end)
        const sectionBottom =
          tops.slice(i + 1).find((t) => t !== null) ?? Infinity;

        if (sectionTop < viewBottom && sectionBottom > viewTop) next.add(id);
      });

      // only update state when something actually changed
      setActiveIds((prev) =>
        prev.size === next.size && [...next].every((id) => prev.has(id))
          ? prev
          : next,
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    scrollTarget.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      scrollTarget.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [tree, scrollContainerRef]);

  /**
   * Marker rect derived from the latest measurements, so it always matches the list
   */
  const markerRect = useMemo(() => {
    const indices = tree
      .map((node, i) =>
        activeIds.has(
          node.href.startsWith("#") ? node.href.slice(1) : node.href,
        )
          ? i
          : -1,
      )
      .filter((i) => i !== -1 && itemRects[i]);

    if (!indices.length) return null;

    const first = itemRects[indices[0]];
    const last = itemRects[indices[indices.length - 1]];
    return new DOMRect(0, first.top, 4, last.bottom - first.top);
  }, [tree, activeIds, itemRects]);

  return { path, shadowPath, viewBox, listRef, navRef, markerRect, activeIds };
}
