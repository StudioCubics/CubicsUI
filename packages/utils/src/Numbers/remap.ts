/**
 * This function returns the rounded corresponding value in the target range using linear interpolation.
 *
 * @param value - The input value to remap.
 * @param from - The source range as a tuple [min, max].
 * @param to - The target range as a tuple [min, max].
 * @returns The remapped value in the target range.
 *
 * @example
 * remap(3, [1, 10], [1, 5]); // 2
 */
export function remap(
  value: number,
  from: [number, number],
  to: [number, number],
  roundTo: "floor" | "ceil" = "floor",
): number {
  const [fromMin, fromMax] = from;
  const [toMin, toMax] = to;

  if (roundTo === "ceil")
    return Math.ceil(
      toMin + ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin),
    );
  return Math.floor(
    toMin + ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin),
  );
}
