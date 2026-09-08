import type { ContrastScriptProps } from "./ContrastProvider.types";
export const script = ({
  attribute,
  storageKey,
  defaultContrast,
}: Required<ContrastScriptProps>): void => {
  try {
    const stored = localStorage.getItem(storageKey);
    const value = stored !== null ? JSON.parse(stored) : defaultContrast;
    let d = document.documentElement;
    if (!!value) d.setAttribute(attribute, JSON.stringify(value));
    else d.removeAttribute(attribute);
  } catch (e) {}
};
