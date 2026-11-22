import type { PolymorphicComponentProps, Size2D } from "@cubicsui/types";
import type { ElementType, ReactElement, ReactNode, Ref } from "react";
import type { PopoverProps } from "../../Layout/Popover/Popover.types";

export type TooltipBaseProps = Omit<
  PopoverProps,
  "title" | "open" | "anchorEl"
> & {
  /** The content of the tooltip */
  title?: ReactNode;
  /** Renders an arrow towards the anchor element from the tooltip */
  renderArrow?: boolean;
  /** Width and height of the arrow @default {width:16,height:8} */
  arrowSize?: Size2D;
  /** The tooltip follows the mouse pointer */
  followPointer?: boolean;
  /** Keeps the tooltip clear of the cursor graphic @default 16 */
  pointerGap?: number;
  /** Points the arrow to the center of the anchor */
  pointToCenterOfAnchor?: boolean;

  children: ReactElement<{
    ref?: Ref<HTMLElement | null>;
    [key: string]: unknown;
  }>;
};
export type TooltipProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, TooltipBaseProps>;
