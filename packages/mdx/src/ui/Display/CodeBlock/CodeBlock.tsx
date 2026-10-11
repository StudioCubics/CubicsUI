import { Children, isValidElement } from "react";
import type { CodeBlockProps } from "./CodeBlock.types";
import {
  extractText,
  LANGUAGE_IDENTIFIER_TO_EXTENSION,
  toCamelCase,
} from "@cubicsui/utils";
import { MonacoEditor } from "../../Inputs/MonacoEditor/MonacoEditor";
import { CodeBlockFrame } from "./CodeBlockFrame";
import { CodeBlockPkgManager } from "./CodeBlockPkgManager";
import { getCodeHeight } from "./Codeblock.utils";

export function CodeBlock(props: CodeBlockProps) {
  const { icon, id: _id, title, children } = props;
  const codeElement = Children.only(children);
  if (
    !isValidElement<{ className?: string; title?: string }>(codeElement) ||
    codeElement.type != "code"
  )
    throw new Error(
      "Something is wrong with code element that should've been rendered here!",
    );
  const code = extractText(codeElement).replace(/\r?\n$/, "");
  const codeChildProps = codeElement.props;
  const lang = codeChildProps?.className?.replace("language-", "");
  const extension = lang ? (LANGUAGE_IDENTIFIER_TO_EXTENSION[lang] ?? "") : "";

  const id =
    _id ??
    (title ? `${toCamelCase(title)}${extension}` : `unknown${extension}`);

  // ```npm fences are expanded into pnpm / yarn / bun / deno tabs
  if (lang === "npm") {
    return (
      <CodeBlockPkgManager id={id} icon={icon} title={title} code={code} />
    );
  }

  // TODO const Icon=change text icon to component
  return (
    <CodeBlockFrame icon={icon} title={title} code={code}>
      <MonacoEditor
        id={id}
        defaultValue={code}
        height={getCodeHeight(code)}
        options={{
          readOnly: true,
          scrollBeyondLastLine: false,
        }}
      />
    </CodeBlockFrame>
  );
}
