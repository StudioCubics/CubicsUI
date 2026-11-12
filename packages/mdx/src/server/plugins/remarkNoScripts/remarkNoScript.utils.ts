import type { Nodes } from "mdast";

// Node types that always carry executable JS
const SCRIPT_NODE_TYPES = new Set<Nodes["type"]>(["mdxjsEsm"]);

/** True for `{/ * comment * /}`, which compiles to nothing */
const isCommentOnly = (value: string) =>
  /^\s*(\/\*[\s\S]*?\*\/\s*)*$/.test(value);

/** True for `{"text"}`, `{123}`, `{true}`, `{null}`: no code, just a literal */
const isLiteralOnly = (value: string) =>
  /^\s*(true|false|null|-?\d+(\.\d+)?|"[^"\\]*"|'[^'\\]*')\s*$/.test(value);

export function hasScript(node: Nodes): boolean {
  if (SCRIPT_NODE_TYPES.has(node.type)) return true;
  if (node.type === "mdxFlowExpression" || node.type === "mdxTextExpression") {
    return !isCommentOnly(node.value);
  }
  // JSX elements carry attributes; narrowing on `type` gives you the typed shape
  if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
    return node.attributes.some((attr) => {
      if (attr.type === "mdxJsxExpressionAttribute") return true; // {...props}
      if (typeof attr.value === "object" && attr.value !== null) {
        return !isLiteralOnly(attr.value.value); // title={"x"} passes, onClick={() => ...} throws
      }
      return false;
    });
  }
  return false;
}

export function noScriptsWalk(node: Nodes) {
  if (hasScript(node)) {
    throw new Error(
      `Scripts are not allowed in MDX content (found "${node.type}")`,
    );
  }
  if ("children" in node) node.children.forEach(noScriptsWalk);
}
