"use client";

import { Editor, type EditorProps } from "@monaco-editor/react";
import {
  Tab,
  Tabs,
  TabsBar,
  type TabProps,
  type TabsBarProps,
  type TabsProps,
} from "@cubicsui/components";
import { type ComponentProps, type CSSProperties } from "react";
import {
  handleEditorBeforeMount,
  handleEditorOnMount,
} from "./monacoEditorHandlers";
import { useTheme } from "@cubicsui/components";

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

export function MonacoEditor(props: MonacoEditorProps) {
  const { resolvedTheme } = useTheme();
  const { name, id, height, slotProps = {}, tabsMgr, ...rest } = props;

  const activeFile = tabsMgr?.activeFile;
  const modelPath =
    id && activeFile ? `${id}-${activeFile}` : id ? id : activeFile;

  return (
    <div {...slotProps.root} style={{ ...slotProps.root?.style, height }}>
      <Tabs
        {...slotProps.tabs}
        defaultTab={slotProps.tabs?.defaultTab ?? tabsMgr?.activeFile}
      >
        {tabsMgr?.visibleFiles && tabsMgr.visibleFiles.length > 1 && (
          <TabsBar size="sm" renderGlider {...slotProps.tabsBar}>
            {tabsMgr?.visibleFiles.map((file) => (
              <Tab
                {...slotProps.tab}
                key={file}
                value={file}
                onClick={() => tabsMgr.setActiveFile?.(file)}
              >
                {file}
              </Tab>
            ))}
          </TabsBar>
        )}
        <Editor
          theme={resolvedTheme == "dark" ? "cubicsui-dark" : "cubicsui-light"}
          path={modelPath}
          onMount={handleEditorOnMount}
          beforeMount={handleEditorBeforeMount}
          {...rest}
          options={{
            minimap: { enabled: false },
            fontFamily: "var(--font-code)",
            fontSize: 14,
            fontLigatures: true,
            ...rest.options,
          }}
        />
      </Tabs>
    </div>
  );
}
