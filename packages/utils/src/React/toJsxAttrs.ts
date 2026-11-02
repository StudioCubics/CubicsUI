/**
 * Serializes a props object into a JSX attribute string.
 */
export function toJsxAttrs(props: Record<string, unknown>): string {
  return Object.entries(props)
    .map(([key, value]) => {
      switch (typeof value) {
        case "string":
          return `${key}="${value}"`;
        case "undefined":
          return "";
        case "boolean":
          return value ? key : "";
        default:
          return `${key}={${JSON.stringify(value)}}`;
      }
    })
    .filter(Boolean)
    .join(" ");
}
