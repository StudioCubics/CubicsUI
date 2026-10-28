import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { dfName } from "../constants/global.js";
import type { Context } from "../types.js";
import { finaliseMDX } from "./finaliseMDX.js";
import { shortDestFile, shortMdxPath } from "./pathShorteners.js";
import { transformKnownJSDocTags } from "./transformKnownJSDocTags.js";
import { transformKnownMDXTags } from "./transformKnownMDXTags.js";

export function processPkgMDX(mdxPath: string, context: Context) {
  const raw = fs.readFileSync(mdxPath, "utf8");

  const { data: existingFrontmatter, content } = matter(raw);

  let transformedContent = transformKnownMDXTags(content, mdxPath, context);
  transformedContent = transformKnownJSDocTags(transformedContent, context);
  const frontmatter = {
    id: context.pkg,
    packageVersion: context.pkgDetails.version,
    pkg: context.pkgDetails.name,
    ...existingFrontmatter,
  };

  const destFile = path.join(context.docBaseUrl, `${dfName}.mdx`);

  fs.mkdirSync(context.docBaseUrl, {
    recursive: true,
  });

  transformedContent = finaliseMDX(transformedContent, frontmatter);

  fs.writeFileSync(destFile, transformedContent);

  console.log(`✓ ${shortMdxPath(mdxPath)} -> ${shortDestFile(destFile)}`);
}
