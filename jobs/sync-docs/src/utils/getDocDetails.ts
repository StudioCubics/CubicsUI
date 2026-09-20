import path from "path";
import { repoRoot } from "../constants/global.js";

export interface DocDetails {
  /**
   * Base output path inside the docs content tree.
   * Example: "/docs/components"
   */
  docBasePath: string;

  /**
   * Absolute filesystem path where generated MDX files are written.
   * Example: ".../apps/cubicsui-com/docs/content/docs/components"
   */
  docRoot: string;
}
/**
 * Builds documentation output paths for a given package.
 */
export function getDocDetails(pkg: string): DocDetails {
  const docBasePath = `apps/docs/app/${pkg}`;
  const docRoot = path.resolve(repoRoot, docBasePath);
  return { docBasePath, docRoot };
}
