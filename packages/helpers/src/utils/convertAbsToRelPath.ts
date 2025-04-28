import { relative } from "path";

/**
 * Converts a full absolute path to a relative path if a base directory is provided.
 * @param absPath - Absolute path to the file.
 * @param relativeTo - Optional base directory to make the path relative to.
 * @returns Relative or absolute path (normalized with `/` separators).
 */
export default function convertAbsToRelPath(
  absPath: string,
  relativeTo?: string
): string {
  if (relativeTo) {
    return relative(relativeTo, absPath).replace(/\\/g, "/");
  }
  return absPath;
}
