import type { ElementType, RefObject } from "react";

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
