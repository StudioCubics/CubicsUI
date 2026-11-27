import { useDisclosure } from "@cubicsui/hooks";
import { onShortcut } from "@cubicsui/utils";
import { useEffect } from "react";
import type {
  SearchCenterProps,
  UseSearchCenterReturn,
} from "./SearchCenter.types";

export function useSearchCenter<T extends object = object>(
  props: SearchCenterProps<T>,
): UseSearchCenterReturn {
  const { onDialogOpen, onDialogClose, shortcutKey } = props;
  const { open, handleClose, handleOpen } = useDisclosure();

  function handleDialogOpen() {
    if (open) return;
    handleOpen();
    onDialogOpen?.();
  }
  function handleDialogClose() {
    if (!open) return;
    handleClose();
    onDialogClose?.();
  }

  // Global Ctrl/Cmd+K shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!shortcutKey) return;
      onShortcut(e, shortcutKey, handleDialogOpen, {
        preventDefault: true,
      });
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return { open, handleDialogOpen, handleDialogClose };
}
