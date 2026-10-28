"use client";

import { isValidElement, useState } from "react";
import type {
  BreadcrumbsRangeItem,
  UseBreadcrumbsProps,
  UseBreadcrumbsReturn,
} from "./Breadcrumbs.types";

export function useBreadcrumbs({
  crumbs,
  defaultSelected = 0,
  selectedWhen,
  onChange,
  siblingCount = 1,
  boundaryCount = 0,
}: UseBreadcrumbsProps): UseBreadcrumbsReturn {
  const [selectedCrumb, setSelectedCrumb] = useState<number>(defaultSelected);
  // Gaps (identified by their first hidden index) that the user expanded
  const [expandedGaps, setExpandedGaps] = useState<number[]>([]);
  const count = crumbs.length;

  // When selectedWhen is provided, it fully controls the active crumb
  const activeCrumb = Math.min(
    selectedWhen
      ? Math.max(
          crumbs.findIndex(
            (crumb) => isValidElement(crumb) && selectedWhen(crumb.props),
          ),
          0,
        )
      : selectedCrumb,
    Math.max(count - 1, 0),
  );
  function handleClick(i: number) {
    if (!selectedWhen) setSelectedCrumb(i); // click only updates state when uncontrolled
    setExpandedGaps([]); // collapse again around the new active crumb
    if (onChange) onChange(i);
  }

  // Reveals one more chunk of the gap starting at `from`
  function expand(from: number) {
    setExpandedGaps((prev) => ({
      ...prev,
      [from]: (prev[from] ?? 0) + Math.max(siblingCount * 2 + 1, 1),
    }));
  }
  // Collect every index that must be visible
  const visible = new Set<number>();

  // Boundary: first and last `boundaryCount` items
  for (let i = 0; i < Math.min(boundaryCount, count); i++) {
    visible.add(i);
    visible.add(count - 1 - i);
  }

  // Active item and its siblings; the window is shifted (not shrunk) when it
  // hits an edge so the amount of visible crumbs stays constant
  const minStart = Math.min(boundaryCount, count - 1);
  const maxEnd = Math.max(count - 1 - boundaryCount, 0);
  const windowSize = siblingCount * 2 + 1;
  const siblingsStart = Math.max(
    Math.min(activeCrumb - siblingCount, maxEnd - windowSize + 1),
    minStart,
  );
  const siblingsEnd = Math.min(siblingsStart + windowSize - 1, count - 1);
  for (let i = siblingsStart; i <= siblingsEnd; i++) {
    visible.add(i);
  }
  const items: BreadcrumbsRangeItem[] = [];

  // Fills the hidden gap [from, to]. Revealed crumbs sit next to the active
  // crumb, the ellipsis stays on the side of the boundary. A single leftover
  // hidden item is shown instead of an ellipsis
  function pushGap(from: number, to: number) {
    const size = to - from + 1;
    if (size <= 0) return;

    const pushRange = (a: number, b: number) => {
      for (let i = a; i <= b; i++) {
        items.push({ type: "crumb", crumb: crumbs[i], index: i });
      }
    };

    const revealed = Math.min(expandedGaps[from] ?? 0, size);
    if (size - revealed <= 1) {
      pushRange(from, to);
      return;
    }

    const ellipsis: BreadcrumbsRangeItem = {
      type: "ellipsis",
      key: `ellipsis-${from}`,
      from, // stays the original gap start so expand() keeps targeting this gap
    };

    if (from > activeCrumb) {
      // Gap after the active crumb: revealed crumbs first
      pushRange(from, from + revealed - 1);
      items.push(ellipsis);
    } else {
      // Gap before the active crumb: revealed crumbs last
      items.push(ellipsis);
      pushRange(to - revealed + 1, to);
    }
  }

  let prev = -1;
  for (const i of [...visible].sort((a, b) => a - b)) {
    pushGap(prev + 1, i - 1);
    items.push({ type: "crumb", crumb: crumbs[i], index: i });
    prev = i;
  }
  pushGap(prev + 1, count - 1);

  return { items, activeCrumb, handleClick, expand };
}
