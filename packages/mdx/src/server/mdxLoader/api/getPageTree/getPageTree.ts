import type { ListDefaultHrefType, ListItemProps } from "@cubicsui/components";
import { toCapitalised } from "@cubicsui/utils";
import type { MDXLoaderContext, TrieNode } from "../../mdxLoader.types";
import { readFrontmatter, safeReadMeta } from "./getPageTree.utils";

export function createGetPageTree(ctx: MDXLoaderContext) {
  const { pageTrie } = ctx;

  async function buildNodes<T extends ListDefaultHrefType>(
    node: TrieNode,
    pathSegments: string[],
    baseHref: string,
  ): Promise<ListItemProps<T>[]> {
    const folderPath = pathSegments.join("/");
    const meta = await safeReadMeta(folderPath, ctx);

    // No meta.tsx (or it threw) → fall back to every child, alphabetically.
    // With meta.tsx → only ids listed in `order`, in that order.
    // A "..." entry in `order` expands to all remaining children (alphabetical).
    const listed = new Set(meta?.order);
    const rest = Array.from(node.children.keys())
      .filter((id) => !listed.has(id))
      .sort();
    const ids = meta?.order
      ? Array.from(
          new Set(meta.order.flatMap((id) => (id === "..." ? rest : id))),
        )
      : rest;

    // Siblings are resolved in parallel; Promise.all preserves `ids` order.
    const items = await Promise.all(
      ids.map(async (id): Promise<ListItemProps<T> | undefined> => {
        const child = node.children.get(id);
        if (!child) return undefined; // id in order but no matching file/folder

        const slug = [...pathSegments, id].join("/");
        const extraProps = meta?.pages?.[id];
        const hasChildren = child.children.size > 0;
        if (hasChildren) {
          // Folder → collapsible node, recurse for its children.
          const [childNodes, frontmatter] = await Promise.all([
            buildNodes<T>(child, [...pathSegments, id], baseHref),
            child.isPage
              ? readFrontmatter(slug, ctx)
              : { title: toCapitalised(id) },
          ]);
          return {
            ...extraProps,
            nodes: childNodes,
            href: child.isPage ? `${baseHref}/${slug}` : undefined,
            children: frontmatter.title,
            id: slug,
            type: "collapsible",
          } as ListItemProps<T>;
        }
        // Leaf → actual page.
        const frontmatter = await readFrontmatter(slug, ctx);
        return {
          ...extraProps,
          type: "item",
          href: `${baseHref}/${slug}`,
          children: frontmatter.title ?? toCapitalised(id),
        } as ListItemProps<T>;
      }),
    );
    return items.filter((item): item is ListItemProps<T> => item !== undefined);
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
    // Strip trailing slashes so hrefs never contain `//`.
    return buildNodes<T>(pageTrie, [], baseHref.replace(/\/+$/, ""));
  };
}
