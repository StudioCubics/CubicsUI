import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ComponentProps, ElementType, ReactNode } from "react";
import type { PageHeaderProps } from "../../Typography/PageHeader/PageHeader.types";

export interface PageLayoutBaseProps
  extends Omit<PageHeaderProps, "slotProps"> {
  children: ReactNode;
  titleBar?: ReactNode;
  footer?: ReactNode;
  slotProps?: PageHeaderProps & {
    root?: ComponentProps<"main">;
    body?: ComponentProps<"div">;
    footer?: ComponentProps<"div">;
    titleBar?: ComponentProps<"div">;
  };
}
type DefaultElement = "div";

export type PageLayoutProps<C extends ElementType = DefaultElement> =
  PolymorphicComponentProps<C, PageLayoutBaseProps>;
