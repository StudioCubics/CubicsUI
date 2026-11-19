/**
 * Extends an object type `T` with a required string field.
 *
 * The field name defaults to `"id"`, but can be customized via `K`.
 *
 * @template T - The base object type to extend.
 * @template K - The name of the required string field. Defaults to `"id"`.
 *
 * @example
 * type User = { name: string };
 *
 * type A = ObjectWithId<User>;          // { name: string } & { id: string }
 * type B = ObjectWithId<User, "uuid">;  // { name: string } & { uuid: string }
 */
export type ObjectWithId<T extends object, K extends string = "id"> = T & {
  [P in K]: string;
};
