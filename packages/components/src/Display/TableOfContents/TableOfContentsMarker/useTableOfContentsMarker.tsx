import { useEffect, useRef, useState, type RefObject } from "react";
import type { TableOfContentsTree } from "../TableOfContents.types";

export interface UseTableOfContentsMarkerProps {
  path: string;
  shadowPath: string;
  viewBox: { h: number; w: number };
  listRef: RefObject<HTMLOListElement | null>;
  navRef: RefObject<HTMLElement | null>;
  activeIds: Set<string>;
  markerRect: DOMRect | null;
}
export function useTableOfContentsMarker(
  tree: TableOfContentsTree,
  scrollContainerRef: RefObject<HTMLElement | null>,
  rootMargin = "0px",
  threshold = 1,
  shadowOffset = 6, // positive = right, negative = left
): UseTableOfContentsMarkerProps {
  const [path, setPath] = useState("");
  const [shadowPath, setShadowPath] = useState("");
  const [viewBox, setViewBox] = useState({ h: 0, w: 32 });
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const [markerRect, setMarkerRect] = useState<DOMRect | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const lastActiveIds = useRef<Set<string>>(new Set());
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const listRect = list.getBoundingClientRect();
    const items = Array.from(list.querySelectorAll("li")) as HTMLLIElement[];

    if (!items?.length) {
      setPath("");
      setShadowPath("");
      return;
    }
    const radius = 20; // controllable
    const padding = 3;
    let maxX = 0;

    // Build the snake path given an x-offset applied to every x value
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
      const x = rect.left - listRect.left + padding;
      maxX = Math.max(maxX, x);
    });

    setPath(buildPath(0));
    setShadowPath(buildPath(shadowOffset));
    // padding so stroke doesn't clip; account for shadow spilling outward
    setViewBox({ h: listRect.height, w: maxX + 16 });
  }, [tree, shadowOffset]);

  /**
   * Observe headings + compute markerRect
   */
  useEffect(() => {
    const root = scrollContainerRef.current;
    const list = listRef.current;

    if (!root || !list || !tree.length) return;

    function collectHrefs(nodes: TableOfContentsTree): string[] {
      return nodes.map((node) => node.href);
    }

    const hrefs = collectHrefs(tree);

    const targets = hrefs
      .map((href) => {
        const id = href.startsWith("#") ? href.slice(1) : href;
        return { id, el: document.getElementById(id) };
      })
      .filter((t): t is { id: string; el: HTMLElement } => t.el !== null);

    if (!targets.length) return;

    const visibleSet = new Set<string>();

    const updateMarker = () => {
      const activeLis = Array.from(list.querySelectorAll("li")).filter((li) => {
        const anchor = li.querySelector("a");
        if (!anchor) return false;

        const href = anchor.getAttribute("href") ?? "";
        const id = href.startsWith("#") ? href.slice(1) : href;

        return visibleSet.has(id);
      }) as HTMLLIElement[];

      if (!activeLis.length) {
        return;
      }

      const firstRect = activeLis[0].getBoundingClientRect();
      const lastRect = activeLis[activeLis.length - 1].getBoundingClientRect();
      const listRect = list.getBoundingClientRect();

      const top = firstRect.top - listRect.top;
      const height = lastRect.bottom - firstRect.top;

      const rect = new DOMRect(0, top, 4, height);

      // Persist for fallback
      lastActiveIds.current = new Set(visibleSet);
      setMarkerRect(rect);
      setActiveIds(new Set(visibleSet));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          const rootBounds = entry.rootBounds ?? root.getBoundingClientRect();
          const wasVisible = visibleSet.has(id);

          if (entry.isIntersecting) {
            // heading's top has entered the viewport (scrolling down),
            // or re-entered from the top (scrolling up) -> activate it
            visibleSet.add(id);
          } else if (
            wasVisible &&
            entry.boundingClientRect.top >= rootBounds.bottom
          ) {
            // only treat this as a real "exited through the bottom" crossing
            // if it was actually visible before -- otherwise this is just
            // IntersectionObserver's initial state report for an
            // off-screen heading that was never intersecting to begin with
            visibleSet.delete(id);

            const index = targets.findIndex((t) => t.id === id);
            const prev = targets[index - 1];
            if (prev) visibleSet.add(prev.id);
          } else {
            // exited through the TOP (scrolled past it going down),
            // or was never visible in the first place -- either way, not active
            visibleSet.delete(id);
          }

          updateMarker();
        });
      },
      {
        root,
        rootMargin,
        threshold: [0, threshold],
      },
    );

    targets.forEach(({ el }) => observer.observe(el));

    return () => observer.disconnect();
  }, [tree, scrollContainerRef, rootMargin, threshold]);

  return { path, shadowPath, viewBox, listRef, navRef, markerRect, activeIds };
}
