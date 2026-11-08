import type { MdNode } from "./remarkCallout.types";

// Matches "[!TYPE]" optionally followed by a custom title on the same line
export const REMARK_CALLOUT_MARKER = /^\[!([A-Za-z]+)\][ \t]*([^\n]*)/;

export const DEFAULT_REMARK_CALLOUT_TYPES = [
  "note",
  "tip",
  "important",
  "warning",
  "caution",
] as const;

/** Turns soft line breaks ("\n" in text nodes) into hard `break` nodes so they render as <br /> */
export function preserveLineBreaks(node: MdNode): MdNode[] | undefined {
  const { children } = node;
  if (!children) return;
  return children.flatMap((child): MdNode[] => {
    if (child.type !== "text" || !child.value?.includes("\n")) {
      preserveLineBreaks(child);
      return [child];
    }
    return child.value
      .split("\n")
      .flatMap((line, i): MdNode[] =>
        i === 0
          ? [{ type: "text", value: line }]
          : [{ type: "break" }, { type: "text", value: line }],
      );
  });
}

// Returns a Callout node, or undefined if the blockquote isn't a callout
export function toCallout(
  node: MdNode,
  types: readonly string[],
): MdNode | undefined {
  const paragraph = node.children?.[0];
  if (paragraph?.type !== "paragraph" || !paragraph.children) return;

  const text = paragraph.children[0];
  if (text?.type !== "text" || text.value === undefined) return;

  // No match or unknown type -> leave as a normal blockquote
  const match = REMARK_CALLOUT_MARKER.exec(text.value);
  if (!match) return;
  const type = match[1].toLowerCase();
  if (!types.includes(type)) return;

  // Custom title: "> [!NOTE] My title", otherwise the capitalized type
  const title = match[2].trim() || type.charAt(0).toUpperCase() + type.slice(1);

  // Strip the marker line (text + optional hard break) from the content
  const rest = text.value.slice(match[0].length).replace(/^\n/, "");
  if (rest) {
    text.value = rest;
  } else {
    paragraph.children.shift();
    if (paragraph.children[0]?.type === "break") paragraph.children.shift();
  }
  if (paragraph.children.length === 0) node.children?.shift();

  // Keep the author's line breaks inside the callout body
  node.children = preserveLineBreaks(node);

  return {
    type: "mdxJsxFlowElement",
    name: "Callout",
    attributes: [
      { type: "mdxJsxAttribute", name: "type", value: type },
      { type: "mdxJsxAttribute", name: "title", value: title },
    ],
    children: node.children ?? [],
  };
}

// Depth-first walk that replaces matching blockquotes in their parent
export function calloutWalk(node: MdNode, types: readonly string[]) {
  const { children } = node;
  if (!children) return;
  children.forEach((child, i) => {
    const callout = child.type === "blockquote" && toCallout(child, types);
    // Recurse into whichever node ended up in this slot, so nested blockquotes are handled too
    if (callout) {
      children[i] = callout;
      calloutWalk(callout, types);
    } else {
      calloutWalk(child, types);
    }
  });
}
