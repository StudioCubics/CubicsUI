import { toCamelCase } from "@cubicsui/utils";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { transformKnownMDXTags } from "./transformKnownMDXTags.js";
import type { Context } from "../types.js";
import { getCategoryFromPath } from "./getCategoryFromPath.js";
import { shortMdxPath, shortDestFile } from "./pathShorteners.js";
import { dfName } from "../constants/global.js";
import { upsertCategoryNode } from "./upsertCategoryNode.js";

export function processCategoryMdx(mdxPath: string, context: Context): void {
  const raw = fs.readFileSync(mdxPath, "utf8");

  const { data: existingFrontmatter, content } = matter(raw);

  const category = getCategoryFromPath(mdxPath, context);

  const transformedContent = transformKnownMDXTags(content, mdxPath, context);

  const frontmatter = {
    title: category,
    slug: toCamelCase(category),
    packageVersion: context.pkgDetails.version,
    ...existingFrontmatter,
  };

  const destDir = path.join(context.docDetails.docRoot, toCamelCase(category));

  const destFile = path.join(destDir, `${dfName}.mdx`);

  fs.mkdirSync(destDir, {
    recursive: true,
  });

  fs.writeFileSync(destFile, matter.stringify(transformedContent, frontmatter));

  upsertCategoryNode(
    category,
    frontmatter.title,
    context,
    `/${context.pkg}/${toCamelCase(category)}`,
  );

  console.log(`✓ ${shortMdxPath(mdxPath)} -> ${shortDestFile(destFile)}`);
}
