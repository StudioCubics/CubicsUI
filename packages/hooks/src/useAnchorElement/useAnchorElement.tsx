"use client";

import type { SetState } from "@cubicsui/types";
import { type MouseEvent, useMemo, useState } from "react";

export interface UseAnchorElementReturn<T extends HTMLElement> {
  open: boolean;
  anchorEl: T | null;
  handleClick: (event: MouseEvent<T>) => void;
  handleClose: () => void;
  setAnchorEl: SetState<T | null>;
}

export function useAnchorElement<
  T extends HTMLElement,
>(): UseAnchorElementReturn<T> {
  const [anchorEl, setAnchorEl] = useState<T | null>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const handleClick = (event: MouseEvent<T>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  return { open, anchorEl, handleClick, handleClose, setAnchorEl };
}
