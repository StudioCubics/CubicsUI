"use client";

import { useCallback, useState } from "react";

export interface UseDisclosureReturn {
  /** The state controlling if something is open or not */
  open: boolean;
  /** Toggles the open state */
  handleToggle: () => void;
  /** Sets open state to `true` */
  handleOpen: () => void;
  /** Sets open state to `false` */
  handleClose: () => void;
}

/**
 * Manages the open/closed state of things like dialogs, popovers and menus.
 * Spread or pass the returned `open` and handlers to the controlled component.
 *
 * ```tsx
 * const { open, handleToggle, handleClose } = useDisclosure();
 *
 * <Button onClick={handleToggle}>Toggle</Button>
 * <Dialog open={open} onClose={handleClose}>...</Dialog>
 * ```
 *
 * @param initialState Whether it starts open.
 * @default false
 */
export function useDisclosure(
  initialState: boolean = false,
): UseDisclosureReturn {
  const [open, setOpen] = useState(initialState);

  const handleOpen = useCallback((): void => {
    setOpen(true);
  }, []);
  const handleClose = useCallback((): void => {
    setOpen(false);
  }, []);
  const handleToggle = useCallback((): void => {
    setOpen((prev) => !prev);
  }, []);

  return {
    open,
    handleToggle,
    handleOpen,
    handleClose,
  };
}