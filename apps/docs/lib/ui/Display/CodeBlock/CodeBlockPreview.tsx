import type { ReactElement } from "react";
import { MonacoEditor } from "../../Inputs/MonacoEditor/MonacoEditor";
import type { CodeBlockClientProps } from "./CodeBlock.types";

export function CodeBlockPreview({
  title,
  code,
}: {
  title: CodeBlockClientProps["title"];
  code: CodeBlockClientProps["code"];
}): ReactElement {
  return <MonacoEditor id={title} defaultValue={code} />;
}
