import { KNOWN_TAGS } from "../constants/knownTags.js";
import type { Context } from "../types.js";
import { parseAttributes } from "./parseAttributes.js";

export function transformKnownMDXTags(
  mdxContent: string,
  mdxPath: string,
  context: Context,
): string {
  let result = mdxContent;

  for (const tag of KNOWN_TAGS) {
    /**
     * Matches:
     * <auto-type-table ... />
     */
    const regex = new RegExp(`<${tag.name}\\s+([^>]*?)\\s*\\/?>`, "g");

    result = result.replace(regex, (_, attrString: string) => {
      const attrs = parseAttributes(attrString);

      return tag.transformer(attrs, mdxPath, context);
    });
  }

  return result;
}
