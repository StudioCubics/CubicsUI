import fs from "fs-extra";
import { join } from "path";

/**
 * Attempts to resolve a file path by trying known extensions and index files.
 * Throws an error if resolution fails.
 * @param resolvedPath - Absolute path without extension.
 * @param knownExtensions - Array containing extensions that should be allowed.
 * @returns Final resolved file path with extension.
 * @throws If the file cannot be found.
 */
export default function resolveWithExtensions(
  resolvedPath: string,
  knownExtensions: string[]
): string {
  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
    return resolvedPath;
  }

  for (const ext of knownExtensions) {
    if (fs.existsSync(resolvedPath + ext)) {
      return resolvedPath + ext;
    }
  }

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
    for (const ext of knownExtensions) {
      const indexPath = join(resolvedPath, `index${ext}`);
      if (fs.existsSync(indexPath)) {
        return indexPath;
      }
    }
  }

  throw new Error(`⛔ Cannot resolve file: ${resolvedPath}`);
}
