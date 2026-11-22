import type { AnchorLike, Size2D } from "@cubicsui/types";
export const DEFAULT_ARROW_SIZE: Size2D = { width: 16, height: 8 };
/**
 * Positions an arrow on the popover's edge so that it points towards the center
 * of the anchor element.
 *
 * Accounts for the popover's transform scale and rounded corners when finding
 * the closest point on its perimeter to the anchor. The arrow is rendered as
 * a triangle using the popover's background color.
 *
 * Sets the following CSS variables used by the popover's `::before` pseudo-element:
 * - `--arrow-svg`: The arrow as a `url()` data URI, filled with the popover background.
 * - `--arrow-x` / `--arrow-y`: The position of the arrow on the popover edge.
 * - `--arrow-angle`: The arrow's rotation in degrees, where 0 points right.
 *
 * @param anchor - The element the arrow points towards.
 * @param popover - The element the arrow is attached to.
 * @param size - The arrow's base width (along the edge) and height (outwards), in pixels.
 */
export function updateArrow(
  anchor: AnchorLike,
  popover: HTMLElement,
  size: Size2D,
): void {
  const rect = popover.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();
  const computed = getComputedStyle(popover);

  const width = popover.offsetWidth;
  const height = popover.offsetHeight;

  // Undo the enter animation scale so the arrow lands correctly mid-animation.
  const scale = rect.width / width || 1;

  const [originX, originY] = computed.transformOrigin
    .split(" ")
    .map(parseFloat);

  const left = rect.left - originX * (1 - scale);
  const top = rect.top - originY * (1 - scale);

  // Anchor center relative to the popover's unscaled top-left.
  const anchorX = anchorRect.left + anchorRect.width / 2 - left;
  const anchorY = anchorRect.top + anchorRect.height / 2 - top;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const normalize = (a: number) => (a + Math.PI * 2) % (Math.PI * 2);

  // Read corner radii.
  const {
    borderTopLeftRadius: tl,
    borderTopRightRadius: tr,
    borderBottomRightRadius: br,
    borderBottomLeftRadius: bl,
  } = computed;

  const [rTL, rTR, rBR, rBL] = [tl, tr, br, bl].map((r) => parseFloat(r) || 0);

  // Define the four rounded corners and their angular ranges.
  const corners = [
    [rTL, rTL, rTL, Math.PI, Math.PI * 1.5],
    [width - rTR, rTR, rTR, Math.PI * 1.5, Math.PI * 2],
    [width - rBR, height - rBR, rBR, 0, Math.PI / 2],
    [rBL, height - rBL, rBL, Math.PI / 2, Math.PI],
  ];

  // Find candidate points along the straight edges and rounded corners.
  const candidates = [
    [clamp(anchorX, rTL, width - rTR), 0],
    [width, clamp(anchorY, rTR, height - rBR)],
    [clamp(anchorX, rBL, width - rBR), height],
    [0, clamp(anchorY, rTL, height - rBL)],
    ...corners.flatMap(([cx, cy, r, start, end]) => {
      if (!r) return [];

      const theta = clamp(
        normalize(Math.atan2(anchorY - cy, anchorX - cx)),
        start,
        end,
      );

      return [[cx + r * Math.cos(theta), cy + r * Math.sin(theta)]];
    }),
  ];

  // Select the closest point on the actual rounded perimeter.
  const [x, y] = candidates.reduce((best, point) =>
    (point[0] - anchorX) ** 2 + (point[1] - anchorY) ** 2 <
    (best[0] - anchorX) ** 2 + (best[1] - anchorY) ** 2
      ? point
      : best,
  );

  // Calculate the angle from the edge point towards the anchor center.
  const angle = Math.atan2(anchorY - y, anchorX - x);

  // Generate a triangular arrow using the popover's background color.
  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${size.height}"
      height="${size.width}"
      viewBox="0 0 ${size.height} ${size.width}"
    >
      <path
        d="M 0 0 L ${size.height} ${size.width / 2} L 0 ${size.width} Z"
        fill="${computed.backgroundColor}"
      />
    </svg>
  `;

  // Set CSS variables used by the popover's ::before pseudo-element.
  popover.style.setProperty(
    "--arrow-svg",
    `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
  );
  popover.style.setProperty("--arrow-x", `${x}px`);
  popover.style.setProperty("--arrow-y", `${y}px`);
  popover.style.setProperty("--arrow-angle", `${(angle * 180) / Math.PI}deg`);
}
