import type { ComboBoxOption } from "./ComboBox.types";

/** Converts string like option to ListItemProps  */
export function normalizeOptions<T>(
  aosOptions: (string | ComboBoxOption<T>)[],
): ComboBoxOption<T>[] {
  return aosOptions.map((a) => {
    if (typeof a === "string") return { type: "item", label: a };
    return a;
  });
}
