import path from "path";
import type { Context } from "../types.js";

export function getCategoryFromPath(
  filePath: string,
  context: Context,
): string {
  const rel = path.relative(context.pkgDetails.docSrcPath, filePath);
  const cat = rel.split(path.sep)[0];
  if (!cat) {
    throw new Error("Could not find category");
  }
  return cat;
}
