import type { KeyboardEventKeyCombo, KeyboardInput } from "@cubicsui/types";

export type OnShortcutOptions = {
  /** Calls `e.preventDefault()` on a match. Defaults to true */
  preventDefault?: boolean;
};

/**
 * Runs `fn` when a keyboard event matches a key or key combination.
 * @param e - The keyboard event to check.
 * @param matchKeys - Optional modifiers plus one regular key, e.g. `["Control", "k"]`.
 * @param fn - Callback invoked with the event on a match (e.g. to call `preventDefault()`).
 *
 * @example
 * document.addEventListener("keydown", (e) =>
 *   onShortcut(e, [["Control", "k"],["Meta", "k"]], () => openSearch()),
 * );
 * document.addEventListener("keydown", (e) =>
 *   onShortcut(e, ["Control", "k"], () => openSearch(), { preventDefault: true }),
 * );
 * document.addEventListener("keydown", (e) =>
 *   onShortcut(e, "I", () => openInventory()),
 * );
 */
export function onShortcut(
  e: KeyboardEvent,
  keys: KeyboardInput,
  fn: (e: KeyboardEvent) => unknown,
  options: OnShortcutOptions = {},
): void {
  const combos: KeyboardEventKeyCombo[] =
    typeof keys === "string"
      ? [[keys]]
      : typeof keys[0] === "string"
        ? [keys as KeyboardEventKeyCombo]
        : (keys as KeyboardEventKeyCombo[]);

  const key = e.key.toLowerCase();

  const matched = combos.some((combo) => {
    const wanted = new Set(combo.map((k) => k.toLowerCase()));

    const regularKeys = [...wanted].filter(
      (k) => !["control", "shift", "alt", "meta"].includes(k),
    );

    if (regularKeys.length !== 1) return false;

    return (
      regularKeys[0] === key &&
      wanted.has("control") === e.ctrlKey &&
      wanted.has("shift") === e.shiftKey &&
      wanted.has("alt") === e.altKey &&
      wanted.has("meta") === e.metaKey
    );
  });

  if (!matched) return;

  if (options.preventDefault ?? true) {
    e.preventDefault();
  }

  fn(e);
}
