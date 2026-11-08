"use client";

import {
  PACKAGE_MANAGERS,
  type PackageManager,
  toPkgManagerCommands,
} from "@cubicsui/utils";
import { type ReactNode, useMemo, useState } from "react";
import { MonacoEditor } from "../../Inputs/MonacoEditor/MonacoEditor";
import { getCodeHeight } from "./CodeBlock.utils";
import { CodeBlockFrame } from "./CodeBlockFrame";

type PkgManagerCodeBlockProps = {
  id: string;
  icon?: ReactNode;
  title?: string;
  /** Raw npm snippet, e.g. `npm i -D @cubicsui/components` */
  code: string;
};

/** Renders an `npm` snippet as Monaco tabs: npm / pnpm / yarn / bun / deno */
export function CodeBlockPkgManager(props: PkgManagerCodeBlockProps) {
  const { id, icon, title, code } = props;
  const [active, setActive] = useState<PackageManager>("npm");
  const commands = useMemo(() => toPkgManagerCommands(code), [code]);
  const activeCode = commands[active];

  return (
    <CodeBlockFrame icon={icon} title={title} code={activeCode}>
      <MonacoEditor
        id={id}
        language="shell"
        defaultValue={activeCode}
        height={getCodeHeight(activeCode)}
        tabsMgr={{
          activeFile: active,
          visibleFiles: [...PACKAGE_MANAGERS],
          setActiveFile: (file: string) => setActive(file as PackageManager),
        }}
        options={{
          readOnly: true,
          scrollBeyondLastLine: false,
          foldingHighlight: false,
          lineNumbers: "off",
          renderLineHighlight: "none",
          scrollbar: { vertical: "hidden" },
          hideCursorInOverviewRuler: true,
        }}
      />
    </CodeBlockFrame>
  );
}
