"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactElement,
  type Context,
  useState,
} from "react";
import { cn, isServer, notImplemented } from "@cubicsui/utils";
import type {
  SidebarLayoutSharedProps,
  SidebarLayoutContextProps,
  SidebarLayoutProps,
} from "./SidebarLayout.types";
import styles from "./SidebarLayout.module.css";
import { SidebarScript } from "./SidebarScript";

const SIDEBAR_LAYOUT_DEFAULTS: SidebarLayoutSharedProps = {
  id: "MAIN",
  defaultClosed: false,
  closesTo: "shortened",
  variant: "contained",
  size: "md",
  type: "flex",
  sidebarPosition: "left",
};

function getInitialSidebarOpen(defaultClosed?: boolean): boolean {
  return defaultClosed ? !defaultClosed : true;
}

export const SidebarLayoutContext: Context<SidebarLayoutContextProps> =
  createContext<SidebarLayoutContextProps>({
    sidebarOpen: false,
    toggleSidebar: notImplemented,
    defaultClosed: SIDEBAR_LAYOUT_DEFAULTS.defaultClosed,
    id: SIDEBAR_LAYOUT_DEFAULTS.id,
    closesTo: SIDEBAR_LAYOUT_DEFAULTS.closesTo,
    variant: SIDEBAR_LAYOUT_DEFAULTS.variant,
    size: SIDEBAR_LAYOUT_DEFAULTS.size,
    type: SIDEBAR_LAYOUT_DEFAULTS.type,
    sidebarPosition: SIDEBAR_LAYOUT_DEFAULTS.sidebarPosition,
  });

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
    sidebarPosition = SIDEBAR_LAYOUT_DEFAULTS.sidebarPosition,
    slotProps = {},
  } = props;

  const storageKey = `sidebarOpen-${id}`;
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    getInitialSidebarOpen(defaultClosed),
  );

  useEffect(() => {
    if (isServer) return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) {
        const parsed = JSON.parse(stored) as boolean;
        setSidebarOpen((prev) => (prev === parsed ? prev : parsed));
      }
    } catch (_) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  async function toggleSidebar() {
    setSidebarOpen((prev) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(!prev));
      } catch (_) {}
      return !prev;
    });
  }
  return (
    <SidebarLayoutContext.Provider
      value={
        {
          sidebarOpen,
          toggleSidebar,
          sidebarPosition,
          closesTo,
          variant,
          size,
          type,
          defaultClosed,
          id,
        } as Required<SidebarLayoutContextProps>
      }
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
