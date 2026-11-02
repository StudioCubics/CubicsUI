import type { ListDefaultHrefType, ListItemProps } from "@cubicsui/components";
import { toCapitalised } from "@cubicsui/utils";
import matter from "gray-matter";
import type {
  MDXFrontmatter,
  MDXLoaderContext,
  MDXMeta,
  TrieNode,
} from "../mdxLoader.types";

function buildTrie(slugs: string[]) {
  const root: TrieNode = { isPage: false, children: new Map() };
  for (const slug of slugs) {
    let node = root;
    for (const seg of slug.split("/")) {
      let child = node.children.get(seg);
      if (!child) {
        child = { isPage: false, children: new Map() };
        node.children.set(seg, child);
      }
      node = child;
    }
    node.isPage = true;
  }
  return root;
}

export function createGetPageTree(ctx: MDXLoaderContext) {
  const { pageSlugs, readSource, readMeta } = ctx;

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

  /** Reads frontmatter only (no MDX compile) cheap, for tree labels */
  async function readFrontmatter(
    slug: string,
  ): Promise<Partial<MDXFrontmatter>> {
    try {
      const source = await readSource(`${slug}/page.mdx`);
      return matter(source).data as Partial<MDXFrontmatter>;
    } catch {
      return {};
    }
  }

  async function buildNodes<T extends ListDefaultHrefType>(
    node: TrieNode,
    pathSegments: string[],
    baseHref: string,
  ): Promise<ListItemProps<T>[]> {
    const folderPath = pathSegments.join("/");
    const meta = await safeReadMeta(folderPath);
    // No meta.tsx (or it threw) → fall back to every child, alphabetically.
    // With meta.tsx → only ids listed in `order`, in that order.
    const ids = meta?.order ?? Array.from(node.children.keys()).sort();

    const items: ListItemProps<T>[] = [];
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
          children: frontmatter.title ?? toCapitalised(id),
          ...extraProps,
        } as ListItemProps<T>);
      } else {
        // Leaf → actual page.
        const frontmatter = await readFrontmatter(slug);
        items.push({
          type: "item",
          href: `${baseHref}/${slug}`,
          children: frontmatter.title ?? id,
          ...extraProps,
        } as ListItemProps<T>);
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
  return async function getPageTree<T extends ListDefaultHrefType>(
    baseHref: string,
  ): Promise<ListItemProps<T>[]> {
    const trie = buildTrie(pageSlugs);
    return buildNodes(trie, [], baseHref);
  };
}
