import type { GetArrowDirectionReturnType } from "./Tooltip.types";

export default function getArrowDirection(
  anchorOrigin: string,
  transformOrigin: string,
): GetArrowDirectionReturnType {
  const parse = (origin: string) => origin.toLowerCase().trim().split(/\s+/);

  const [aV = "top", aH = "left"] = parse(anchorOrigin);
  const [tV = "top", tH = "left"] = parse(transformOrigin);

  // Vertical priority
  if (aV !== tV) {
    // anchor top, tooltip attached bottom -> tooltip is above anchor -> arrow on bottom side
    if (aV === "top" && tV === "bottom") {
      if (aH === "left" && tH === "right") return "bottomRight";
      if (aH === "right" && tH === "left") return "bottomLeft";
      return "bottom";
    }

    // anchor bottom, tooltip attached top -> tooltip is below anchor -> arrow on top side
    if (aV === "bottom" && tV === "top") {
      if (aH === "left" && tH === "right") return "topRight";
      if (aH === "right" && tH === "left") return "topLeft";
      return "top";
    }
  }

  // Horizontal fallback
  if (aH !== tH) {
    // anchor left, tooltip attached right -> tooltip sits left of anchor -> arrow on right side
    if (aH === "left" && tH === "right") {
      if (aV === "top" && tV === "top") return "topRight";
      if (aV === "bottom" && tV === "bottom") return "bottomRight";
      return "right";
    }

    // anchor right, tooltip attached left -> tooltip sits right of anchor -> arrow on left side
    if (aH === "right" && tH === "left") {
      if (aV === "top" && tV === "top") return "topLeft";
      if (aV === "bottom" && tV === "bottom") return "bottomLeft";
      return "left";
    }
  }

  // No clear difference (both centers or identical origins)
  return null;
}
