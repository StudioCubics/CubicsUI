import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ComponentProps, ElementType, MouseEvent, ReactNode } from "react";

export interface ChipBaseProps {
  /** Visual style variant.
   * @default "contained"
   */
  variant?: "contained" | "outlined";

  /** Color theme of the chip */
  color?: "primary" | "secondary" | "tertiary" | "error" | "warn" | "success";

  /** Size of the chip
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /** Renders a close button which fires the onClose function */
  onClose?: (e: MouseEvent) => void;

  icon?: ReactNode;

  slotProps?: {
    closeButton?: ComponentProps<"button">;
  };
}

export type ChipProps<C extends ElementType = "span"> =
  PolymorphicComponentProps<C, ChipBaseProps>;
