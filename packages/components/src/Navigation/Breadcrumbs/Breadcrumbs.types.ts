import type { PolymorphicComponentProps } from "@cubicsui/types";
import type {
  ComponentProps,
  ElementType,
  ReactElement,
  ReactNode,
} from "react";

export type BreadcrumbsItemProps<C extends ElementType = "span"> =
  PolymorphicComponentProps<C, object>;

export interface BreadcrumbsProps
  extends Omit<ComponentProps<"div">, "children" | "onChange"> {
  children: BreadcrumbCrumbType[];
  /** For controlled Breadcrumbs pass the onChange function */
  onChange?: (pageNumber: number) => void;
  /** How many siblings of the active item should be shown
   * @default 1 */
  siblingCount?: number;
  /** How many of the boundary items should be shown
   * @default 0 */
  boundaryCount?: number;
  /** Crumb that will be selected by default
   * @default 1*/
  defaultSelected?: number;
  /** Node to use as separator */
  separator?: ReactNode;
  /** Node to use as ellipsis */
  ellipsis?: ReactNode;
  /** Function that can be used to modify the rendered BreadcrumbsItem component */
  renderItem?: (props: Omit<BreadcrumbsItemProps, "as">) => ReactElement;
  /** If the selected state has to be set from the List instead of individually on every ListItem */
  selectedWhen?: (props: BreadcrumbCrumbType["props"]) => boolean;
  /** Size of the spacing and text */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Color theme of the breadcrumb */
  color?: "primary" | "secondary" | "tertiary" | "error" | "warn" | "success";
}
export type BreadcrumbCrumbType = ReactElement<{
  [key: string]: unknown;
  id: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}>;
export interface BreadcrumbsRangeCrumb {
  type: "crumb";
  crumb: BreadcrumbCrumbType;
  /** Index in the original crumbs array */
  index: number;
}
export interface BreadcrumbsRangeEllipsis {
  type: "ellipsis";
  key: string;
  /** Index of the first hidden crumb, used to expand this gap */
  from: number;
}
export type BreadcrumbsRangeItem =
  | BreadcrumbsRangeCrumb
  | BreadcrumbsRangeEllipsis;

export interface UseBreadcrumbsReturn {
  items: BreadcrumbsRangeItem[];
  activeCrumb: number;
  handleClick: (index: number) => void;
  /** Reveals the hidden crumbs of the gap starting at `from` */
  expand: (from: number) => void;
}
export interface UseBreadcrumbsProps {
  crumbs: BreadcrumbCrumbType[];
  defaultSelected?: number;
  selectedWhen?: (props: BreadcrumbCrumbType["props"]) => boolean;
  onChange?: (pageNumber: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
}
