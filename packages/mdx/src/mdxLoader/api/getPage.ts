import { type EvaluateOptions, evaluate } from "next-mdx-remote-client/rsc";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeSlug from "rehype-slug";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";
import { defaultComponents } from "../../components";
import type {
  MDXFrontmatter,
  MDXLoaderContext,
  MDXScope,
} from "../mdxLoader.types";

export function createGetPage(ctx: MDXLoaderContext) {
  const { components, readSource } = ctx;

  return async function getPage(
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
      components: { ...defaultComponents, ...components },
    });

    return evaluatedPage;
  };
}
