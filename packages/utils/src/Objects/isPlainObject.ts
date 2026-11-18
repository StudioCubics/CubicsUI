/**
 * Returns true for plain objects (`{}` or `Object.create(null)`).
 * Rejects arrays, class instances, Dates, Maps, React elements, etc.
 */
export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  if ("$$typeof" in value) return false; // React elements/portals/etc.
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
