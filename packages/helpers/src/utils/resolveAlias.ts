import { resolve } from "path";
import { TSConfigPathsResult } from "./loadTsConfigPaths.js";

/**
 * Resolves an alias path using tsconfig/jsconfig paths.
 * @param importPath - The path found in the import statement.
 * @param tsconfigPaths - Loaded tsconfig path aliases and baseUrl.
 * @returns Fully resolved absolute file system path if matched, otherwise null.
 */
export default function resolveAlias(
  importPath: string,
  tsconfigPaths: TSConfigPathsResult
): string | null {
  const { paths, baseUrl } = tsconfigPaths;
  for (const alias in paths) {
    if (importPath.startsWith(alias)) {
      const subPath = importPath.slice(alias.length);
      return resolve(baseUrl, paths[alias], subPath);
    }
  }
  return null;
}
