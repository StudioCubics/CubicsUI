"use client";

import { SplitPanels } from "@cubicsui/components";
import { cn } from "@cubicsui/utils";
import { useState } from "react";
import { MonacoEditor } from "../../MonacoEditor/MonacoEditor";
import type { SandcubeClientProps, SandcubeFiles } from "../Sandcube.types";
import { SandcubeRunner } from "../SandcubeRunner/SandcubeRunner";
import styles from "./SandcubeClient.module.css";

export function SandcubeClient(props: SandcubeClientProps) {
  const {
    files: initialFiles,
    title,
    entry = "/App.tsx",
    className,
    ...rest
  } = props;
  const [files, setFiles] = useState<SandcubeFiles>(() =>
    Object.fromEntries(
      initialFiles.map((f) => [
        f.path,
        {
          code: f.code,
          hidden: f.hidden ?? false,
          readOnly: f.readOnly ?? false,
          initialCode: f.code,
        },
      ]),
    ),
  );
  const visibleFiles = Object.keys(files).filter((path) => !files[path].hidden);
  const [activeFile, setActiveFile] = useState(
    visibleFiles.includes(entry) ? entry : visibleFiles[0],
  );

  return (
    <SplitPanels
      minFirstSize={300}
      minSecondSize={300}
      className={cn(className, styles.root)}
      {...rest}
    >
      <SandcubeRunner files={files} entry={entry} />
      <MonacoEditor
        id={title}
        disableBorderRadius
        defaultValue={files[activeFile]?.code}
        onChange={(value) =>
          setFiles((prev) => ({
            ...prev,
            [activeFile]: { ...prev[activeFile], code: value ?? "" },
          }))
        }
        loading={
          <pre
            style={{
              width: "100%",
              height: "100%",
              padding: "var(--gap-3) var(--gap-5)",
            }}
          >
            {files[activeFile].code}
          </pre>
        }
        options={{
          readOnly: files[activeFile]?.readOnly,
          lineNumbersMinChars: 4,
        }}
        tabsMgr={{ activeFile, visibleFiles, setActiveFile }}
      />
    </SplitPanels>
  );
}
