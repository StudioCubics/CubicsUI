import path from "path";
import ts from "typescript";
import type { Context, JSDocTagTransformer } from "../../types.js";
import { isExported } from "../../utils/isExported.js";

/**
 * Resolves a symbol name to its source file path using the TS checker,
 * then maps it to a docs webapp URL.
 */
export function resolveSymbolToDocsUrl(
  symbolName: string,
  context: Context,
): string | null {
  const { program, checker } = context;
  for (const sourceFile of program.getSourceFiles()) {
    // Skip TS lib files but NOT workspace packages resolved through node_modules
    if (
      sourceFile.fileName.includes("/node_modules/typescript/") ||
      sourceFile.fileName.includes("\\node_modules\\typescript\\") ||
      sourceFile.isDeclarationFile
    )
      continue;

    // Try module symbol path first (works when file is a proper ES module)
    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    if (moduleSymbol) {
      const exports = checker.getExportsOfModule(moduleSymbol);
      const match = exports.find((e) => e.getName() === symbolName);
      if (match) {
        const decl = match.getDeclarations()?.[0];
        if (decl) {
          return buildUrl(decl.getSourceFile().fileName, symbolName, context);
        }
      }
      continue; // had a module symbol but no matching export, skip to next file
    }

    // Fallback: walk top-level declarations directly
    for (const statement of sourceFile.statements) {
      if (
        (ts.isInterfaceDeclaration(statement) ||
          ts.isTypeAliasDeclaration(statement)) &&
        statement.name.text === symbolName &&
        isExported(statement)
      ) {
        return buildUrl(sourceFile.fileName, symbolName, context);
      }
    }
  }

  return null;
}

function buildUrl(
  absFilePath: string,
  symbolName: string,
  context: Context,
): string {
  const { pkgDetails, docDetails } = context;
  const rel = path.relative(pkgDetails.docSrcPath, absFilePath);
  const withoutExt = rel.replace(/\.(tsx?|jsx?)$/, "");
  const parts = withoutExt.split(path.sep);
  // Drop the last segment if it matches the parent folder (e.g. Ripple/Ripple → Ripple)
  if (
    parts.length >= 2 &&
    parts[parts.length - 1] === parts[parts.length - 2]
  ) {
    parts.pop();
  }
  const urlPath = parts.map((p) => p.toLowerCase()).join("/");
  // Append symbol anchor
  return `${docDetails.docBasePath}/${urlPath}#${symbolName.toLowerCase()}`;
}

export const linkTransformer: JSDocTagTransformer = (
  symbolName,
  label,
  context,
) => {
  const url = resolveSymbolToDocsUrl(symbolName, context);

  // \n before {@link} breaks the markdown table row — the caller must strip it,
  // but we return a space-prefixed link so it stays inline
  return url
    ? ` [${label}](${url})`
    : ` [${label}](#${symbolName.toLowerCase()})`;
};
