"use client";

import { useMounted } from "@cubicsui/hooks";
import { cn } from "@cubicsui/utils";
import { type ReactElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Dialog.module.css";
import type { DialogProps } from "./Dialog.types";

export function Dialog(props: DialogProps): ReactElement | null {
  const {
    open,
    onClose,
    children,
    fullWidth,
    fullHeight,
    fullScreen,
    overrideUAStyles,
    disablePortal,
    modal,
    unmountOnExit,
    preventBackdropClick,
    className,
    ...rest
  } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { mounted } = useMounted();
  // uncontrolled: commands/native API drive it
  const uncontrolled = open === undefined;

  // Show or close dialog using native API
  useEffect(() => {
    if (!mounted || uncontrolled) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      if (modal) dialog.showModal();
      else dialog.show();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, mounted, modal]);

  // Close handlers
  useEffect(() => {
    if (!mounted) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleCancel(e: Event) {
      // Controlled: parent closes via `open`. Uncontrolled: let the native Escape close happen
      if (!uncontrolled) e.preventDefault();
      onClose?.(e);
    }

    function handleClick(e: MouseEvent) {
      if (!dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!isInDialog && !preventBackdropClick) {
        if (uncontrolled) dialog.close(); // uncontrolled: close natively
        onClose?.(e);
      }
    }

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClick);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClick);
    };
  }, [onClose, mounted, open, preventBackdropClick]);

  const dialogContent = (
    <dialog
      {...rest}
      ref={dialogRef}
      className={cn(
        className,
        styles.root,
        overrideUAStyles && styles.overrideUAStyles,
        fullScreen && styles.fullScreen,
        fullWidth && styles.fullWidth,
        fullHeight && styles.fullHeight,
      )}
    >
      {children}
    </dialog>
  );

  // Controlled + unmountOnExit: the node only exists while open
  const unmounted = unmountOnExit && !open;
  // The portal needs `document`, which isn't available during SSR
  const canRender = disablePortal || mounted;

  if (unmounted || !canRender) return null;

  return disablePortal
    ? dialogContent
    : createPortal(dialogContent, document.body);
}
