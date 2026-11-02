import type { ContrastSharedProps } from "./ContrastProvider.types";
export const script = ({
  attribute,
  storageKey,
  defaultContrast,
}: Required<ContrastSharedProps>): void => {
  try {
    const stored = localStorage.getItem(storageKey);
    const value =
      stored !== null ? (JSON.parse(stored) as boolean) : defaultContrast;
    const d = document.documentElement;
    if (value) d.setAttribute(attribute, JSON.stringify(value));
    else d.removeAttribute(attribute);
  } catch {
    // Unsupported
  }
};
