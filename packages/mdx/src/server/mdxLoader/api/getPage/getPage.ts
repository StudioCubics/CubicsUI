import { type EvaluateOptions, evaluate } from "next-mdx-remote-client/rsc";
import { defaultComponents } from "../../../../shared/defaultComponents";
import type {
  MDXFrontmatter,
  MDXLoaderContext,
  MDXScope,
} from "../../mdxLoader.types";
import {
  defaultRehypePlugins,
  defaultRemarkPlugins,
} from "../../mdxLoader.utils";
import { getBreadcrumbs } from "./getPage.utils";

export function createGetPage(ctx: MDXLoaderContext) {
  const {
    components,
    readSource,
    basePath,
    remarkPlugins = [],
    rehypePlugins = [],
  } = ctx;

  const pageSlugs = new Set(ctx.pageSlugs);

  return async function getPage<H extends string = string>(
    param: string | string[] | undefined,
    options: EvaluateOptions<MDXScope<H>> = {},
  ) {
    const slug = typeof param === "string" ? param : param?.join("/");
    let source: string;
    try {
      source = await readSource(`${slug}/page.mdx`);
    } catch {
      return;
    }
    const opts: EvaluateOptions<MDXScope<H>> = {
      ...options,
      mdxOptions: {
        ...options?.mdxOptions,
        remarkPlugins: [
          ...defaultRemarkPlugins,
          ...remarkPlugins,
          ...(options.mdxOptions?.remarkPlugins ?? []),
        ],
        rehypePlugins: [
          ...defaultRehypePlugins,
          ...rehypePlugins,
          ...(options.mdxOptions?.rehypePlugins ?? []),
        ],
      },
      parseFrontmatter: options.parseFrontmatter ?? true,
      vfileDataIntoScope: "toc",
    };
    const evaluatedPage = await evaluate<MDXFrontmatter, MDXScope<H>>({
      source,
      options: opts,
      components: { ...defaultComponents, ...components },
    });

    // Built after evaluation so the current crumb uses the evaluated frontmatter title
    const breadcrumbs = await getBreadcrumbs<H>(
      slug,
      pageSlugs,
      readSource,
      basePath,
      evaluatedPage.frontmatter?.title,
    );

    return {
      ...evaluatedPage,
      scope: { ...evaluatedPage.scope, breadcrumbs },
    };
  };
}
