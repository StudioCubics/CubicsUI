import type { ElementType } from "react";
import type { TableOfContentsProps } from "../../Navigation/TableOfContents/TableOfContents.types";
import type { PageBodyProps } from "../PageBody/PageBody.types";
import type {
  PageLayoutProps,
  PageLayoutSlotProps,
} from "../PageLayout/PageLayout.types";
import type {
  SidebarBodyProps,
  SidebarHeaderProps,
  SidebarLayoutProps,
  SidebarProps,
  SidebarViewportProps,
} from "../SidebarLayout/SidebarLayout.types";

export interface PageLayoutTOCProps extends Omit<
  PageLayoutProps,
  "slotProps" | "disableBodyWrapper"
> {
  /** The table of contents flat tree */
  tree?: TableOfContentsProps["tree"];
  /** @default "a" */
  LinkComponent?: ElementType;
  /** Removes contentFlow from the sidebar viewport */
  disableViewportContentFlow?: boolean;

  slotProps?: Omit<PageLayoutSlotProps, "body"> & {
    /** The main Table of contents */
    tableOfContents?: TableOfContentsProps;
    /** The layout for creating sidebar  */
    sidebarLayout?: SidebarLayoutProps;
    /** The sidebar `<aside/>` */
    sidebar?: SidebarProps;
    /** The sidebar's header in a `<div/>` */
    sidebarHeader?: SidebarHeaderProps;
    /** The sidebar's body in a `<div/>` */
    sidebarBody?: SidebarBodyProps;
    /** The main area where the children will be shown */
    sidebarViewport?: SidebarViewportProps & PageBodyProps;
  };
}
