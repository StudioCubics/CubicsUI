export type MergeableEventHandler<E = unknown, R = void> = (event: E) => R;

/**
 * Merges react events like onClick etc.
 */
export function mergeEvents<E extends unknown, R extends void>(
  ...handlers: (MergeableEventHandler<E, R> | undefined)[]
) {
  return (event: E): void => {
    for (const h of handlers) h?.(event);
  };
}
