"use client";

import {
  isServer,
  notImplemented,
  withDisabledTransitions,
} from "@cubicsui/utils";
import {
  type Context,
  createContext,
  type ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  ResolvedTheme,
  Theme,
  ThemeContextProps,
  ThemeProviderProps,
  ThemeScriptProps,
} from "./ThemeProvider.types";
import { ThemeScript } from "./ThemeScript";

const MEDIA = "(prefers-color-scheme: dark)";
export const THEME_PROVIDER_DEFAULTS: Required<
  Omit<ThemeScriptProps, "nonce" | "scriptProps">
> = {
  attribute: "data-theme",
  storageKey: "themePreference",
  defaultTheme: "light",
  enableSystem: true,
  enableColorScheme: false,
};

export const ThemeContext: Context<ThemeContextProps | null> =
  createContext<ThemeContextProps | null>(null);

export function useTheme(): ThemeContextProps {
  const c = useContext(ThemeContext);
  if (!c)
    return {
      theme: "light",
      setTheme: notImplemented,
      resolvedTheme: "light",
    };
  return c;
}

function getInitialTheme(
  storageKey: string,
  defaultTheme: Theme,
  enableSystem: boolean,
): Theme {
  if (isServer) return defaultTheme;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return stored as Theme;
  } catch {
    // Unsupported
  }

  return enableSystem
    ? window.matchMedia(MEDIA).matches
      ? "dark"
      : "light"
    : defaultTheme;
}

function resolveTheme(theme: Theme, enableSystem: boolean): ResolvedTheme {
  if (theme === "system" && enableSystem) {
    return !isServer && window.matchMedia(MEDIA).matches ? "dark" : "light";
  }
  return theme as ResolvedTheme;
}

export function ThemeProvider(props: ThemeProviderProps): ReactElement {
  const {
    children,
    attribute = THEME_PROVIDER_DEFAULTS.attribute,
    storageKey = THEME_PROVIDER_DEFAULTS.storageKey,
    defaultTheme = THEME_PROVIDER_DEFAULTS.defaultTheme,
    enableSystem = THEME_PROVIDER_DEFAULTS.enableSystem,
    enableColorScheme = THEME_PROVIDER_DEFAULTS.enableColorScheme,
    disableTransitionOnChange = false,
    nonce,
    scriptProps,
  } = props;
  const initialTheme = getInitialTheme(storageKey, defaultTheme, enableSystem);
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  // The resolved value applied to the DOM.
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    resolveTheme(initialTheme, enableSystem),
  );
  const scriptArgs = {
    attribute,
    storageKey,
    defaultTheme,
    enableSystem,
    enableColorScheme,
  };

  function setTheme(value: Theme) {
    setThemeState(value);
    setResolvedTheme(resolveTheme(value, enableSystem));
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      // Unsupported
    }
  }

  // Cross-tab syncing
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      const newTheme = (e.newValue as Theme) || defaultTheme;
      setThemeState(newTheme);
      setResolvedTheme(resolveTheme(newTheme, enableSystem));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [storageKey, defaultTheme, enableSystem]);

  // During in system mode, resolvedTheme sync with live OS changes.
  useEffect(() => {
    if (!enableSystem || theme !== "system" || isServer) return;
    const mql = window.matchMedia(MEDIA);
    const handleChange = () => {
      setResolvedTheme(mql.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [theme, enableSystem]);

  // Apply resolved theme
  useEffect(() => {
    function applyTheme(name: ResolvedTheme) {
      const d = document.documentElement;
      d.setAttribute(attribute, name);
      if (enableColorScheme) d.style.colorScheme = name;
    }
    if (disableTransitionOnChange) {
      withDisabledTransitions(() => applyTheme(resolvedTheme), { nonce });
    } else {
      applyTheme(resolvedTheme);
    }
  }, [
    resolvedTheme,
    disableTransitionOnChange,
    nonce,
    attribute,
    enableColorScheme,
  ]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
        systemEnabled: enableSystem,
      }}
    >
      <ThemeScript {...scriptArgs} nonce={nonce} scriptProps={scriptProps} />
      {children}
    </ThemeContext.Provider>
  );
}
