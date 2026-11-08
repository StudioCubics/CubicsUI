"use client";

import { Tab, Tabs, TabsBar, useTheme } from "@cubicsui/components";
import { cn } from "@cubicsui/utils";
import { Editor } from "@monaco-editor/react";
import styles from "./MonacoEditor.module.css";
import type { MonacoEditorProps } from "./MonacoEditor.types";
import {
  handleEditorBeforeMount,
  handleEditorOnMount,
} from "./monacoEditorHandlers";

export function MonacoEditor(props: MonacoEditorProps) {
  const { resolvedTheme } = useTheme();
  const {
    id,
    height = "100%",
    slotProps = {},
    className,
    tabsMgr,
    disableBorderRadius,
    ...rest
  } = props;

  const activeFile = tabsMgr?.activeFile;
  const modelPath =
    id && activeFile ? `${id}-${activeFile}` : id ? id : activeFile;

  return (
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
        theme={resolvedTheme === "dark" ? "cubicsui-dark" : "cubicsui-light"}
        path={modelPath}
        onMount={handleEditorOnMount}
        beforeMount={handleEditorBeforeMount}
        height={height}
        className={cn(
          className,
          styles.root,
          disableBorderRadius && styles.disableBorderRadius,
        )}
        {...rest}
        options={{
          automaticLayout: true,
          fontFamily: "var(--font-code)",
          fontSize: 14,
          fontLigatures: true,
          ...rest.options,
          padding: {
            top: 12,
            ...rest.options?.padding,
          },
          scrollbar: {
            alwaysConsumeMouseWheel: false,
            ...rest.options?.scrollbar,
          },
          minimap: { enabled: false, ...rest.options?.minimap },
        }}
      />
    </Tabs>
  );
}
