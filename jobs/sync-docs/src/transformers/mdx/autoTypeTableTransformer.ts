import ts from "typescript";
import type { Context, MDXTagTransformer } from "../../types.js";
import path from "path";
import { isExported } from "../../utils/isExported.js";

interface PropEntry {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default: string;
  deprecated?: string;
}

/**
 * Extracts JSDoc tags from a symbol into a flat Record<tagName, tagText>.
 */
function extractJsDocTags(symbol: ts.Symbol): Record<string, string> {
  const tags: Record<string, string> = {};

  for (const tag of symbol.getJsDocTags()) {
    tags[tag.name] = tag.text ? ts.displayPartsToString(tag.text).trim() : "";
  }

  return tags;
}
interface ResolvedTypeProps {
  mainDescription: string;
  result: PropEntry[];
}
/**
 * Resolves the props of a type by name from a TypeScript file.
 * Returns null if the type cannot be found.
 */
export function resolveTypeProps(
  typesPath: string,
  typeName: string,
  context: Context,
): ResolvedTypeProps | null {
  const { program, checker } = context;
  const sourceFile = program.getSourceFile(typesPath);
  if (!sourceFile) return null;

  // Walk top-level exports to find the named type/interface
  let targetSymbol: ts.Symbol | undefined;

  ts.forEachChild(sourceFile, (node) => {
    if (
      (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
      ts.isIdentifier(node.name) &&
      node.name.text === typeName &&
      isExported(node)
    ) {
      targetSymbol = checker.getSymbolAtLocation(node.name);
    }
  });

  if (!targetSymbol) return null;
  const mainDescription = ts
    .displayPartsToString(targetSymbol.getDocumentationComment(checker))
    .trim();
  const type = checker.getDeclaredTypeOfSymbol(targetSymbol);
  const props = type.getProperties();

  const entries = props
    .filter((prop) => {
      const decls = prop.getDeclarations();
      return decls?.every(
        (d) => !d.getSourceFile().fileName.includes("node_modules"),
      );
    })
    .map((prop) => {
      const tags = extractJsDocTags(prop);

      const description = ts
        .displayPartsToString(prop.getDocumentationComment(checker))
        .trim();

      const required = !(prop.flags & ts.SymbolFlags.Optional);
      // Use the declared type text from source instead of the resolved/expanded type
      let typeStr: string;
      const decl = prop.valueDeclaration ?? prop.getDeclarations()?.[0];
      if (decl && ts.isPropertySignature(decl) && decl.type) {
        typeStr = decl.type.getText();
      } else {
        // fallback to resolved type
        const propType = checker.getTypeOfSymbolAtLocation(prop, decl!);
        typeStr = checker.typeToString(propType);
      }
      // Strip typescript generics using regex fallback for fully resolved strings if necessary
      typeStr = typeStr.replace(/<[^>]*>/g, "");

      const entry: PropEntry = {
        name: prop.getName(),
        type: typeStr,
        required,
        description: description || "—",
        default: tags["default"] ?? "—",
        ...(tags["deprecated"] !== undefined && {
          deprecated: tags["deprecated"],
        }),
      };

      return { entry, tags };
    });

  const result = entries
    .filter(({ tags }) => !("internal" in tags)) // skip @internal
    .map(({ entry }) => entry);

  return {
    mainDescription,
    result,
  };
}

/** Generate a markdown props table from TypeScript compiler API output */
function buildPropsTable(
  typesPath: string,
  typeName: string,
  context: Context,
): string {
  try {
    const { mainDescription, result } =
      resolveTypeProps(typesPath, typeName, context) ?? {};

    if (!result || result.length === 0) return "";

    const rows = result.map((p) => {
      const type = p.type.replace(/\|/g, "\\|"); // escape pipes in MDX tables
      // const required = p.required ? "✓" : "";
      return `| **${p.name}** | \`${type}\` | \`${p.default}\` | ${p.description} |`;
    });

    return [
      mainDescription,
      "\n",
      `<section id="${typeName.toLowerCase()}">`,
      "| Prop | Type | Default | Description |",
      "|------|------|---------|-------------|",
      ...rows,
      "</section>",
    ].join("\n");
  } catch (e) {
    console.error("❌ buildPropsTable error:", e);
    return "";
  }
}
/**
 * Transforms <auto-type-table/> to a proper mdx table by taking type info
 * from the file specified in attrs.path based on the attrs.name
 */
export const autoTypeTableTransformer: MDXTagTransformer = (
  attrs,
  mdxPath,
  context,
) => {
  const relativePath = attrs.path;
  const typeName = attrs.name;

  if (!relativePath || !typeName) {
    console.warn(`<auto-type-table/> Missing required attrs in ${mdxPath}`);
    return "";
  }

  const absolutePath = path.resolve(path.dirname(mdxPath), relativePath);
  return buildPropsTable(absolutePath, typeName, context);
};
