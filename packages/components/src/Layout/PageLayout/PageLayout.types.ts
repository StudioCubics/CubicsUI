import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ComponentProps, ElementType, ReactNode } from "react";
import type { PageHeaderProps } from "../../Typography/PageHeader/PageHeader.types";

export interface PageLayoutBaseProps
  extends Omit<PageHeaderProps, "slotProps" | "as"> {
  titleAs?: PageHeaderProps["as"];
  children: ReactNode;
  titleBar?: ReactNode;
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

  /** Slot between the top of the layout and header */
  beforeHeader?: ReactNode;
  /** Slot between header and titleBar */
  afterHeader?: ReactNode;

  slotProps?: PageHeaderProps["slotProps"] & {
    root?: ComponentProps<"main">;
    header?: ComponentProps<"div">;
    body?: ComponentProps<"div">;
    footer?: ComponentProps<"div">;
    titleBar?: ComponentProps<"div">;
  };
}
type DefaultElement = "div";

export type PageLayoutProps<C extends ElementType = DefaultElement> =
  PolymorphicComponentProps<C, PageLayoutBaseProps>;
