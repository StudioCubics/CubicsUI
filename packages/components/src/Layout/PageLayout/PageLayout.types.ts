import type { PersistScrollPositionWithId } from "@cubicsui/hooks";
import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ComponentProps, ElementType, ReactNode } from "react";
import type { PageHeaderProps } from "../../Typography/PageHeader/PageHeader.types";
import type { PageBodyProps } from "../PageBody/PageBody.types";

export type PageLayoutBaseProps = PersistScrollPositionWithId &
  Pick<PageHeaderProps, "title" | "desc" | "actions"> & {
    /** The element to use for the title */
    titleAs?: PageHeaderProps["as"];
    /** A titleBar slot below the header */
    titleBar?: ReactNode;
    /** A footer slot to add a footer */
    footer?: ReactNode;
    /** Button size.
     * @default "md"*/
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /** Collapses the header when scrolling down.
     * @default false*/
    collapseHeaderOnScroll?: boolean;
    /** Disables using ContentFlow for both header and body */
    disableContentFlow?: boolean;
    /** Disables using ContentFlow for header */
    disableHeaderContentFlow?: boolean;
    /** Disables using ContentFlow for body */
    disableBodyContentFlow?: boolean;
    /** Disables using ContentFlow for footer */
    disableFooterContentFlow?: boolean;
    /** Disables block padding of body */
    disableBodyPadding?: boolean;
    /** Doesnt wrap children with body, can be used when the children are layout elements that themselves accept children. */
    disableBodyWrapper?: boolean;
    /** Slot between the top of the layout and header */
    beforeHeader?: ReactNode;
    /** Slot between header and titleBar */
    afterHeader?: ReactNode;

    children: ReactNode;

    slotProps?: PageLayoutSlotProps;
  };

export interface PageLayoutSlotProps {
  /** The PageHeader component used to render the title actions and desc */
  header?: PageHeaderProps;
  /** A wrapper that is either a div or ContentFlow based on disableContentFlow and disableHeaderContentFlow */
  headerWrapper?: ComponentProps<"div">;
  /** The props for the PageBody, if disableBodyWrapper is true then this does nothing */
  body?: PageBodyProps;
  /** A wrapper that is either a div or ContentFlow based on disableContentFlow and disableFooterContentFlow */
  footer?: ComponentProps<"div">;
  /** Props for the titleBar which is basically a div with overflow auto and display flex */
  titleBar?: ComponentProps<"div">;
}

export type PageLayoutProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, PageLayoutBaseProps>;
