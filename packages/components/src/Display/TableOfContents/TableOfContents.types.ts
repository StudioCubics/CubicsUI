import type { ComponentProps, ElementType, RefObject } from "react";
import type { PageHeaderProps } from "../../Typography/PageHeader/PageHeader.types";
import type { CardContentProps, CardProps } from "../Card/Card.types";

export interface TocItem {
  value: string;
  href: string;
  depth: number;
  numbering: number[];
  parent: string;
}
export type TableOfContentsTree = TocItem[];
export interface TableOfContentsProps {
  /** The tree data in a flat array */
  tree?: TableOfContentsTree;
  /** Title of the table of contents
   * @default "Table of Contents"
   */
  title?: string;
  /** The ref of the container containing the headings */
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** @default "ol" */
  ListComponent?: ElementType;
  /** @default "a" */
  LinkComponent?: ElementType;

  withNumbering?: boolean;
  slotProps?: {
    root?: CardProps;
    title?: PageHeaderProps;
    content?: CardContentProps;
    list?: ComponentProps<"ol"> | ComponentProps<"ul">;
    listItem?: ComponentProps<"li">;
    link?: ComponentProps<"a">;
  };
}

export interface UseTableOfContentsMarkerReturn {
  path: string;
  shadowPath: string;
  viewBox: { h: number; w: number };
  listRef: RefObject<HTMLOListElement | null>;
  navRef: RefObject<HTMLElement | null>;
  activeIds: Set<string>;
  markerRect: DOMRect | null;
}
export interface UseTableOfContentsOptions {
  /** Heading selector inside the container
   * @default "h1, h2, h3, h4, h5, h6"
   */
  selector?: string;
}

export interface UseTableOfContentsReturn<T extends HTMLElement> {
  /** Attach to the container holding the headings */
  ref: RefObject<T | null>;
  /** Flat tree to pass to <TableOfContents tree={...} /> */
  tree: TableOfContentsTree;
}
