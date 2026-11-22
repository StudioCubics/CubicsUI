import type { ComponentProps } from "react";

type OmittedProps = "onClose" | "onCancel";

export interface DialogBaseProps extends Omit<
  ComponentProps<"dialog">,
  OmittedProps
> {
  /** Runs when dialog is closed */
  onClose?: (event: Event | MouseEvent) => void;
  /** Makes the dialog be the width of the viewport */
  fullWidth?: boolean;
  /** Makes the dialog be the height of the viewport */
  fullHeight?: boolean;
  /** Makes the dialog be the size of the viewport */
  fullScreen?: boolean;
  /** Doesnt use a portal to render but renders in place instead */
  disablePortal?: boolean;
  /** Uses the showModal instead of just show, dialogs can be `modal` (blocking) or `modal={false}` (non-blocking) */
  modal?: boolean;
  /** Removes the node from the dom when `open={false}` */
  unmountOnExit?: boolean;
  /** Overrides the UA styles of the browser for a dialog */
  overrideUAStyles?: boolean;
  /** Prevents closing when backdrop is clicked */
  preventBackdropClick?: boolean;
}

export type DialogControlledProps = {
  /** Controls the open state, you can pass open from `useDislosure` here */
  open: boolean;
  id?: string;
};

/** When the dialog is uncontrolled it can only be a modal as there is no command="show" but only command="show-modal" */
export type DialogUncontrolledProps = {
  /** Pass the id that was set in the triggers `commandfor` attribute */
  id: string;
  open?: never;
};

export type DialogHybridProps = DialogControlledProps | DialogUncontrolledProps;

export type DialogProps = DialogBaseProps & DialogHybridProps;
