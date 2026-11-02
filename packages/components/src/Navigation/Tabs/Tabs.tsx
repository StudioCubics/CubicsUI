"use client";

import { createContext, useContext, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import type { TabsContextProps, TabsProps } from "./Tabs.types";

const TabsContext = createContext<TabsContextProps | null>(null);

export function useTabs(): TabsContextProps {
  const c = useContext(TabsContext);
  if (!c) throw new Error("Components must be wrapped in <Tabs/>");
  return c;
}

export function Tabs(props: TabsProps): JSX.Element {
  const { children, defaultTab } = props;
  const [activeTab, setActiveTab] = useState<string | null>(defaultTab ?? null);
  const [prevDefaultTab, setPrevDefaultTab] = useState(defaultTab);

  // reset the active tab when defaultTab changes
  if (defaultTab !== prevDefaultTab) {
    setPrevDefaultTab(defaultTab);
    setActiveTab(defaultTab ?? null);
  }

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}
