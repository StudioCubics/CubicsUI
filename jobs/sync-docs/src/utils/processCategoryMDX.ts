import fs from "node:fs";
import path from "node:path";
import { toCamelCase } from "@cubicsui/utils";
import matter from "gray-matter";
import { dfName } from "../constants/global.js";
import type { Context } from "../types.js";
import { finaliseMDX } from "./finaliseMDX.js";
import { getCategoryFromPath } from "./getCategoryFromPath.js";
import { shortDestFile, shortMdxPath } from "./pathShorteners.js";
import { transformKnownJSDocTags } from "./transformKnownJSDocTags.js";
import { transformKnownMDXTags } from "./transformKnownMDXTags.js";

export function processCategoryMdx(mdxPath: string, context: Context): void {
  const raw = fs.readFileSync(mdxPath, "utf8");

  const { data: existingFrontmatter, content } = matter(raw);

  const category = getCategoryFromPath(mdxPath, context);

  let transformedContent = transformKnownMDXTags(content, mdxPath, context);
  transformedContent = transformKnownJSDocTags(transformedContent, context);
  const frontmatter = {
    title: category,
    id: toCamelCase(category),
    packageVersion: context.pkgDetails.version,
    ...existingFrontmatter,
  };

  const destDir = path.join(context.docBaseUrl, toCamelCase(category));

  const destFile = path.join(destDir, `${dfName}.mdx`);

  fs.mkdirSync(destDir, {
    recursive: true,
  });

  transformedContent = finaliseMDX(transformedContent, frontmatter);

  fs.writeFileSync(destFile, transformedContent);

  console.log(`✓ ${shortMdxPath(mdxPath)} -> ${shortDestFile(destFile)}`);
}
