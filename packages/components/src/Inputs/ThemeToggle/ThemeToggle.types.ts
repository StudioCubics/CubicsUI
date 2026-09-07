import type { ComponentProps, MouseEvent, ReactNode } from "react";
import type { ButtonProps } from "../Button/Button.types";
import type { PopoverProps } from "../../Layout/Popover/Popover.types";
import type { CardProps } from "../../Display/Card/Card.types";
import type { Theme } from "../../Providers/ThemeProvider/ThemeProvider.types";
export interface ThemeObjectValue {
  text?: string;
  icon?: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}
export type ThemeObject = Record<Theme, ThemeObjectValue>;

export interface ThemeToggleProps {
  /** Variant of the ThemeToggle
   * @default "icon"
   */
  variant?: "icon" | "full" | "list";
  /** Modify the themeObject to pass custom theme icons and names.
   * When using `<ThemeToggle/>` without a `<ThemeProvider/>`,
   * you must supply `onClick` for each theme here*/
  themeObject?: Partial<ThemeObject>;
  /** Controls the toggle's displayed theme. Passing this puts the
   * component in controlled mode: it stops calling the internal
   * ThemeProvider's setTheme entirely and relies solely on the
   * `onClick` handlers you provide via `themeObject`, so it can be
   * used standalone without wrapping in a `<ThemeProvider/>`. */
  currentTheme?: Theme;
  /** Will skip light when system preference is light and same for dark.
   * Only applies when `<ThemeToggle/>` is inside `<ThemeProvider/>` mode.
   * @default false
   */
  resolveSystem?: boolean;

  // TODO add List and ListItem props and make ThemeToggleSlotProps
  slotProps?: {
    button?: ButtonProps;
    popover?: PopoverProps;
    card?: CardProps;
    list?: ComponentProps<"ul">;
    listItem?: ComponentProps<"li">;
  };
}
