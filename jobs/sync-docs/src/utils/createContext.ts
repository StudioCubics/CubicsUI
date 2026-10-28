import path from "node:path";
import ts from "typescript";
import { defaultTsCompilerOptions } from "../configs/tsProgram.js";
import { repoRoot } from "../constants/global.js";
import type { Context } from "../types.js";
import { getPackageDetails } from "./getPackageDetails.js";

export function createContext(pkg: string): Context {
  const pkgDir = path.resolve(repoRoot, "packages");
  const pkgDetails = getPackageDetails(pkg, pkgDir);
  const docPath = `/docs/${pkg}`;
  const docBaseUrl = path.resolve(repoRoot, `apps/docs/content${docPath}`);
  const configFile = ts.readConfigFile(
    pkgDetails.tsConfigPath,
    ts.sys.readFile,
  );
  const { options, fileNames } = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(pkgDetails.tsConfigPath),
  );
  const program = ts.createProgram(fileNames, {
    ...options,
    ...defaultTsCompilerOptions,
  });

  const checker = program.getTypeChecker();
  return { pkg, pkgDir, pkgDetails, docPath, docBaseUrl, program, checker };
}
