"use client";

import { readExternalFlag, useExternalFlag } from "@cubicsui/hooks";
import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import {
  type Context,
  createContext,
  type ReactElement,
  useContext,
  useEffect,
} from "react";
import styles from "./SidebarLayout.module.css";
import type {
  SidebarLayoutBaseProps,
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

function SidebarLayoutBase(props: SidebarLayoutProps): ReactElement {
  const {
    as,
    children,
    className,
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
    ...rest
  } = props;

  const storageKey = `sidebarOpen-${id}`;
  const isControlled = open !== undefined;
  const [storedOpen, setStoredOpen] = useExternalFlag(
    storageKey,
    !defaultClosed,
  );
  const sidebarOpen = isControlled ? open : storedOpen;
  const Component = as || "div";

  // Controlled mode: push the stored value to the parent once on mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: its onOpenChange dumbass
  useEffect(() => {
    if (!isControlled) return;
    const stored = readExternalFlag(storageKey);
    if (stored !== null && stored !== open) onOpenChange?.(stored);
  }, [storageKey, isControlled]);

  function toggleSidebar() {
    const next = !sidebarOpen;
    setStoredOpen(next); // persist only on user action
    onOpenChange?.(next);
  }
  // Persist controlled changes made from outside
  useEffect(() => {
    if (isControlled && open !== readExternalFlag(storageKey))
      setStoredOpen(open);
  }, [isControlled, open, storageKey, setStoredOpen]);

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
      <Component
        {...rest}
        suppressHydrationWarning
        id={id}
        data-size={size}
        data-open={sidebarOpen}
        className={cn(
          styles.root,
          className,
          closesTo && styles[`closesTo_${closesTo}`],
          type && styles[`type_${type}`],
        )}
      >
        {children}
      </Component>
      {/* fuc FOUC */}
      <SidebarScript
        {...slotProps.script}
        storageKey={storageKey}
        defaultClosed={defaultClosed}
        containerId={id}
      />
    </SidebarLayoutContext.Provider>
  );
}
SidebarLayoutBase.displayName = "SidebarLayout";

export const SidebarLayout = SidebarLayoutBase as PolymorphicComponentType<
  SidebarLayoutBaseProps,
  "div"
>;
