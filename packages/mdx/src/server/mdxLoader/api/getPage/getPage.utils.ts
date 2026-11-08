import type { BreadcrumbItem } from "@cubicsui/components";
import { toCapitalCase } from "@cubicsui/utils";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import type { MDXFrontmatter, MDXLoaderContext } from "../../mdxLoader.types";

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

export async function getBreadcrumbs<H extends string = string>(
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
