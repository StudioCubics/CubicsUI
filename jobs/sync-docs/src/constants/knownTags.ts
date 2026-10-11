import type { JSDocTagTransformer, MDXTagTransformer } from "../types.js";
import { autoTypeTableTransformer } from "../transformers/mdx/autoTypeTableTransformer.js";
import { autoSandcubeTransformer } from "../transformers/mdx/autoSandcubeTransformer.js";
import { linkTransformer } from "../transformers/jsdoc/linkTransformer.js";

export interface KnownJSDocTag {
  name: string;
  transformer: JSDocTagTransformer;
}
export interface KnownMDXTag {
  name: string;
  transformer: MDXTagTransformer;
}

/**
 * Registry of transformable custom MDX tags.
 */
export const KNOWN_TAGS: KnownMDXTag[] = [
  {
    name: "auto-type-table",
    transformer: autoTypeTableTransformer,
  },
  {
    name: "auto-sandcube",
    transformer: autoSandcubeTransformer,
  },
];

export const KNOWN_JSDOC_TAGS: KnownJSDocTag[] = [
  {
    name: "link",
    transformer: linkTransformer,
  },
];
