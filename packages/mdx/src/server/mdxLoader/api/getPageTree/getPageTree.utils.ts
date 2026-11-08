import { getFrontmatter } from "next-mdx-remote-client/utils";
import type {
  MDXFrontmatter,
  MDXLoaderContext,
  MDXPageTreeMeta,
  TrieNode,
} from "../../mdxLoader.types";

export function buildTrie(slugs: string[]) {
  const root: TrieNode = {
    isPage: false,
    children: new Map(),
  };
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

/** Reads frontmatter only (no MDX compile) cheap, for tree labels */
export async function readFrontmatter(
  slug: string,
  ctx: MDXLoaderContext,
): Promise<Partial<MDXFrontmatter>> {
  const { readSource } = ctx;
  try {
    const source: unknown = await readSource(`${slug}/page.mdx`);
    // tsx page → default export is a component, no frontmatter to parse
    if (typeof source !== "string") return {};
    return getFrontmatter<Partial<MDXFrontmatter>>(source).frontmatter;
  } catch {
    return {};
  }
}

/** Calls the app's `readMeta`, defaulting to `undefined` if absent/missing/throws */
export async function safeReadMeta(
  relFolderPath: string,
  ctx: MDXLoaderContext,
): Promise<MDXPageTreeMeta | undefined> {
  const { readMeta } = ctx;
  if (!readMeta) return undefined;
  try {
    return await readMeta(relFolderPath ? `${relFolderPath}/meta` : "meta");
  } catch {
    return undefined;
  }
}
