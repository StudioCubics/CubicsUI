import type { ComponentProps, ReactNode, ElementType } from "react";
import type { TableOfContentsProps } from "../../Display/TableOfContents/TableOfContents.types";
import type {
  SidebarBodyProps,
  SidebarHeaderProps,
  SidebarLayoutProps,
  SidebarProps,
  SidebarViewportProps,
} from "../SidebarLayout/SidebarLayout.types";
import type { PageHeaderProps } from "../../Typography/PageHeader/PageHeader.types";

export interface PageLayoutTOCProps
  extends
    Omit<SidebarLayoutProps, "slotProps">,
    Pick<PageHeaderProps, "title" | "desc" | "actions"> {
  /** The main content that will be shown through the viewports */
  children: ReactNode;
  className?: string;
  /** The table of contents flat tree */
  tree: TableOfContentsProps["tree"];
  /** @default "a" */
  LinkComponent?: ElementType;
  /** The props for the slots */
  slotProps?: SidebarLayoutProps["slotProps"] & {
    /** The PageTitle components props that are not merged with PageLayoutTOCProps */
    title?: Omit<PageHeaderProps, "title" | "desc" | "actions">;
    /** The main Table of contents */
    tableOfContents?: TableOfContentsProps;

    sidebar?: SidebarProps;
    sidebarHeader?: SidebarHeaderProps;
    sidebarBody?: SidebarBodyProps;
    sidebarViewport?: SidebarViewportProps;

    body?: ComponentProps<"div">;
  };
}
