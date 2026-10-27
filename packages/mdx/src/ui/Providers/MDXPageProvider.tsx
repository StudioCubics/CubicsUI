"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { MDXPageData } from "../../mdxLoader/mdxLoader.types";

const MDXPageContext = createContext<MDXPageData | null>(null);

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
export function MDXPageProvider({
  frontmatter,
  scope,
  children,
}: MDXPageData & { children: ReactNode }) {
  return (
    <MDXPageContext.Provider value={{ frontmatter, scope }}>
      {children}
    </MDXPageContext.Provider>
  );
}

export function useMDXPageData() {
  const ctx = useContext(MDXPageContext);
  if (!ctx) throw new Error("Page hooks must be used within PageProvider");
  return ctx;
}

export const useMDXFrontmatter = () => useMDXPageData().frontmatter;
export const useMDXScope = () => useMDXPageData().scope;
