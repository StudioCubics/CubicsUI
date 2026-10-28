/**
 * Parses:
 * key="value"
 */
export function parseAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};

  const attrRegex = /(\w+)="([^"]*)"/g;

  let match: RegExpExecArray | null = attrRegex.exec(attrString);

  while (match !== null) {
    if (match[1]) {
      attrs[match[1]] = match[2] ?? "";
    }
    match = attrRegex.exec(attrString);
  }
  return attrs;
}
