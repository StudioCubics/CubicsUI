import type { Theme } from "../../Providers/ThemeProvider/ThemeProvider.types";
import type { ThemeObject } from "./ThemeToggle.types";

export const DEFAULT_THEME_OBJECT: ThemeObject = {
  light: { text: "Light Mode" },
  system: { text: "System Mode" },
  dark: { text: "Dark Mode" },
};
/**
 * Which theme the toggle button switches to when clicked.
 * Cycle: light -> system (if enabled, else dark) -> dark -> light.
 * With `resolveSystem`, system skips to whichever theme is not currently resolved.
 */
export function getNextTheme(
  current: Theme,
  opts: {
    systemEnabled: boolean;
    resolveSystem: boolean;
    resolvedTheme: Theme | undefined;
  },
): Theme {
  switch (current) {
    case "light":
      return opts.systemEnabled ? "system" : "dark";
    case "system":
      return opts.resolveSystem && opts.resolvedTheme === "dark"
        ? "light"
        : "dark";
    case "dark":
      return "light";
  }
}
