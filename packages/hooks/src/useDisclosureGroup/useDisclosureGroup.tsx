import { isServer } from "@cubicsui/utils";
import { useLayoutEffect, useState } from "react";
import { useId } from "../useId/useId";

function getStorageItems(storageKey: string | null): Record<string, boolean> {
  if (isServer || !storageKey) return {};
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return JSON.parse(stored) as Record<string, boolean>;
  } catch (_) {}
  return {};
}

export interface UseDisclosureGroupProps {
  /** Unique id for this collapsible item group, used as the localStorage key for collapsed state
   * Providing an id enables persisting unless `persist` is set to false.
   * If omitted, one is generated with React's useId()
   */
  id?: string;
  /** Persist collapsed state to localStorage.
   * Defaults to true when an `id` is provided, false otherwise.
   * Setting `persist` without an `id` falls back to a useId() key, which is
   * not stable across client-side navigations, so pass an `id` as well.
   */
  persist?: boolean;
  /** Saves only true or false values, saves both by default */
  saveOnly?: "only-true" | "only-false" | "both";
  /** Only one item may be open at a time. After the first interaction the
   * stored record is the full truth, so ids not in it are collapsed. */
  exclusive?: boolean;
  /** Ids of collapsible items collapsed by default before localStorage is read (SSR-safe) */
  defaultCollapsedIds?: string[];
  /** Used when nothing else resolves: no explicit toggle, no item default and
   * the id is not in `defaultCollapsedIds`.
   * @default false
   */
  fallbackCollapsed?: boolean;
}
export interface UseDisclosureGroupReturn {
  /** Final resolved storage key for persisting */
  storageKey: string;
  /** Final persistant value  */
  canPersist: boolean;
  /** Record of all collapsed ids */
  collapsedItems: Record<string, boolean>;
  /** Resolves effective collapsed state for an id: explicit toggle > item's own
   * defaultCollapsed > Component's defaultCollapsedIds > collapsed */
  getCollapsed: (id: string, defaultCollapsed?: boolean) => boolean;
  /** Toggle collapsed state of an item by id, given its current effective collapsed value */
  toggleCollapsed: (id: string, current: boolean) => void;
}

/** Track collapsed children of a collapsible item group or collapsible item group type thing, or any children whose initial state is not collapsed  */
export function useDisclosureGroup(
  componentName: string,
  props: UseDisclosureGroupProps,
): UseDisclosureGroupReturn {
  const {
    id: _id,
    persist,
    defaultCollapsedIds,
    fallbackCollapsed = false,
    exclusive,
    saveOnly = "both",
  } = props;
  const id = useId(_id);
  const storageKey = `${componentName}-${id}-collapsedIds`;
  // Persist when an id is given, unless explicitly disabled with persist={false}
  const canPersist = persist ?? _id !== undefined;
  // Set of ids the List itself wants collapsed by default (lowest priority)
  const defaultCollapsedIdsSet = new Set(defaultCollapsedIds);
  const [collapsedItems, setCollapsedItems] = useState<Record<string, boolean>>(
    {},
  );

  function toggleCollapsed(id: string, current: boolean) {
    setCollapsedItems((prev) => {
      // In-memory state always keeps the explicit value so the toggle works
      const next = exclusive ? { [id]: !current } : { ...prev, [id]: !current };
      // Only the values allowed by `saveOnly` are written to storage
      const toPersist = Object.fromEntries(
        Object.entries(next).filter(([, v]) =>
          saveOnly === "only-true"
            ? v === true
            : saveOnly === "only-false"
              ? v === false
              : true,
        ),
      );
      try {
        if (canPersist)
          localStorage.setItem(storageKey, JSON.stringify(toPersist));
      } catch (e) {
        // Unsupported
      }
      return next;
    });
  }

  function getCollapsed(id: string, defaultCollapsed?: boolean): boolean {
    // Exclusive: after first interaction the explicit record is the full truth
    if (exclusive && Object.keys(collapsedItems).length > 0)
      return collapsedItems[id] ?? true;
    if (id in collapsedItems) return collapsedItems[id];
    if (defaultCollapsed !== undefined) return defaultCollapsed;
    if (defaultCollapsedIdsSet.has(id)) return true;
    return fallbackCollapsed;
  }
  // Read after mount so the first client render matches the server HTML
  useLayoutEffect(() => {
    setCollapsedItems(getStorageItems(canPersist ? storageKey : null));
  }, [canPersist, storageKey]);

  return {
    toggleCollapsed,
    getCollapsed,
    collapsedItems,
    canPersist,
    storageKey,
  };
}
