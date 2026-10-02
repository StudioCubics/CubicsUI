import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ReactNode, ComponentProps, ElementType } from "react";
import type { PageHeaderProps } from "../../Typography/PageHeader/PageHeader.types";

export interface PageLayoutBaseProps extends Omit<
  PageHeaderProps,
  "slotProps"
> {
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
const defaultElement = "div";
type DefaultElement = typeof defaultElement;

export type PageLayoutProps<C extends ElementType = DefaultElement> =
  PolymorphicComponentProps<C, PageLayoutBaseProps>;
