import { icons } from "@cubicsui/icons/registry";
import {
  extractText,
  LANGUAGE_IDENTIFIER_TO_EXTENSION,
  toCamelCase,
} from "@cubicsui/utils";
import { Children, isValidElement } from "react";
import { MonacoEditor } from "../../Inputs/MonacoEditor/MonacoEditor";
import styles from "./CodeBlock.module.css";
import type { CodeBlockProps } from "./CodeBlock.types";
import { getCodeHeight, hashCode } from "./CodeBlock.utils";
import { CodeBlockFrame } from "./CodeBlockFrame";
import { CodeBlockPkgManager } from "./CodeBlockPkgManager";

export function CodeBlock(props: CodeBlockProps) {
  const { icon, id: _id, title, children } = props;
  const codeElement = Children.only(children);
  if (
    !isValidElement<{ className?: string; title?: string }>(codeElement) ||
    codeElement.type !== "code"
  )
    throw new Error(
      "Something is wrong with code element that should've been rendered here!",
    );
  const code = extractText(codeElement).replace(/\r?\n$/, "");
  const codeChildProps = codeElement.props;
  const lang = codeChildProps?.className?.replace("language-", "");
  const extension = lang ? (LANGUAGE_IDENTIFIER_TO_EXTENSION[lang] ?? "") : "";

  const base = title ? toCamelCase(title) : "unknown";
  const id = _id ?? `${base}-${hashCode(code)}${extension}`;
  // TODO make icons dynamic so external icon libraries can also be used
  const Icon = icon ? icons[icon as keyof typeof icons] : undefined;
  const iconNode = Icon ? <Icon /> : undefined;

  // ```npm fences are expanded into pnpm / yarn / bun / deno tabs
  if (lang === "npm") {
    return (
      <CodeBlockPkgManager id={id} icon={iconNode} title={title} code={code} />
    );
  }

  return (
    <CodeBlockFrame icon={iconNode} title={title} code={code}>
      <MonacoEditor
        id={id}
        defaultValue={code}
        height={getCodeHeight(code)}
        className={styles.editor}
        loading={<pre>{code}</pre>}
        options={{
          readOnly: true,
          scrollBeyondLastLine: false,
          renderLineHighlight: "none",
          scrollbar: { vertical: "hidden" },
          hideCursorInOverviewRuler: true,
        }}
      />
    </CodeBlockFrame>
  );
}
