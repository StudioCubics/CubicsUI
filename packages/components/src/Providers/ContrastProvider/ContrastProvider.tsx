"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactElement,
  type Context,
} from "react";
import { notImplemented, withDisabledTransitions } from "@cubicsui/utils";
import type {
  ContrastContextProps,
  ContrastProviderProps,
  ContrastScriptProps,
} from "./ContrastProvider.types";
import { useLocalStorage } from "@cubicsui/hooks";
import { script } from "./script";

const IS_SERVER = typeof window === "undefined";
export const CONTRAST_PROVIDER_DEFAULTS: Required<ContrastScriptProps> = {
  attribute: "data-contrast",
  storageKey: "contrastPreference",
  defaultContrast: false,
};

export const ContrastContext: Context<ContrastContextProps | null> =
  createContext<ContrastContextProps | null>(null);

export function useContrast(): ContrastContextProps {
  const c = useContext(ContrastContext);
  if (!c)
    return {
      contrast: false,
      setContrast: notImplemented,
    };
  return c;
}

export function ContrastProvider(props: ContrastProviderProps): ReactElement {
  const {
    children,
    attribute = CONTRAST_PROVIDER_DEFAULTS.attribute,
    storageKey = CONTRAST_PROVIDER_DEFAULTS.storageKey,
    defaultContrast = CONTRAST_PROVIDER_DEFAULTS.defaultContrast,
    disableTransitionOnChange = false,
    nonce,
    scriptProps,
  } = props;
  const asaProps = {
    storageKey,
    defaultContrast,
    attribute,
  };

  const [contrast, setContrastState] = useLocalStorage<boolean>(
    storageKey,
    defaultContrast,
  );

  function applyContrast(value: boolean) {
    if (IS_SERVER) return;
    let d = document.documentElement;
    if (!!value) d.setAttribute(attribute, JSON.stringify(value));
    else d.removeAttribute(attribute);
  }

  function setContrast(value: boolean) {
    setContrastState(value);
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (e) {
      // Unsupported
    }
  }

  // Cross-tab syncing
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      const newC = Boolean(e.newValue) || defaultContrast;
      setContrastState(newC);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [storageKey, defaultContrast]);

  useEffect(() => {
    if (disableTransitionOnChange) {
      withDisabledTransitions(() => applyContrast(contrast), { nonce });
    } else {
      applyContrast(contrast);
    }
  }, [applyContrast, contrast, disableTransitionOnChange, nonce]);

  return (
    <ContrastContext.Provider
      value={{
        contrast,
        setContrast,
      }}
    >
      <script
        {...scriptProps}
        suppressHydrationWarning
        nonce={typeof window === "undefined" ? nonce : ""}
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${JSON.stringify(asaProps)})`,
        }}
      />
      {children}
    </ContrastContext.Provider>
  );
}
