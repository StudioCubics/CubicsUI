import type {
  ListDefaultHrefType,
  ListItemProps,
  TocItem,
} from "@cubicsui/components";
import type { MDXComponents } from "next-mdx-remote-client";
import type { EvaluateOptions } from "next-mdx-remote-client/rsc";
import type { ReactNode } from "react";

/** Trie node used while grouping flat slugs into a nested tree */
export type TrieNode = { isPage: boolean; children: Map<string, TrieNode> };

export type MDXOptions = NonNullable<EvaluateOptions<MDXScope>["mdxOptions"]>;

export type MDXRemarkPlugins = NonNullable<MDXOptions["remarkPlugins"]>;
export type MDXRehypePlugins = NonNullable<MDXOptions["rehypePlugins"]>;

/** Shared state passed to every loader factory */
export type MDXLoaderContext = Required<
  Pick<MDXLoaderProps, "components" | "contentRoot" | "readSource">
> &
  Pick<MDXLoaderProps, "readMeta"> & {
    remarkPlugins?: MDXRemarkPlugins;
    rehypePlugins?: MDXRehypePlugins;
    /** Slugs computed once, at loader init time */
    pageSlugs: string[];
  };

export type MDXScope = {
  readingTime?: string;
  toc?: TocItem[];
};

export type MDXFrontmatter = {
  /** Title of the page */
  title: string;
  /** Category this component belongs to */
  category?: string;
  /** Use in URL and as identifier as it will be safer than title */
  slug: string;
  /** Belongs to which package version */
  packageVersion?: string;
  /** Description that will be used for this pages metadata */
  description?: string;
  /** If table of content should be shown for this page or not */
  toc?: boolean;
};
export interface MDXPageData {
  frontmatter: MDXFrontmatter;
  scope: MDXScope;
}
export interface MDXPageTreeProviderProps<T extends ListDefaultHrefType> {
  tree: ListItemProps<T>[];
  children: ReactNode;
}

/** Shape a folder's `meta.tsx` must default-export */
export interface MDXMeta {
  /** Ids (file/folder names) in display order for this folder.
   * Any id not present here is excluded from the tree. */
  order: string[];
  /** Extra props merged into a specific item, keyed by its id */
  pages?: Record<string, Partial<Omit<ListItemProps, "type" | "children">>>;
}

export interface MDXLoaderProps {
  remarkPlugins?: MDXRemarkPlugins;
  rehypePlugins?: MDXRehypePlugins;
  /** Any components that need to overide the default components like `{ a: Link }` for using `next/link` instead of anchor tag */
  components?: MDXComponents;
  /**
   * Path to the content root, relative to `process.cwd()`
   * Used only to walk the filesystem at init time and
   * compute page slugs
   * @example "content/docs"
   */
  contentRoot: string;
  /**
   * The function that will be used to read the source of the mdx files, other source reading method is also allowed
   * @param {String} relPath Path to the MDX file, relative to the content root.
   * @example
   * ```ts
   * const mdxSource = loader({
   *   readSource: async (relPath) => {
   *   const mod = await import(`@/content/${relPath}`);
   *   return mod.default as string;
   *  },
   * });
   * ```
   */
  readSource: (relPath: string) => Promise<string>;
  /**
   * Reads a folder's `meta.tsx`, given the folder path relative to the
   * content root (e.g. `"components/inputs"`, or `""` for the root).
   * @example
   * ```ts
   * const mdxSource = loader({
   *   readSource: ...,
   *   readMeta: async (relFolderPath) => {
   *     const mod = await import(`@/content/${relFolderPath}/meta`);
   *     return mod.default;
   *   },
   * });
   * ```
   */
  readMeta?: (relFolderPath: string) => Promise<MDXMeta>;
}
