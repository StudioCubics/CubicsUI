import type { ThemeScriptProps } from "./ThemeProvider.types";

export const script = ({
  attribute,
  storageKey,
  defaultTheme,
  enableSystem,
  enableColorScheme,
}: Required<ThemeScriptProps>): void => {
  try {
    const stored = localStorage.getItem(storageKey);
    const value = stored || defaultTheme;
    // Resolve system
    const theme =
      enableSystem && value === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : value;
    let d = document.documentElement;
    d.setAttribute(attribute, theme);
    if (enableColorScheme) d.style.colorScheme = theme;
  } catch (e) {
    // Unsupported (e.g. localStorage blocked)
  }
};
