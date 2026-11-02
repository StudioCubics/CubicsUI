"use client";

import { cn, isServer } from "@cubicsui/utils";
import {
  type Context,
  createContext,
  type ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./SidebarLayout.module.css";
import type {
  SidebarLayoutContextProps,
  SidebarLayoutProps,
} from "./SidebarLayout.types";
import { SidebarScript } from "./SidebarScript";

const SIDEBAR_LAYOUT_DEFAULTS = {
  id: "MAIN",
  defaultClosed: false,
  closesTo: "shortened",
  variant: "contained",
  size: "md",
  type: "flex",
  side: "left",
} satisfies Omit<SidebarLayoutProps, "children">;

export const SidebarLayoutContext: Context<SidebarLayoutContextProps | null> =
  createContext<SidebarLayoutContextProps | null>(null);

export function useSidebarLayout(): SidebarLayoutContextProps {
  const c = useContext(SidebarLayoutContext);
  if (!c)
    throw new Error("Components must be wrapped in <SidebarLayoutProvider/>");
  return c;
}

export function SidebarLayout(props: SidebarLayoutProps): ReactElement {
  const {
    children,
    defaultClosed = SIDEBAR_LAYOUT_DEFAULTS.defaultClosed,
    id = SIDEBAR_LAYOUT_DEFAULTS.id,
    closesTo = SIDEBAR_LAYOUT_DEFAULTS.closesTo,
    variant = SIDEBAR_LAYOUT_DEFAULTS.variant,
    size = SIDEBAR_LAYOUT_DEFAULTS.size,
    type = SIDEBAR_LAYOUT_DEFAULTS.type,
    side = SIDEBAR_LAYOUT_DEFAULTS.side,
    slotProps = {},
    open,
    onOpenChange,
  } = props;

  const storageKey = `sidebarOpen-${id}`;
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(() =>
    defaultClosed ? !defaultClosed : true,
  );
  const sidebarOpen = isControlled ? open : internalOpen;

  // biome-ignore lint/correctness/useExhaustiveDependencies: its onOpenChange dumbass
  useEffect(() => {
    if (isServer) return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) {
        const parsed = JSON.parse(stored) as boolean;
        if (isControlled) onOpenChange?.(parsed);
        else setInternalOpen((prev) => (prev === parsed ? prev : parsed));
      }
    } catch {
      // Unsupported
    }
  }, [storageKey, isControlled]);

  // Persist on every change, including ones made from outside
  useEffect(() => {
    if (isServer) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(sidebarOpen));
    } catch {
      // Unsupported
    }
  }, [storageKey, sidebarOpen]);

  function toggleSidebar() {
    const next = !sidebarOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }
  return (
    <SidebarLayoutContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        side,
        closesTo,
        variant,
        size,
        type,
        defaultClosed,
        id,
      }}
    >
      <SidebarScript
        {...slotProps.script}
        storageKey={storageKey}
        defaultClosed={defaultClosed}
        containerId={id}
      />
      <div
        {...slotProps.root}
        suppressHydrationWarning
        id={id}
        data-size={size}
        data-open={sidebarOpen}
        className={cn(
          styles.root,
          closesTo && styles[`closesTo_${closesTo}`],
          type && styles[`type_${type}`],
        )}
      >
        {children}
      </div>
    </SidebarLayoutContext.Provider>
  );
}
