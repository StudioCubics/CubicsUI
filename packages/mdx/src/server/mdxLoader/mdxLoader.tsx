import { createGetPage } from "./api/getPage/getPage";
import { createGetPageTree } from "./api/getPageTree/getPageTree";
import { buildTrie } from "./api/getPageTree/getPageTree.utils";
import { createGetSearchIndex } from "./api/getSearchIndex/getSearchIndex";
import { createGetStaticParams } from "./api/getStaticParams";
import type { MDXLoaderContext, MDXLoaderProps } from "./mdxLoader.types";
import { walkPageSlugs } from "./mdxLoader.utils";

/** Loads the mdx files from the contentRoot
 * ```tsx
 * import { components } from "@/lib/mdx/components";
 * import { mdxLoader } from "@cubicsui/mdx";
 *
 * export const mdxSource = mdxLoader({
 *   components,
 *   contentRoot: "content/docs",
 *   readSource: async (relPath) => {
 *     const mod = await import(`@/content/docs/${relPath}`);
 *     return mod.default;
 *   },
 *   readMeta: async (metaPath) => {
 *     const mod = await import(`@/content/docs/${metaPath}`);
 *     return mod.default;
 *   },
 * });
 * ```
 */
export function mdxLoader(props: MDXLoaderProps) {
  const {
    basePath = "",
    components = {},
    contentRoot,
    remarkPlugins,
    rehypePlugins,
    readSource,
    readMeta,
    embed,
  } = props;

  // Slugs and pageTrie are computed once, at loader init time, by walking the filesystem.
  const pageSlugs = walkPageSlugs(contentRoot),
    pageTrie = buildTrie(pageSlugs);

  const ctx: MDXLoaderContext = {
    basePath,
    components,
    contentRoot,
    remarkPlugins,
    rehypePlugins,
    pageSlugs,
    pageTrie,
    readSource,
    readMeta,
    embed,
  };

  return {
    getPage: createGetPage(ctx),
    getPageTree: createGetPageTree(ctx),
    getStaticParams: createGetStaticParams(ctx),
    getSearchIndex: createGetSearchIndex(ctx),
  };
}
