import { Children, isValidElement } from "react";
import type { CodeBlockProps } from "./CodeBlock.types";
import styles from "./CodeBlock.module.css";
import {
  cn,
  extractText,
  LANGUAGE_IDENTIFIER_TO_EXTENSION,
  toCamelCase,
} from "@cubicsui/utils";
import { CopyButton } from "@cubicsui/components";
import { MonacoEditor } from "../../Inputs/MonacoEditor/MonacoEditor";

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
  const code = extractText(codeElement);
  const codeChildProps = codeElement.props;
  const lang = codeChildProps?.className?.replace("language-", "");
  const extension = lang ? (LANGUAGE_IDENTIFIER_TO_EXTENSION[lang] ?? "") : "";

  const id =
    _id ??
    (title ? `${toCamelCase(title)}${extension}` : `unknown${extension}`);

  // line height at fontSize 14 is ~19px in monaco's default; used to size the editor to its content
  const LINE_HEIGHT = 19;
  const lineCount = code.split("\n").length;
  const height = lineCount * LINE_HEIGHT;
  // TODO const Icon=change text icon to component
  return (
    <div className={styles.root}>
      {/* Header div */}
      <div className={cn(styles.header)}>
        <span className={cn(styles.icon)}></span>
        {title}
      </div>
      {/* Main div */}
      <div className={cn(styles.main)}>
        {/* Overlay div */}
        <div className={cn(styles.overlay)}>
          <CopyButton textToCopy={code} title={title} />
        </div>
        <MonacoEditor
          id={id}
          defaultValue={code}
          height={height}
          options={{
            readOnly: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}
