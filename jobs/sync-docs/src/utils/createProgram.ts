import path from "path";
import ts from "typescript";

/**
 * Loads tsconfig and creates a TS program for the given file.
 */
export function createProgram(
  typesPath: string,
  componentsTsConfigPath: string, // pass components tsconfig, not sync-docs
): {
  program: ts.Program;
  checker: ts.TypeChecker;
} {
  const configFile = ts.readConfigFile(componentsTsConfigPath, ts.sys.readFile);
  const { options, fileNames } = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(componentsTsConfigPath),
  );

  const program = ts.createProgram([typesPath, ...fileNames], options);
  const checker = program.getTypeChecker();

  return { program, checker };
}
