import { KNOWN_JSDOC_TAGS } from "../constants/knownTags.js";
import type { Context } from "../types.js";

export function transformKnownJSDocTags(
  content: string,
  context: Context,
): string {
  if (KNOWN_JSDOC_TAGS.length === 0) return content;

  return (
    content
      // Collapse newline immediately before a {@tag} so table rows stay on one line
      .replace(/\n(\{@\w+\s+[^}]+\})/g, " $1")
      .replace(
        /\{@(\w+)\s+([^}]+)\}/g,
        (original, tagName: string, target: string) => {
          const knownTag = KNOWN_JSDOC_TAGS.find((t) => t.name === tagName);
          if (!knownTag) return original;

          const [symbolName, ...labelParts] = target.trim().split(/\s+/);
          const label =
            labelParts.length > 0 ? labelParts.join(" ") : symbolName;

          if (!symbolName) return label ?? "";

          return knownTag.transformer(symbolName, label ?? symbolName, context);
        },
      )
  );
}
