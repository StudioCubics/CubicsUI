import fs from "node:fs";
import path from "node:path";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "../plugins/rehypeSlug/rehypeSlug";
import remarkCallouts from "../plugins/remarkCallout/remarkCallout";
import type { MDXRehypePlugins, MDXRemarkPlugins } from "./mdxLoader.types";

export const MDX_PAGE_FILES = ["page.mdx"];
/** Walks `contentRoot` (relative to `process.cwd()`) and returns every page slug */
export function walkPageSlugs(contentRoot: string): string[] {
  const absRoot = path.join(
    /*turbopackIgnore: true*/
    process.cwd(),
    contentRoot,
  );
  // Set so a folder with both page.mdx and page.tsx is only added once
  const slugs = new Set<string>();

  function walk(dir: string, prefix: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), `${prefix}${entry.name}/`);
      } else if (MDX_PAGE_FILES.includes(entry.name)) {
        slugs.add(prefix.slice(0, -1)); // strip trailing slash
      }
    }
  }

  walk(absRoot, "");
  return Array.from(slugs);
}

/** Defaults the loader depends on (toc, slugs, code props) */
export const defaultRemarkPlugins: MDXRemarkPlugins = [
  remarkGfm,
  [remarkFlexibleToc, { skipLevels: [] }],
  remarkCallouts,
];
export const defaultRehypePlugins: MDXRehypePlugins = [
  rehypeMdxCodeProps,
  rehypeSlug,
];
