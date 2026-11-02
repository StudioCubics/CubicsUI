import type { TabProps, TabsBarProps, TabsProps } from "@cubicsui/components";
import type { EditorProps } from "@monaco-editor/react";
import type { ComponentProps, CSSProperties } from "react";

export type MonacoEditorProps = {
  name?: string;
  id?: string;
  height?: CSSProperties["height"];
  tabsMgr?: {
    activeFile?: string;
    visibleFiles?: string[];
    setActiveFile?: (path: string) => void;
  };
  slotProps?: {
    root?: ComponentProps<"div">;
    tabs?: TabsProps;
    tabsBar?: TabsBarProps;
    tab?: TabProps;
  };
} & EditorProps;
