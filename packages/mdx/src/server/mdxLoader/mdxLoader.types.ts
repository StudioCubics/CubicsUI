import type {
  BreadcrumbItem,
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

export type MDXScope<H extends string = string> = {
  readingTime?: string;
  toc?: TocItem[];
  breadcrumbs: BreadcrumbItem<H>[];
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
  /** If breadcrumbs should be shown for this page or not */
  breadcrumbs: boolean;
};
export interface MDXPageData<H extends string = string> {
  frontmatter: MDXFrontmatter;
  scope: MDXScope<H>;
}
export interface MDXPageTreeProviderProps<T extends ListDefaultHrefType> {
  tree: ListItemProps<T>[];
  children: ReactNode;
}

/** Shape a folder's `meta.tsx` must default-export */
export interface MDXPageTreeMeta {
  /** Ids (file/folder names) in display order for this folder.
   * Any id not present here is excluded from the tree. */
  order: string[];
  /** Extra props merged into a specific item, keyed by its id */
  pages?: Record<string, Partial<Omit<ListItemProps, "type" | "children">>>;
}

export interface MDXLoaderProps {
  /**
   * Path to the content root, relative to `process.cwd()`
   * Used only to walk the filesystem at init time and
   * compute page slugs
   * @example "content/docs"
   */
  contentRoot: string;
  /**
   * Optional URL prefix the content is served under, used for hrefs
   * @example "/docs"
   */
  basePath?: string;
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
  readMeta: (relFolderPath: string) => Promise<MDXPageTreeMeta>;
  /**
   * Optional embedding function. When provided, the index also contains
   * vectors (enables `vector` / `hybrid` search). Omit for full-text only.
   * Must return one vector per input text, same dimensions as `searchSchema`.
   */
  embed?: (texts: string[]) => Promise<number[][]>;
  /** Extend the default remarkPlugins */
  remarkPlugins?: MDXRemarkPlugins;
  /** Extend the default rehypePlugins */
  rehypePlugins?: MDXRehypePlugins;
  /** Any components that need to overide the default components like `{ a: Link }` for using `next/link` instead of anchor tag */
  components?: MDXComponents;
  /**
   * Disables the `remarkNoScripts` safety check, allowing executable JavaScript in MDX content.
   *
   * By default, MDX containing `import`/`export`, `{expressions}` or attribute expressions
   * (`onClick={...}`, `{...props}`) throws, because MDX is compiled and executed on the server.
   *
   * Only enable this when every MDX file comes from a trusted source (e.g. your own repository).
   * Never enable it for content written by users, a CMS or any source you don't control,
   * as it allows arbitrary code execution on your server.
   *
   * @default false
   */
  unsafeAllowScripts?: boolean;
}

/** Shared state passed to every loader factory */
export type MDXLoaderContext = MDXLoaderProps &
  Required<Pick<MDXLoaderProps, "components" | "basePath">> & {
    /** Slugs computed once, at loader init time */
    pageSlugs: string[];
    /** The page tree in TrieNode */
    pageTrie: TrieNode;
  };
