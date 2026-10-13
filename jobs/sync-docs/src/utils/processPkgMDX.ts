import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { transformKnownMDXTags } from "./transformKnownMDXTags.js";
import type { Context } from "../types.js";
import { shortMdxPath, shortDestFile } from "./pathShorteners.js";
import { dfName } from "../constants/global.js";
import { transformKnownJSDocTags } from "./transformKnownJSDocTags.js";
import { finaliseMDX } from "./finaliseMDX.js";

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
