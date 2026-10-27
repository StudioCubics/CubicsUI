import { createGetPage } from "./api/getPage";
import { createGetPageTree } from "./api/getPageTree";
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
  const { contentRoot, components = {}, readSource, readMeta } = props;

  const ctx: MDXLoaderContext = {
    contentRoot,
    components,
    readSource,
    readMeta,
    // Slugs are computed once, at loader init time, by walking the filesystem.
    pageSlugs: walkPageSlugs(contentRoot),
  };

  return {
    getPage: createGetPage(ctx),
    getPageTree: createGetPageTree(ctx),
    getStaticParams: createGetStaticParams(ctx),
  };
}
