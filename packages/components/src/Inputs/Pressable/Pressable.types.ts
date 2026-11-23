import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ComponentProps, ElementType } from "react";
import type { UseRippleProps } from "../../Misc/Ripple/Ripple.types";

export interface PressableBaseProps {
  /** Disables activation and removes the element from the tab order. */
  disabled?: boolean;

  slotProps?: PressableSlotProps;
}
export interface PressableSlotProps {
  ripple?: UseRippleProps;
  content?: ComponentProps<"div">;
}
export type PressableProps<C extends ElementType = "button"> =
  PolymorphicComponentProps<C, PressableBaseProps>;
