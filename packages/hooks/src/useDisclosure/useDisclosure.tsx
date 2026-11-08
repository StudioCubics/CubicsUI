"use client";

import { useState } from "react";

export interface UseDisclosureReturn {
  open: boolean;
  handleToggle: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleStrictClose: (
    _: unknown,
    reason: "backdropClick" | "escapeKeyDown",
  ) => void;
}

export function useDisclosure(
  initialState: boolean = false,
): UseDisclosureReturn {
  const [open, setOpen] = useState(initialState);

  function handleOpen(): void {
    setOpen(true);
  }
  function handleClose(): void {
    setOpen(false);
  }

  /**
   * Hijacking the handleClose function to prevent the dialog from closing when the user clicks outside the dialog or presses the escape key.
   * @param _ event not going to be used.
   * @param reason The reason the dialog was closed.
   */
  function handleStrictClose(
    _: unknown,
    reason: "backdropClick" | "escapeKeyDown",
  ): void {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    handleClose();
  }

  function handleToggle(): void {
    setOpen((prev) => !prev);
  }

  return {
    open,
    handleToggle,
    handleOpen,
    handleClose,
    handleStrictClose,
  };
}
