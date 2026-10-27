import type { MDXLoaderContext } from "../mdxLoader.types";

/** Returns params for Next's `generateStaticParams`. The root page (`""`) maps to an empty slug array. */
export function createGetStaticParams({ pageSlugs }: MDXLoaderContext) {
  return function getStaticParams() {
    return pageSlugs.map((slug) => ({ slug: slug ? slug.split("/") : [] }));
  };
}
