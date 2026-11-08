import type { MDXRemarkPlugins } from "../../mdxLoader/mdxLoader.types";
import type { DEFAULT_REMARK_CALLOUT_TYPES } from "./remarkCallout.utils";

// Minimal structural mdast node, enough for what this plugin touches
export interface MdNode {
  type: string;
  value?: string;
  name?: string;
  attributes?: { type: string; name: string; value: string }[];
  children?: MdNode[];
}

// Function member of the plugin list, derived from next-mdx-remote-client's types
export type RemarkPlugin = Extract<
  MDXRemarkPlugins[number],
  (...args: never[]) => unknown
>;

export type DefaultRemarkCalloutType =
  (typeof DEFAULT_REMARK_CALLOUT_TYPES)[number];
