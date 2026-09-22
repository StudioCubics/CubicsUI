import type ts from "typescript";
import type { PackageDetails } from "./utils/getPackageDetails.js";
import type { DocDetails } from "./utils/getDocDetails.js";

/** A leaf sidebar entry for a single component's doc page */
export interface ComponentMetaItem {
  /** Defaults to "item" when omitted */
  type?: "item";
  /** Display label shown in the sidebar */
  children: string;
  /** Route to the component's doc page */
  href: string;
}

/** A sidebar entry for a category folder, optionally holding nested items */
export interface ComponentMetaCollapsible {
  type: "collapsible";
  /** Unique id for the category, used to find/merge this node across passes */
  id: string;
  /** Display label shown in the sidebar */
  children: string;
  /** Only present when a real _category.mdx page exists for this folder */
  href?: string;
  /** Nested items/collapsibles under this category */
  nodes: ComponentMetaNode[];
}

/** A single node in the sidebar meta tree: either a leaf item or a category */
export type ComponentMetaNode = ComponentMetaItem | ComponentMetaCollapsible;

/**
 * Shared execution context for the documentation sync pipeline.
 *
 * Contains resolved package metadata, TypeScript program state,
 * and output path configuration used across MDX processing steps.
 */
export interface Context {
  /** Package name being processed (e.g. "components") */
  pkg: string;

  /** Absolute path to the packages directory root */
  pkgDir: string;

  /** Resolved package metadata (tsconfig paths, doc sources, etc.) */
  pkgDetails: PackageDetails;

  /** Resolved documentation output configuration (base path + filesystem root) */
  docDetails: DocDetails;

  /** TypeScript program instance used for type resolution */
  program: ts.Program;

  /** TypeScript type checker used for symbol/type inspection */
  checker: ts.TypeChecker;

  /** Builds the meta file for the paths and children etc to make a sidebar link  */
  componentsMeta: ComponentMetaNode[];
}

/**
 * Transforms JSDoc tags to what you want
 */
export type JSDocTagTransformer = (
  symbolName: string,
  label: string,
  context: Context,
) => string;

/**
 * Transforms MDX tag to what you want
 */
export type MDXTagTransformer = (
  attrs: Record<string, string>,
  mdxPath: string,
  context: Context,
) => string;
