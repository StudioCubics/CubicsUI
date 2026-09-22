import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { getCategoryFromPath } from "./getCategoryFromPath.js";
import { toCamelCase } from "@cubicsui/utils";
import { transformKnownJSDocTags } from "./transformKnownJSDocTags.js";
import { transformKnownMDXTags } from "./transformKnownMDXTags.js";
import type { Context } from "../types.js";
import { shortDestFile, shortMdxPath } from "./pathShorteners.js";
import { dfName } from "../constants/global.js";
import { upsertCategoryNode } from "./upsertCategoryNode.js";

export function processComponentMdx(mdxPath: string, context: Context): void {
  const raw = fs.readFileSync(mdxPath, "utf8");
  const { data: existingFrontmatter, content } = matter(raw);
  const componentName = path.basename(mdxPath, ".mdx");
  const category = getCategoryFromPath(mdxPath, context);
  const slug = toCamelCase(componentName);
  let transformedContent = transformKnownMDXTags(content, mdxPath, context);
  transformedContent = transformKnownJSDocTags(transformedContent, context);

  const frontmatter = {
    title: componentName,
    category,
    slug,
    packageVersion: context.pkgDetails.version,
    ...existingFrontmatter,
  };
  const destDir = path.join(
    context.docDetails.docRoot,
    toCamelCase(category),
    slug,
  );
  const destFile = path.join(destDir, `${dfName}.mdx`);

  fs.mkdirSync(destDir, {
    recursive: true,
  });

  fs.writeFileSync(destFile, matter.stringify(transformedContent, frontmatter));

  const categoryNode = upsertCategoryNode(category, category, context);
  categoryNode.nodes.push({
    children: frontmatter.title,
    href: `/${context.pkg}/${toCamelCase(category)}/${slug}`,
  });
  
  console.log(`✓ ${shortMdxPath(mdxPath)} -> ${shortDestFile(destFile)}`);
}
