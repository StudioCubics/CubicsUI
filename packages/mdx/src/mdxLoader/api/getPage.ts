import { type EvaluateOptions, evaluate } from "next-mdx-remote-client/rsc";
import { defaultComponents } from "../../components";
import type {
  MDXFrontmatter,
  MDXLoaderContext,
  MDXScope,
} from "../mdxLoader.types";
import { defaultRehypePlugins, defaultRemarkPlugins } from "../mdxLoader.utils";

export function createGetPage(ctx: MDXLoaderContext) {
  const {
    components,
    readSource,
    remarkPlugins = [],
    rehypePlugins = [],
  } = ctx;

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
    const evaluatedPage = await evaluate<MDXFrontmatter, MDXScope>({
      source,
      options: opts,
      components: { ...defaultComponents, ...components },
    });

    return evaluatedPage;
  };
}
