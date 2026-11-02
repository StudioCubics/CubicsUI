import type { SetState } from "@cubicsui/types";
import type { KeyboardEvent, ReactNode, RefObject, ToggleEvent } from "react";

export interface RolodexItem {
  id: string;
  node: ReactNode;
}
export interface RolodexProps {
  items: RolodexItem[];
  defaultValue?: string;
  value?: string;
  /** Items shown on each side of the active item when opened. */
  itemsPerSide?: number;
  /** Space between items, and between the buttons and the list. Numbers are px. */
  gap?: number;
  /** A synthetic ChangeEvent can't be built from a wheel or click, so only the value is passed. */
  onChange?: (value: string) => void;
  /** Any function that needs to be triggered once the selection is done */
  onClose?: (value: string) => void;
  /** The number of steps needed for a scroll to change the activeItem */
  wheelStep?: number;
  /** Shows nav buttons to step 1 or -1 in the items list */
  showButtons?: boolean;
  /** amount of blur on each item */
  blurMultiplier?: number;
}
export interface UseRolodexContextReturn extends RolodexContextProps {
  triggerRef: RefObject<HTMLButtonElement | null>;
  popoverRef: RefObject<HTMLDivElement | null>;
  itemRefs: RefObject<(HTMLDivElement | null)[]>;
  activeIndex: number;
  visible: number;
  half: number;
  openPopover: () => void;
  shift: (by: number) => void;
  distance: (from: number, d: number) => number;
  heightAt: (i: number) => number;
  offsetOf: (i: number) => number;
  onPopoverKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  onPopoverToggle: (e: ToggleEvent<HTMLDivElement>) => void;
}

export interface RolodexContextProps {
  /** The popover is open or not */
  open: boolean;
  /** Change the popover open state */
  setOpen: SetState<boolean>;
  /** Contains the active items node and id */
  activeItem: RolodexItem;
}
