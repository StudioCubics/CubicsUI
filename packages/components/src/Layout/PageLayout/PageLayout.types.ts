import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ComponentProps, ElementType, ReactNode } from "react";
import type { PageHeaderProps } from "../../Typography/PageHeader/PageHeader.types";
import type { PageBodyProps } from "../PageBody/PageBody.types";

export type PageLayoutBaseProps = {
  /** The element to use for the title */
  titleAs?: PageHeaderProps["as"];
  /** A titleBar slot below the header */
  titleBar?: ReactNode;
  /** A footer slot to add a footer */
  footer?: ReactNode;
  /** Button size.
   * @default "md"*/
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Disables contentFlow class for both header and body */
  disableContentFlow?: boolean;
  /** Disables contentFlow class for header */
  disableHeaderContentFlow?: boolean;
  /** Disables contentFlow class for body */
  disableBodyContentFlow?: boolean;
  /** Disables block padding of body */
  disableBodyPadding?: boolean;
  /** Doesnt wrap children with body, can be used when the children are layout elements that themselves accept children. */
  disableBodyWrapper?: boolean;
  /** Slot between the top of the layout and header */
  beforeHeader?: ReactNode;
  /** Slot between header and titleBar */
  afterHeader?: ReactNode;

  children: ReactNode;

  slotProps?: {
    header?: PageHeaderProps;
    headerWrapper?: ComponentProps<"div">;
    body?: PageBodyProps;
    footer?: ComponentProps<"div">;
    titleBar?: ComponentProps<"div">;
  };
} & Pick<PageHeaderProps, "title" | "desc" | "actions">;

export type PageLayoutProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, PageLayoutBaseProps>;
