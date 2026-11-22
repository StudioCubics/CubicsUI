import type {
  PositionHorizontal,
  PositionString,
  PositionVertical,
} from "@cubicsui/types";

interface ParsedOrigin {
  vertical: PositionVertical;
  horizontal: PositionHorizontal;
}

export interface SafePositionOptions {
  /** The area around the anchor where the popover should be positioned
   * @default "bottom center" */
  positionArea?: PositionString;
  /** The margin around the anchor where the popover should be positioned */
  margin?: number;
}

export interface Position {
  x: number;
  y: number;
}

/**
 * Calculates safe position of an element within viewport relative to an anchor element
 * Works like the CSS `position-area` property, the anchor sits in the center cell of a 3x3 grid
 * and the element is placed in the chosen cell, touching the anchor:
 *
 * If the preferred side doesn't fit in the viewport, it flips to the opposite side so the element
 * doesn't cover the anchor. It only clamps (and can overlap the anchor) when neither side fits.
 *
 * @param element - The element to position
 * @param anchorElement - The anchor element to position relative to
 * @param options - Configuration options
 * @returns Safe x, y coordinates
 */
export function calculateSafePosition(
  element: HTMLElement | null,
  anchorElement: HTMLElement | null,
  options: SafePositionOptions = {},
): Position {
  const { positionArea = "bottom center", margin = 0 } = options;

  if (!element || !anchorElement) return { x: 0, y: 0 };

  // offsetWidth/offsetHeight ignore transforms, so the scale animation doesn't affect the measurement
  const elementWidth = element.offsetWidth;
  const elementHeight = element.offsetHeight;
  const anchorRect = anchorElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const area = parsePositionArea(positionArea);

  // Place the element in its grid cell around the anchor, flipping when the preferred side doesn't fit
  let x: number;
  if (area.horizontal === "center") {
    x = anchorRect.left + anchorRect.width / 2 - elementWidth / 2;
  } else {
    const before = anchorRect.left - elementWidth; // left of the anchor
    const after = anchorRect.right; // right of the anchor
    const fitsBefore = before >= margin;
    const fitsAfter = after + elementWidth <= viewportWidth - margin;

    if (area.horizontal === "left")
      x = fitsBefore || !fitsAfter ? before : after;
    else x = fitsAfter || !fitsBefore ? after : before;
  }

  let y: number;
  if (area.vertical === "center") {
    y = anchorRect.top + anchorRect.height / 2 - elementHeight / 2;
  } else {
    const before = anchorRect.top - elementHeight; // above the anchor
    const after = anchorRect.bottom; // below the anchor
    const fitsBefore = before >= margin;
    const fitsAfter = after + elementHeight <= viewportHeight - margin;

    if (area.vertical === "top") y = fitsBefore || !fitsAfter ? before : after;
    else y = fitsAfter || !fitsBefore ? after : before;
  }

  // Check and adjust for viewport boundaries with margin
  // Right boundary
  if (x + elementWidth > viewportWidth - margin) {
    x = viewportWidth - elementWidth - margin;
  }
  // Left boundary
  if (x < margin) {
    x = margin;
  }

  // Bottom boundary
  if (y + elementHeight > viewportHeight - margin) {
    y = viewportHeight - elementHeight - margin;
  }
  // Top boundary
  if (y < margin) {
    y = margin;
  }

  return { x: Math.max(margin, x), y: Math.max(margin, y) };
}

function parsePositionArea(area: string): ParsedOrigin {
  const parts = area.toLowerCase().trim().split(/\s+/);
  // Axes that aren't mentioned default to center, like CSS ("top" = "top center")
  let vertical: PositionVertical = "center";
  let horizontal: PositionHorizontal = "center";

  for (const part of parts) {
    if (part === "top" || part === "bottom") vertical = part;
    else if (part === "left" || part === "right") horizontal = part;
  }

  return { vertical, horizontal };
}
