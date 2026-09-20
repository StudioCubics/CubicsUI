import type ts from "typescript";
import type { PackageDetails } from "./utils/getPackageDetails.js";
import type { DocDetails } from "./utils/getDocDetails.js";

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
