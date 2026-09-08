"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactElement,
  type Context,
  useState,
} from "react";
import { notImplemented } from "@cubicsui/utils";
import type {
  PointerLightContextProps,
  PointerLightProps,
  PointerLightPropsBase,
  PointerLightProviderProps,
  PointerLightScriptProps,
} from "./PointerLightProvider.types";
import { useLocalStorage } from "@cubicsui/hooks";
import { PointerLight } from "./PointerLight/PointerLight";

export const POINTERLIGHT_PROVIDER_DEFAULTS: Required<PointerLightScriptProps> =
  {
    storageKey: "pointerLightPreference",
    defaultPointerLight: true,
  };
export const POINTERLIGHT_DEFAULTS: Required<
  Omit<PointerLightPropsBase, "slotProps">
> = {
  colorA: "var(--color-primary)",
  colorB: "var(--color-secondary)",
  opacity: 0.35,
};
export const PointerLightContext: Context<PointerLightContextProps | null> =
  createContext<PointerLightContextProps | null>(null);

export function usePointerLight(): PointerLightContextProps {
  const c = useContext(PointerLightContext);
  if (!c)
    return {
      pointerLight: true,
      setPointerLight: notImplemented,
      setPtrLightProps: notImplemented,
      resetPointerProps: notImplemented,
    };
  return c;
}

export function PointerLightProvider(
  props: PointerLightProviderProps,
): ReactElement {
  const {
    children,
    storageKey = POINTERLIGHT_PROVIDER_DEFAULTS.storageKey,
    defaultPointerLight = POINTERLIGHT_PROVIDER_DEFAULTS.defaultPointerLight,
    slotProps = {},
  } = props;

  const initialProps: PointerLightProps = {
    colorA: POINTERLIGHT_DEFAULTS.colorA,
    colorB: POINTERLIGHT_DEFAULTS.colorB,
    opacity: POINTERLIGHT_DEFAULTS.opacity,
    ...slotProps.pointerLight,
  };

  const [pointerLight, setPointerLightState] = useLocalStorage<boolean>(
    storageKey,
    defaultPointerLight,
  );
  const [ptrLightProps, setPtrLightProps] = useState(initialProps);

  function setPointerLight(value: boolean) {
    setPointerLightState(value);
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (e) {
      // Unsupported
    }
  }
  function resetPointerProps() {
    setPtrLightProps(initialProps);
  }

  // Cross-tab syncing
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      const newC = Boolean(e.newValue) || defaultPointerLight;
      setPointerLightState(newC);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [storageKey, defaultPointerLight]);

  return (
    <PointerLightContext.Provider
      value={{
        pointerLight,
        setPointerLight,
        setPtrLightProps,
        resetPointerProps,
      }}
    >
      {pointerLight && <PointerLight {...ptrLightProps} />}
      {children}
    </PointerLightContext.Provider>
  );
}
