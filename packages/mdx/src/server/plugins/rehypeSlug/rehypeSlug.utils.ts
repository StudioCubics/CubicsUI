import type { Nodes } from "hast";

export const REHYPE_SLUG_HEADINGS = new Set([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);

/** Concatenates all text node values under a node */
export function toText(node: Nodes): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(toText).join("");
  return "";
}
