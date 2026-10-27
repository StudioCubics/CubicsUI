import fs from "node:fs";
import path from "node:path";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeSlug from "rehype-slug";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";
import type { MDXRehypePlugins, MDXRemarkPlugins } from "./mdxLoader.types";

/** Walks `contentRoot` (relative to `process.cwd()`) and returns every page slug */
export function walkPageSlugs(contentRoot: string): string[] {
  const absRoot = path.join(process.cwd(), contentRoot);
  const slugs: string[] = [];

  function walk(dir: string, prefix: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), `${prefix}${entry.name}/`);
      } else if (entry.name === "page.mdx") {
        slugs.push(prefix.slice(0, -1)); // strip trailing slash
      }
    }
  }

  walk(absRoot, "");
  return slugs;
}
// Defaults the loader depends on (toc, slugs, code props) - always applied first
export const defaultRemarkPlugins: MDXRemarkPlugins = [
  remarkGfm,
  [remarkFlexibleToc, { skipLevels: [] }],
];
export const defaultRehypePlugins: MDXRehypePlugins = [
  rehypeMdxCodeProps,
  rehypeSlug,
];
