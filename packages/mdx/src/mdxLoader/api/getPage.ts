import type { BreadcrumbItem } from "@cubicsui/components";
import { toCapitalCase } from "@cubicsui/utils";
import { type EvaluateOptions, evaluate } from "next-mdx-remote-client/rsc";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { defaultComponents } from "../../components";
import type {
  MDXFrontmatter,
  MDXLoaderContext,
  MDXScope,
} from "../mdxLoader.types";
import { defaultRehypePlugins, defaultRemarkPlugins } from "../mdxLoader.utils";

// Frontmatter title of an ancestor page, falls back to the capitalised id
async function getCrumbTitle(
  id: string,
  path: string,
  readSource: MDXLoaderContext["readSource"],
): Promise<string> {
  try {
    const source = await readSource(`${path}/page.mdx`);
    const { frontmatter } = getFrontmatter<Partial<MDXFrontmatter>>(source);
    if (typeof frontmatter.title === "string" && frontmatter.title) {
      return frontmatter.title;
    }
  } catch {
    // No readable page for this path, use the fallback below
  }
  return toCapitalCase(id);
}

async function getBreadcrumbs<H extends string = string>(
  slug: string | undefined,
  pageSlugs: Set<string>,
  readSource: MDXLoaderContext["readSource"],
  // URL prefix the content is served under
  basePath: string,
  // Title from the evaluated frontmatter of the current page
  currentTitle: string | undefined,
): Promise<BreadcrumbItem<H>[]> {
  const segments = slug?.split("/").filter(Boolean) ?? [];
  return Promise.all(
    segments.map(async (id, i): Promise<BreadcrumbItem<H>> => {
      const path = segments.slice(0, i + 1).join("/");
      // No page for this path => disabled, no href, title from the id
      if (!pageSlugs.has(path)) {
        return { id, disabled: true, children: toCapitalCase(id) };
      }
      const isCurrent = i === segments.length - 1;
      return {
        id,
        href: `${basePath}/${path}` as H,
        children:
          isCurrent && currentTitle
            ? currentTitle
            : await getCrumbTitle(id, path, readSource),
      };
    }),
  );
}

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
      scope: { ...options.scope, ...evaluatedPage.scope, breadcrumbs },
    };
  };
}
