import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ElementType } from "react";

export interface ResizeHandleBaseProps {
  /** Color of the handle */
  color?: "primary" | "secondary" | "tertiary" | "error";
  /** Size of the handle */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export type ResizeHandleProps<C extends ElementType = "span"> =
  PolymorphicComponentProps<C, ResizeHandleBaseProps>;
