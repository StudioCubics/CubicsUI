import type { ComponentProps, ReactNode } from "react";
export const allowedTags = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

export interface CardHeaderProps {
  /** Anything that can be placed inside a heading tag */
  title?: ReactNode;

  /** The tag of the title
   * @default "h3"
   */
  as?: (typeof allowedTags)[number];

  /** A description for the card rendered inside a `<p/>`*/
  desc?: ReactNode;

  /** Some sort of action that will be rendered to the top-right of the header in a `<div/>` */
  action?: ReactNode;

  /** Slotprops of the card header component
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
  slotProps?: CardHeaderSlotProps;
}
export interface CardHeaderSlotProps {
  root?: ComponentProps<"div">;
  title?: ComponentProps<(typeof allowedTags)[number]>;
  action?: ComponentProps<"div">;
  desc?: ComponentProps<"div">;
}
