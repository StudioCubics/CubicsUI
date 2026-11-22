import type {
  PolymorphicComponentProps,
  PositionString,
} from "@cubicsui/types";
import type { SafePositionOptions } from "@cubicsui/utils";
import type { ElementType } from "react";

export type PopoverBaseProps<T extends HTMLElement = HTMLElement> =
  PopoverHybridProps<T> &
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

export type PopoverControlledProps<T extends HTMLElement> = {
  /** Controls the open state, required for `unmountOnExit` to work, you can pass `open` from `useAnchorElement` here */
  open: boolean;
  /** When the open state is controlled, the ref of the anchor has to be passed, you can pass `anchorEl` from `useAnchorElement` here  */
  anchorEl: T | null;
  id?: string;
};
export type PopoverUncontrolledProps = {
  /** Pass the id that was set in the triggers `popoverTarget` attribute */
  id: string;
  open?: never;
  anchorEl?: never;
};

export type PopoverHybridProps<T extends HTMLElement> =
  | PopoverControlledProps<T>
  | PopoverUncontrolledProps;

export type PopoverProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, PopoverBaseProps>;
