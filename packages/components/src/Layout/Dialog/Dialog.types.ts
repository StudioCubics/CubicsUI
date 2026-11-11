import type { ComponentProps } from "react";

export type DialogCloseReason = "backdropClick" | "escapeKeyDown";

type OmittedProps = "onClose" | "onCancel";

export interface DialogProps extends Omit<
  ComponentProps<"dialog">,
  OmittedProps
> {
  /** Controls the open state assign open from useDisclosure here */
  open?: boolean;
  /** Runs when dialog is closed */
  onClose?: (event: Event | MouseEvent, reason: DialogCloseReason) => void;
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
}
