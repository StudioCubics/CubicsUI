import type {
  ComponentProps,
  ElementType,
  ReactElement,
  ReactNode,
} from "react";
import type { ListItemTypeItemProps } from "../List/List.types";

export type SearchHitProps<H extends string = string> = Omit<
  ListItemTypeItemProps<H>,
  "slotProps"
> & {
  /** Required id */
  id: string;
  /** Required href  */
  href: string;
  /** The text on top of subtitle */
  title?: string;
  /** Image in a rounded square on the left */
  img?: string;
  /** Secondary text under the title */
  subtitle?: string;
  /** Node under the subtitle */
  desc?: ReactNode;
  /** Image component used for img elements */
  ImgComponent?: ElementType;

  slotProps?: ListItemTypeItemProps<H>["slotProps"] & {
    img?: ComponentProps<"img">;
    title?: ComponentProps<"h5">;
    subtitle?: ComponentProps<"p">;
    desc?: ComponentProps<"div">;
  };
};

export type SearchHitExpandableProps<
  T extends object = object,
  H extends string = string,
> = Pick<SearchHitProps<H>, "ImgComponent" | "LinkComponent"> & {
  /** When the search hit is navigated with arrows active highlights the current index */
  active?: boolean;
  /** Method to render the results, can either pass {@link SearchHitProps} object or a whole ReactElement */
  renderHit?: (
    hit: NoInfer<T>,
    expanded?: boolean,
  ) => SearchHitProps<H> | ReactElement;
  hit: T;

  /** Adds a button to toggle expanded state of the hit, works only when renderHit returns a {@link SearchHitExpandableProps} */
  expandableHits?: boolean;
};
