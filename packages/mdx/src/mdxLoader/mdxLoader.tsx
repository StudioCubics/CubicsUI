import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeSlug from "rehype-slug";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { components } from "../components";
import type { ListItemProps } from "@cubicsui/components";
import type {
  MDXFrontmatter,
  MDXLoaderProps,
  MDXMeta,
  MDXScope,
} from "./mdxLoader.types";

/** Walks `contentRoot` (relative to `process.cwd()`) and returns every page slug */
function walkPageSlugs(contentRoot: string): string[] {
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

export function mdxLoader(props: MDXLoaderProps) {
  const { contentRoot, readSource, readMeta } = props;
  // Slugs are computed once, at loader init time, by walking the filesystem.
  const pageSlugs = walkPageSlugs(contentRoot);

  async function getPage(
    param: string | string[] | undefined,
    options: EvaluateOptions<MDXScope> = {},
  ) {
    const slug = typeof param === "string" ? param : param?.join("/");
    let source: string;
    try {
      source = await readSource(`${slug}/page.mdx`);
    } catch {
      return;
    }
    const opts: EvaluateOptions<MDXScope> = {
      ...options,
      mdxOptions: {
        ...options?.mdxOptions,
        remarkPlugins: [remarkGfm, [remarkFlexibleToc, { skipLevels: [] }]],
        rehypePlugins: [rehypeMdxCodeProps, rehypeSlug],
      },
      parseFrontmatter: options.parseFrontmatter ?? true,
      vfileDataIntoScope: "toc",
    };
    const evaluatedPage = await evaluate<MDXFrontmatter, MDXScope>({
      source,
      options: opts,
      components,
    });

    return evaluatedPage;
  }

  /** Trie node used while grouping flat slugs into a nested tree */
  type TrieNode = { isPage: boolean; children: Map<string, TrieNode> };

  function buildTrie(slugs: string[]) {
    const root: TrieNode = { isPage: false, children: new Map() };
    for (const slug of slugs) {
      let node = root;
      for (const seg of slug.split("/")) {
        if (!node.children.has(seg)) {
          node.children.set(seg, { isPage: false, children: new Map() });
        }
        node = node.children.get(seg)!;
      }
      node.isPage = true;
    }
    return root;
  }

  /** Calls the app's `readMeta`, defaulting to `undefined` if absent/missing/throws */
  async function safeReadMeta(
    relFolderPath: string,
  ): Promise<MDXMeta | undefined> {
    if (!readMeta) return undefined;
    try {
      return await readMeta(relFolderPath ? `${relFolderPath}/meta` : "meta");
    } catch {
      return undefined;
    }
  }

  /** Reads frontmatter only (no MDX compile) — cheap, for tree labels */
  async function readFrontmatter(slug: string): Promise<Partial<MDXFrontmatter>> {
    try {
      const source = await readSource(`${slug}/page.mdx`);
      return matter(source).data as Partial<MDXFrontmatter>;
    } catch {
      return {};
    }
  }

  async function buildNodes(
    node: TrieNode,
    pathSegments: string[],
    baseHref: string,
  ): Promise<ListItemProps[]> {
    const folderPath = pathSegments.join("/");
    const meta = await safeReadMeta(folderPath);
    // No meta.tsx (or it threw) → fall back to every child, alphabetically.
    // With meta.tsx → only ids listed in `order`, in that order.
    const ids = meta?.order ?? Array.from(node.children.keys()).sort();

    const items: ListItemProps[] = [];
    for (const id of ids) {
      const child = node.children.get(id);
      if (!child) continue; // id in order but no matching file/folder

      const slug = [...pathSegments, id].join("/");
      const extraProps = meta?.pages?.[id];
      const hasChildren = child.children.size > 0;
      if (hasChildren) {
        // Folder → collapsible node, recurse for its children.
        const nodes = await buildNodes(child, [...pathSegments, id], baseHref);
        const frontmatter = child.isPage ? await readFrontmatter(slug) : {};
        items.push({
          type: "collapsible",
          id: slug,
          nodes,
          href: child.isPage ? `${baseHref}/${slug}` : undefined,
          children: frontmatter.title ?? id,
          ...extraProps,
        } as ListItemProps);
      } else {
        // Leaf → actual page.
        const frontmatter = await readFrontmatter(slug);
        items.push({
          type: "item",
          href: `${baseHref}/${slug}`,
          children: frontmatter.title ?? id,
          ...extraProps,
        } as ListItemProps);
      }
    }
    return items;
  }

  /**
   * Builds the sidebar `ListItemProps[]` tree from the slugs computed at
   * loader init, honoring each folder's `meta.tsx` ordering (when
   * `readMeta` is provided and resolves for that folder).
   * @param baseHref - URL prefix prepended to each page's href, e.g. `"/docs"`.
   */
  async function getPageTree(baseHref: string): Promise<ListItemProps[]> {
    const trie = buildTrie(pageSlugs);
    return buildNodes(trie, [], baseHref);
  }

  return { getPage, getPageTree };
}
