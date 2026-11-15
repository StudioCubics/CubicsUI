/** Make the passed keys required if they werent already
 * @template T - The object whose keys need to be required
 * @template K - The keys that need to made required
 */
export type RequireKeys<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/** Make the passed keys optional, leaving the rest untouched
 * @template T - The object whose keys need to be optional
 * @template K - The keys that need to be made optional
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/** Remove `readonly` from all keys of an object
 * @template T - The object to make mutable
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

/** Recursively make all keys optional
 * @template T - The object (or array) to make deeply partial
 */
export type DeepPartial<T> = T extends (...args: object[]) => object
  ? T
  : T extends (infer U)[]
    ? DeepPartial<U>[]
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

/** Recursively make all keys readonly
 * @template T - The object (or array) to make deeply readonly
 */
export type DeepReadonly<T> = T extends (...args: object[]) => object
  ? T
  : T extends (infer U)[]
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

/** Get a union of all value types of an object
 * @template T - The object to get the values from
 */
export type ValueOf<T> = T[keyof T];

/** Get the keys of an object whose values extend a given type
 * @template T - The object to pick keys from
 * @template V - The value type the keys must match
 */
export type KeysOfType<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

/** Get the element type of an array
 * @template T - The array type
 */
export type ArrayElement<T extends readonly unknown[]> = T[number];

/** An array that is guaranteed to have at least one element
 * @template T - The element type
 */
export type NonEmptyArray<T> = [T, ...T[]];

/** Flatten intersections into a single readable object type
 * @template T - The object type to flatten
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};
