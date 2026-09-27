import path from "path";
import { repoRoot } from "../constants/global.js";

export interface DocDetails {
  /**
   * Absolute filesystem path where generated MDX files are written.
   * Example: ".../apps/docs/content/{components}"
   */
  docBaseUrl: string;
  /** Relative path inside the doc that can be used to link Links inside the markdown
   * Example: "/docs/${pkg}"
   */
  docPath: string;
}
/**
 * Builds documentation output paths for a given package.
 */
export function getDocDetails(pkg: string): DocDetails {
  const docPath = `/docs/${pkg}`;
  const docBaseUrl = path.resolve(repoRoot, `apps/docs/content${docPath}`);
  return { docBaseUrl, docPath };
}
