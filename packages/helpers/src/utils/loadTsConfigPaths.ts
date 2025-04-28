import { getTsconfig } from "get-tsconfig";
import { dirname, resolve } from "path";

export interface TSConfigPathsResult {
  paths: Record<string, string>;
  baseUrl: string;
}

/**
 * Loads tsconfig.json or jsconfig.json to retrieve path aliases and baseUrl.
 * @param configPath - Optional custom config path.
 * @returns An object containing resolved path mappings and baseUrl.
 */
export default function loadTsConfigPaths(
  configPath?: string
): TSConfigPathsResult {
  const tsconfig =
    getTsconfig(configPath || "tsconfig.json") || getTsconfig("jsconfig.json");

  const paths: Record<string, string> = {};
  let baseUrl = ".";

  if (tsconfig?.config.compilerOptions) {
    const compilerOptions = tsconfig.config.compilerOptions;

    if (compilerOptions.paths) {
      for (const [alias, targets] of Object.entries(compilerOptions.paths)) {
        const cleanAlias = alias.replace(/\*$/, "");
        const cleanTarget = targets[0].replace(/\*$/, "");
        paths[cleanAlias] = cleanTarget;
      }
    }

    if (compilerOptions.baseUrl) {
      baseUrl = resolve(dirname(tsconfig.path), compilerOptions.baseUrl);
    }
  }

  return { paths, baseUrl };
}
