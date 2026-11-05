/** Clamps give value from min max
 * @param {number} min The minimum limit of the value
 * @param {number} v The value
 * @param {number} max The maximum limit of the value
 */
export function clamp(min: number, v: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}
