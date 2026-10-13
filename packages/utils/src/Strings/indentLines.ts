/**
 * Add indents on every non-empty line of a multi-line string by the given indent.
 */
export function indentLines(content: string, indent: string): string {
  return content
    .split("\n")
    .map((line) => (line.length > 0 ? indent + line : line))
    .join("\n");
}
