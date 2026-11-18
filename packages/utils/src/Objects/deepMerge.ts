import { isPlainObject } from "./isPlainObject";

export interface DeepMergeOptions {
  /** How to merge arrays. Default: "replace". */
  arrays?: "replace" | "concat";
  /** Whether `undefined` in a source overrides an existing value. Default: false. */
  overrideWithUndefined?: boolean;
  /** Per-key custom merge, e.g. `{ className: (a, b) => cn(a, b) }`. Receives (base, override). */
  customMerge?: Record<string, (base: unknown, override: unknown) => unknown>;
}

const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function mergeTwo(
  base: Record<string, unknown>,
  override: Record<string, unknown>,
  options: DeepMergeOptions,
): Record<string, unknown> {
  const {
    arrays = "replace",
    overrideWithUndefined = false,
    customMerge,
  } = options;
  const result: Record<string, unknown> = { ...base };

  for (const key of Object.keys(override)) {
    if (UNSAFE_KEYS.has(key)) continue; // prototype pollution guard

    const next = override[key];
    if (next === undefined && !overrideWithUndefined) continue;

    const prev = result[key];
    const custom = customMerge?.[key];

    if (custom) {
      result[key] = custom(prev, next);
    } else if (isPlainObject(prev) && isPlainObject(next)) {
      result[key] = mergeTwo(prev, next, options);
    } else if (
      arrays === "concat" &&
      Array.isArray(prev) &&
      Array.isArray(next)
    ) {
      result[key] = [...prev, ...next];
    } else {
      result[key] = next;
    }
  }
  return result;
}

/**
 * Deep-merges plain objects left to right; later sources win.
 * Non-plain values (functions, arrays, class instances, React nodes) are replaced, not merged.
 * Inputs are never mutated. `null`/`undefined` sources are skipped.
 */
export function deepMerge<T extends object>(
  sources: ReadonlyArray<object | null | undefined>,
  options: DeepMergeOptions = {},
): T {
  let result: Record<string, unknown> = {};
  for (const source of sources) {
    if (source)
      result = mergeTwo(result, source as Record<string, unknown>, options);
  }
  return result as T;
}
