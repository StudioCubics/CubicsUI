import type { ComponentProps, ReactNode } from "react";
type AllowedTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface PageHeaderProps extends Omit<
  ComponentProps<"header">,
  "title"
> {
  /** Anything that can be placed inside a heading tag */
  title?: ReactNode;

  /** The tag of the title
   * @default "h1"
   */
  as?: AllowedTags;

  /** A description for the Page rendered inside a `<p/>`*/
  desc?: ReactNode;

  /** Some sort of action that will be rendered to the top-right of the header in a `<div/>` */
  actions?: ReactNode;

  /** Slotprops of the Page header component
   * ```
   * `root
   *   |title <h3/>
   *   |   |{title}
   *   |desc <p/>
   *   |   |{desc}
   *   |action <div/>
   *   |   |{action}
   * ```
   */
  slotProps?: PageHeaderSlotProps;
}
export interface PageHeaderSlotProps {
  title?: ComponentProps<AllowedTags>;
  action?: ComponentProps<"div">;
  desc?: ComponentProps<"div">;
}
