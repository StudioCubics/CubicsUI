export type MergeableEventHandler<E = unknown> = (event: E) => void;

/**
 * Merges react events like onClick etc.
 */
export function mergeEvents<E>(
  ...handlers: (MergeableEventHandler<E> | undefined)[]
) {
  return (event: E): void => {
    for (const h of handlers) h?.(event);
  };
}
