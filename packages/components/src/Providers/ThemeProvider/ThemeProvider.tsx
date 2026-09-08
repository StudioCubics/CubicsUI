"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type Context,
} from "react";
import type {
  ThemeContextProps,
  ThemeProviderProps,
  ResolvedTheme,
  Theme,
  ThemeScriptProps,
} from "./ThemeProvider.types";
import { notImplemented, withDisabledTransitions } from "@cubicsui/utils";
import { script } from "./script";

const IS_SERVER = typeof window === "undefined";
const MEDIA = "(prefers-color-scheme: dark)";
export const THEME_PROVIDER_DEFAULTS: Required<ThemeScriptProps> = {
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
  if (IS_SERVER) return defaultTheme;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return stored as Theme;
  } catch (e) {
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
    return !IS_SERVER && window.matchMedia(MEDIA).matches ? "dark" : "light";
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

  function applyTheme(name: ResolvedTheme) {
    let d = document.documentElement;
    d.setAttribute(attribute, name);
    if (enableColorScheme) d.style.colorScheme = name;
  }

  function setTheme(value: Theme) {
    setThemeState(value);
    setResolvedTheme(resolveTheme(value, enableSystem));
    try {
      localStorage.setItem(storageKey, value);
    } catch (e) {
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
    if (!enableSystem || theme !== "system" || IS_SERVER) return;
    const mql = window.matchMedia(MEDIA);
    const handleChange = () => {
      setResolvedTheme(mql.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [theme, enableSystem]);

  // Apply resolved theme
  useEffect(() => {
    if (disableTransitionOnChange) {
      withDisabledTransitions(() => applyTheme(resolvedTheme), { nonce });
    } else {
      applyTheme(resolvedTheme);
    }
  }, [resolvedTheme, applyTheme, disableTransitionOnChange, nonce]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
        systemEnabled: enableSystem,
      }}
    >
      <script
        {...scriptProps}
        suppressHydrationWarning
        nonce={typeof window === "undefined" ? nonce : ""}
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${JSON.stringify(scriptArgs)})`,
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
}
