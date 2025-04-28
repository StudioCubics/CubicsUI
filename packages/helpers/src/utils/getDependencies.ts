import fs from "fs-extra";
import path from "path";
import { init, parse } from "es-module-lexer";
import {
  LocalDependency,
  ExternalDependency,
  Dependencies,
} from "@cubicsui/db";
import extractScriptTag from "./extractScriptTag.js";
import loadTsConfigPaths from "./loadTsConfigPaths.js";
import resolveWithExtensions from "./resolveWithExtensions.js";
import resolveAlias from "./resolveAlias.js";
import convertAbsToRelPath from "./convertAbsToRelPath.js";
import { possibleScriptExtensions } from "../constants/extensions.js";

/**
 * Analyzes a file and returns its local and external dependencies.
 * Supports .ts, .tsx, .js, .jsx, .vue, .svelte files.
 * Also respects TypeScript path aliases and baseUrl.
 *
 * @param filePath - Absolute path to the file to analyze.
 * @param configPath - Optional path to tsconfig.json or jsconfig.json.
 * @param relativeTo - Optional base path to make dependency paths relative.
 * @returns An object containing external and local dependencies.
 * @throws If any local import cannot be resolved to a real file.
 */
export default async function getDependencies(
  filePath: string,
  configPath?: string,
  relativeTo?: string
): Promise<Dependencies> {
  await init;

  const codeOriginal = fs.readFileSync(filePath, "utf-8");
  const ext: ExternalDependency[] = [];
  const lcl: LocalDependency[] = [];

  let code = codeOriginal;
  if (filePath.endsWith(".vue") || filePath.endsWith(".svelte")) {
    code = extractScriptTag(codeOriginal);
  }

  const [imports] = parse(code);
  const tsconfigPaths = loadTsConfigPaths(configPath);

  for (const imp of imports) {
    const importPath = code.slice(imp.s, imp.e).trim();

    if (importPath.startsWith(".") || importPath.startsWith("/")) {
      // imports that are for sure local module imports
      const resolvedRaw = path.resolve(path.dirname(filePath), importPath);
      const finalPath = resolveWithExtensions(
        resolvedRaw,
        possibleScriptExtensions
      );

      lcl.push({
        path: convertAbsToRelPath(finalPath, relativeTo),
        value: importPath,
        cmp: null,
      });
    } else {
      const aliasResolved = resolveAlias(importPath, tsconfigPaths);
      if (aliasResolved) {
        // Imports that matched with resolve aliases from tsconfig
        const finalPath = resolveWithExtensions(
          aliasResolved,
          possibleScriptExtensions
        );
        lcl.push({
          path: convertAbsToRelPath(finalPath, relativeTo),
          value: importPath,
          cmp: null,
        });
      } else {
        // rest all are external modules
        const parts = importPath.split("/");
        const packageName = importPath.startsWith("@")
          ? `${parts[0]}/${parts[1]}`
          : parts[0];

        if (!ext.some((dep) => dep.name === packageName)) {
          ext.push({ name: packageName });
        }
      }
    }
  }

  return { ext, lcl };
}
