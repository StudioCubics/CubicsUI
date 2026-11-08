import type { TabProps, TabsBarProps, TabsProps } from "@cubicsui/components";
import type { EditorProps } from "@monaco-editor/react";
import type { ComponentProps, CSSProperties } from "react";

export type MonacoEditorProps = {
  name?: string;
  /** Id of the monaco instance */
  id?: string;
  /** Height of the editor */
  height?: CSSProperties["height"];
  /** Removes rounded corner */
  disableBorderRadius?: boolean;
  /** Manage tabs by passing an object */
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
