"use client";

import { ResizablePanels } from "@cubicsui/components";
import { useState } from "react";
import { MonacoEditor } from "../MonacoEditor/MonacoEditor";
import type { SandcubeClientProps, SandcubeFiles } from "./Sandcube.types";
import { SandcubeRunner } from "./SandcubeRunner/SandcubeRunner";

export function SandcubeClient(props: SandcubeClientProps) {
  const {
    files: initialFiles,
    title,
    entry = "/App.tsx",
    width = "100%",
    height = "40vh",
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
    <ResizablePanels
      width={width}
      height={height}
      columns={2}
      layout={"row"}
      disableEdgeHandles
      {...rest}
    >
      <SandcubeRunner id={"sandcube_editor"} files={files} entry={entry} />
      <MonacoEditor
        id={title}
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
        options={{ readOnly: files[activeFile]?.readOnly }}
        tabsMgr={{ activeFile, visibleFiles, setActiveFile }}
      />
    </ResizablePanels>
  );
}
