import { toCamelCase } from "@cubicsui/utils";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { transformKnownMDXTags } from "./transformKnownMDXTags.js";
import type { Context } from "../types.js";
import { getCategoryFromPath } from "./getCategoryFromPath.js";
import { shortMdxPath, shortDestFile } from "./pathShorteners.js";
import { banner, dfName } from "../constants/global.js";
import { transformKnownJSDocTags } from "./transformKnownJSDocTags.js";

export function processCategoryMdx(mdxPath: string, context: Context): void {
  const raw = fs.readFileSync(mdxPath, "utf8");

  const { data: existingFrontmatter, content } = matter(raw);

  const category = getCategoryFromPath(mdxPath, context);

  let transformedContent = transformKnownMDXTags(content, mdxPath, context);
  transformedContent = transformKnownJSDocTags(transformedContent, context);
  const frontmatter = {
    title: category,
    slug: toCamelCase(category),
    packageVersion: context.pkgDetails.version,
    ...existingFrontmatter,
  };

  const destDir = path.join(
    context.docDetails.docBaseUrl,
    toCamelCase(category),
  );

  const destFile = path.join(destDir, `${dfName}.mdx`);

  fs.mkdirSync(destDir, {
    recursive: true,
  });

  transformedContent = `${banner}${transformedContent}`;

  fs.writeFileSync(destFile, matter.stringify(transformedContent, frontmatter));

  console.log(`✓ ${shortMdxPath(mdxPath)} -> ${shortDestFile(destFile)}`);
}
