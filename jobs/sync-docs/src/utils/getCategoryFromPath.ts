import path from "node:path";
import type { Context } from "../types.js";

export function getCategoryFromPath(
  filePath: string,
  context: Context,
): string | undefined {
  const rel = path.relative(context.pkgDetails.docSrcPath, filePath);
  const cat = rel.split(path.sep)[0];
  if (!cat || path.extname(cat)) {
    throw new Error(
      "Could not find category, make sure _category.mdx file is in a folder inside of docSrcPath, and not at docSrcPath itself, for that use _pkg.mdx",
    );
  }
  return cat;
}
