import type ts from "typescript";

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
  /**
   * Absolute filesystem path where generated MDX files are written.
   * Example: ".../apps/docs/content/{docs/pkg/components}"
   */
  docBaseUrl: string;
  /** Relative path inside the doc that can be used to link Links inside the markdown
   * Example: "/docs"
   */
  docBasePath: string;

  /** TypeScript program instance used for type resolution */
  program: ts.Program;

  /** TypeScript type checker used for symbol/type inspection */
  checker: ts.TypeChecker;
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

/**
 * Resolved metadata for a package inside the monorepo.
 *
 * Includes filesystem paths, package.json metadata, and
 * TypeScript source configuration used for documentation generation.
 */
export interface PackageDetails {
  /** Absolute path to the package root directory */
  src: string;

  /** Package name from package.json */
  name: string;

  /** Raw parsed package.json contents */
  json: Record<string, unknown>;

  /** Package version from package.json */
  version: number;

  /** Absolute path to the source directory (typically /src) */
  pkgSrcPath: string;

  /** Absolute path to the package tsconfig.json */
  tsConfigPath: string;
}
