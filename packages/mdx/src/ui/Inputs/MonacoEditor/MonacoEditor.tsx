"use client";

import { Editor } from "@monaco-editor/react";
import { Tab, Tabs, TabsBar } from "@cubicsui/components";
import {
  handleEditorBeforeMount,
  handleEditorOnMount,
} from "./monacoEditorHandlers";
import { useTheme } from "@cubicsui/components";
import type { MonacoEditorProps } from "./MonacoEditor.types";
import styles from "./MonacoEditor.module.css";
import { cn } from "@cubicsui/utils";

export function MonacoEditor(props: MonacoEditorProps) {
  const { resolvedTheme } = useTheme();
  const {
    name,
    id,
    height,
    slotProps = {},
    className,
    tabsMgr,
    ...rest
  } = props;

  const activeFile = tabsMgr?.activeFile;
  const modelPath =
    id && activeFile ? `${id}-${activeFile}` : id ? id : activeFile;

  return (
    <>
      <Tabs
        {...slotProps.tabs}
        defaultTab={slotProps.tabs?.defaultTab ?? tabsMgr?.activeFile}
      >
        {tabsMgr?.visibleFiles && tabsMgr.visibleFiles.length > 1 && (
          <TabsBar renderGlider {...slotProps.tabsBar}>
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
          height={height}
          className={cn(className, styles.editor)}
          {...rest}
          options={{
            minimap: { enabled: false },
            fontFamily: "var(--font-code)",
            fontSize: 14,
            padding: {
              top: 12,
            },
            fontLigatures: true,
            scrollbar: {
              alwaysConsumeMouseWheel: false,
            },
            ...rest.options,
          }}
        />
      </Tabs>
    </>
  );
}
