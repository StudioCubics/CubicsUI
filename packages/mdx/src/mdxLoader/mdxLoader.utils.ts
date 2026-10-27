import fs from "node:fs";
import path from "node:path";

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
