"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { MDXPageData } from "../../mdxLoader/mdxLoader.types";

const MDXPageContext = createContext<MDXPageData<string> | null>(null);

/** Client provider  for current page, can be used like this:
 * ```tsx
 * import { MDXPageProvider } from "@cubisui/mdx";
 * import { mdxSource } from "./meta";
 *
 * export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
 *   const { slug } = await params;
 *   const page = await mdxSource.getPage(slug);
 *   if (!page) notFound();
 *   const { content, frontmatter, scope } = page;
 *   return (
 *     <MDXPageProvider frontmatter={frontmatter} scope={scope}>
 *       {content}
 *     </MDXPageProvider>
 *   );
 * }
 * ```
 */
export function MDXPageProvider<H extends string>({
  frontmatter,
  scope,
  children,
}: MDXPageData<H> & { children: ReactNode }) {
  return (
    <MDXPageContext.Provider value={{ frontmatter, scope }}>
      {children}
    </MDXPageContext.Provider>
  );
}

export function useMDXPageData<H extends string>() {
  const ctx = useContext(MDXPageContext);
  if (!ctx) throw new Error("Page hooks must be used within PageProvider");
  return ctx as MDXPageData<H>;
}

export const useMDXFrontmatter = () => useMDXPageData().frontmatter;
export const useMDXScope = <H extends string = string>() =>
  useMDXPageData<H>().scope;
