"use client";

import { useCallback, useSyncExternalStore } from "react";

// Module-level store helpers, keyed so a write only notifies subscribers of that key
const listeners = new Map<string, Set<() => void>>();

function notify(key: string | null) {
  // key === null means storage.clear(), so notify everyone
  if (key === null)
    listeners.forEach((set) => {
      set.forEach((l) => {
        l();
      });
    });
  else
    listeners.get(key)?.forEach((l) => {
      l();
    });
}

function onStorage(e: StorageEvent) {
  notify(e.key);
}

function subscribe(key: string, cb: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("storage", onStorage); // cross-tab sync
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(cb);

  return () => {
    set.delete(cb);
    if (set.size === 0) listeners.delete(key);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

/** Read the external flag exposed by useExternalFlag directly from localStorage  */
export function readExternalFlag(key: string): boolean | null {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return null;
    const parsed: unknown = JSON.parse(stored);
    return typeof parsed === "boolean" ? parsed : null;
  } catch {
    // Unsupported
    return null;
  }
}

function writeFlag(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Unsupported
  }
  notify(key); // same-tab sync (the storage event only fires in other tabs)
}

type FlagUpdate = boolean | ((prev: boolean) => boolean);

/**
 * Boolean flag persisted in `localStorage` and synced across components and tabs.
 *
 * SSR-safe: the server and hydration render use `defaultValue`, then the stored value applies.
 *
 * @param key - `localStorage` key the flag is stored under.
 * @param defaultValue - Value used when nothing is stored or storage is unavailable.
 */
export function useExternalFlag(
  key: string,
  defaultValue = false,
): readonly [
  flag: boolean,
  setFlag: (next: FlagUpdate) => void,
  toggle: () => void,
] {
  const flag = useSyncExternalStore(
    useCallback((cb: () => void) => subscribe(key, cb), [key]),
    () => readExternalFlag(key) ?? defaultValue, // client
    () => defaultValue, // server + hydration
  );

  const setFlag = useCallback(
    (next: FlagUpdate) => {
      const prev = readExternalFlag(key) ?? defaultValue;
      writeFlag(key, typeof next === "function" ? next(prev) : next);
    },
    [key, defaultValue],
  );

  const toggle = useCallback(() => setFlag((prev) => !prev), [setFlag]);

  return [flag, setFlag, toggle] as const;
}
