import type {
  AnchorLike,
  PolymorphicComponentProps,
  PositionString,
} from "@cubicsui/types";
import type { Position, SafePositionOptions } from "@cubicsui/utils";
import type { ElementType, RefObject } from "react";

export interface UsePopoverReturn {
  popoverRef: RefObject<HTMLDivElement | null>;
  uncontrolled: boolean;
  position?: Position;
  width?: number;
  mounted: boolean;
}

export type PopoverBaseProps = PopoverHybridProps &
  SafePositionOptions & {
    /** Runs when popover closes */
    onClose?: () => void;
    /** Origin of where the popover should animate out from
     * @default "top center" */
    transformOrigin?: PositionString;
    /** Makes the popover be the width of the anchor instead of getting its width set by the content */
    anchorWidth?: boolean;
    /** Doesnt use a portal to render but renders in place instead */
    disablePortal?: boolean;
    /** Removes the node from the dom when `open={false}` */
    unmountOnExit?: boolean;
  };

export type PopoverControlledProps = {
  /** Controls the open state, required for `unmountOnExit` to work, you can pass `open` from `useAnchorElement` here */
  open: boolean;
  /** The element or virtual anchor the popover is positioned against */
  anchorEl: AnchorLike | null;
  id?: string;
};
export type PopoverUncontrolledProps = {
  /** Pass the id that was set in the triggers `popoverTarget` attribute */
  id: string;
  open?: never;
  anchorEl?: never;
};

export type PopoverHybridProps =
  | PopoverControlledProps
  | PopoverUncontrolledProps;

export type PopoverProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, PopoverBaseProps>;
