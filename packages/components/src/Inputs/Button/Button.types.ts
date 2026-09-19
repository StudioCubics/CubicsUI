import type { ComponentProps, ElementType, ReactNode } from "react";
import type { UseRippleProps } from "../../Misc/Ripple/Ripple.types";
import type { PolymorphicComponentProps } from "@cubicsui/types";

/** Props specific to the Button component. */
export interface ButtonBaseProps {
  /** Renders an icon at the beginning of the button. */
  startIcon?: ReactNode;

  /** Justifies the content of the button
   * @default "center"
   */
  align?: "left" | "center" | "right";
  /** Renders an icon at the end of the button. */
  endIcon?: ReactNode;

  /** Marks the button as selected. */
  selected?: boolean;

  /**
   * Visual style variant.
   * @default "text"
   */
  variant?: "contained" | "outlined";

  /**
   * Expands width to 100%.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * When button is supposed to be an icon button, make sure to pass a square icon to not mess up the button's size
   * @default false
   */
  icon?: boolean;

  /**
   * Button size.
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Adds disabled styles to the button. Added this to make `<Link/>` have disabled style in Next.js.
   * @default false
   */
  disabled?: boolean;

  /** Color theme of the button. */
  color?: "primary" | "secondary" | "tertiary" | "error" | "warn" | "success";

  /**
   * Slot props for customizing internal elements.
   * @link ButtonSlotProps
   */
  slotProps?: ButtonSlotProps;
}

export type ButtonProps<C extends ElementType = "button"> =
  PolymorphicComponentProps<C, ButtonBaseProps>;

/** The slot props for the button */
export interface ButtonSlotProps {
  /**
   * Props for the useRipple component
   * @link UseRippleProps
   */
  ripple?: UseRippleProps;

  /** Wrapper span for the start icon. */
  startIcon?: ComponentProps<"span">;

  /** Wrapper span for the end icon. */
  endIcon?: ComponentProps<"span">;
}
