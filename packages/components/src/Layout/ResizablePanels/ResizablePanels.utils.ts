import type { CSSProperties } from "react";
import type {
  PanelEdge,
  PanelLayout,
  PanelRect,
  ResizablePanelViewport,
} from "./ResizablePanels.types";
export const RESIZABLE_PANEL_EDGES: PanelEdge[] = [
  "top",
  "right",
  "bottom",
  "left",
];
export const RESIZABLE_PANEL_CASCADE_OFFSET = 32;
// Max distance (px) between two edges for them to count as touching
const TOUCH_TOLERANCE = 1;

/** Computes the initial rect of every panel for the chosen layout */
export function computeLayout(
  layout: PanelLayout,
  ids: string[],
  vp: ResizablePanelViewport,
  columns?: number,
): Record<string, PanelRect> {
  const n = ids.length;
  const result: Record<string, PanelRect> = {};

  ids.forEach((id, i) => {
    switch (layout) {
      case "row": {
        const w = vp.width / n;
        result[id] = { x: i * w, y: 0, width: w, height: vp.height };
        break;
      }
      case "column": {
        const h = vp.height / n;
        result[id] = { x: 0, y: i * h, width: vp.width, height: h };
        break;
      }
      case "grid": {
        const cols = Math.max(1, columns ?? Math.ceil(Math.sqrt(n)));
        const rows = Math.ceil(n / cols);
        const w = vp.width / cols;
        const h = vp.height / rows;
        result[id] = {
          x: (i % cols) * w,
          y: Math.floor(i / cols) * h,
          width: w,
          height: h,
        };
        break;
      }
    }
  });

  return result;
}
/** Returns the rects changed by dragging `edge` of panel `id` by (dx, dy).
 * When `linked`, every panel connected to the dragged line is moved/resized with it,
 * so no empty space is left. Viewport-boundary edges are locked when linked.*/
export function resizePanels(
  rects: Record<string, PanelRect>,
  id: string,
  edge: PanelEdge,
  dx: number,
  dy: number,
  vp: ResizablePanelViewport,
  minSize: number,
  linked: boolean,
): Record<string, PanelRect> {
  const start = rects[id];
  if (!start) return {};

  const horizontal = edge === "left" || edge === "right";
  const pos = horizontal ? "x" : "y";
  const size = horizontal ? "width" : "height";
  const perp = horizontal ? "y" : "x";
  const perpSize = horizontal ? "height" : "width";
  const vpSize = horizontal ? vp.width : vp.height;
  const delta = horizontal ? dx : dy;
  const isEnd = edge === "right" || edge === "bottom";

  const startEnd = start[pos] + start[size];
  const edgePos = isEnd ? startEnd : start[pos];

  // Locked: moving a viewport boundary would always leave empty space
  if (
    linked &&
    (isEnd ? edgePos >= vpSize - TOUCH_TOLERANCE : edgePos <= TOUCH_TOLERANCE)
  ) {
    return {};
  }

  // Panels whose edge lies on the dragged line: same side as the dragged edge, or facing it
  const sameSide = (n: PanelRect) =>
    Math.abs((isEnd ? n[pos] + n[size] : n[pos]) - edgePos) <= TOUCH_TOLERANCE;
  const facing = (n: PanelRect) =>
    Math.abs((isEnd ? n[pos] : n[pos] + n[size]) - edgePos) <= TOUCH_TOLERANCE;

  const overlaps = (a: PanelRect, b: PanelRect) =>
    Math.min(a[perp] + a[perpSize], b[perp] + b[perpSize]) -
      Math.max(a[perp], b[perp]) >
    TOUCH_TOLERANCE;

  // Grow the group with candidates connected to it along the line
  const group = new Set<string>([id]);
  if (linked) {
    const candidates = Object.entries(rects).filter(
      ([nid, n]) => nid !== id && (sameSide(n) || facing(n)),
    );
    let grew = true;
    while (grew) {
      grew = false;
      for (const [nid, n] of candidates) {
        if (group.has(nid)) continue;
        if ([...group].some((gid) => overlaps(rects[gid], n))) {
          group.add(nid);
          grew = true;
        }
      }
    }
  }

  // Allowed range of the line: viewport and every member's min size
  let min = 0;
  let max = vpSize;
  for (const gid of group) {
    const n = rects[gid];
    if (sameSide(n)) {
      if (isEnd) min = Math.max(min, n[pos] + minSize);
      else max = Math.min(max, n[pos] + n[size] - minSize);
    } else if (isEnd) {
      max = Math.min(max, n[pos] + n[size] - minSize);
    } else {
      min = Math.max(min, n[pos] + minSize);
    }
  }
  const next = Math.min(Math.max(edgePos + delta, min), max);

  const changed: Record<string, PanelRect> = {};
  for (const gid of group) {
    const n = rects[gid];
    const moved = { ...n };
    // Panels on the dragged side keep their far edge, panels facing it keep theirs
    if (sameSide(n) === isEnd) {
      moved[size] = next - n[pos];
    } else {
      moved[pos] = next;
      moved[size] = n[pos] + n[size] - next;
    }
    changed[gid] = moved;
  }

  return changed;
}
// Absolute position of a panel; sides not on the viewport boundary are inset by half the gap
export function getPanelStyle(
  rect: PanelRect,
  vp: ResizablePanelViewport,
  gap: string,
): CSSProperties {
  const half = `calc(${gap} / 2)`;
  const left = rect.x > TOUCH_TOLERANCE;
  const top = rect.y > TOUCH_TOLERANCE;
  const right = rect.x + rect.width < vp.width - TOUCH_TOLERANCE;
  const bottom = rect.y + rect.height < vp.height - TOUCH_TOLERANCE;

  return {
    left: left ? `calc(${rect.x}px + ${half})` : rect.x,
    top: top ? `calc(${rect.y}px + ${half})` : rect.y,
    width: `calc(${rect.width}px - ${left ? half : "0px"} - ${right ? half : "0px"})`,
    height: `calc(${rect.height}px - ${top ? half : "0px"} - ${bottom ? half : "0px"})`,
  };
}
