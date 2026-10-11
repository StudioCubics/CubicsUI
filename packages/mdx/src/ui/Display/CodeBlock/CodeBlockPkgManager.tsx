"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  PACKAGE_MANAGERS,
  toPkgManagerCommands,
  type PackageManager,
} from "@cubicsui/utils";
import { MonacoEditor } from "../../Inputs/MonacoEditor/MonacoEditor";
import { CodeBlockFrame } from "./CodeBlockFrame";
import { getCodeHeight } from "./Codeblock.utils";

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
        }}
      />
    </CodeBlockFrame>
  );
}
