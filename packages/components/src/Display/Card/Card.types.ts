import type { CssLength, PolymorphicComponentProps } from "@cubicsui/types";
import type { ElementType } from "react";

export type CardProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, CardBaseProps>;
/**
 * Props specific to the Card component.
 *
 * These extend the intrinsic element props of whatever element is passed via `as`.
 */
export interface CardBaseProps {
  /** Visual style variant.
   * @default "contained"
   */
  variant?: "contained" | "outlined";

  /** Expands width to 100%. */
  fullWidth?: boolean;

  /** Expands height to 100%. */
  fullHeight?: boolean;

  /** Expands card to fill screen */
  fullScreen?: boolean;

  /** Force a 1:1 aspect ratio. */
  square?: boolean;

  /** How elevated the card should look, use when using a card on top of a card */
  elevation?: "high" | "highest";

  /** These define the amount of padding around the card
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** Color theme of the card. */
  color?: "primary" | "secondary" | "tertiary" | "error" | "warn" | "success";

  /** Use this if no padding should be set around the card */
  disablePadding?: boolean;

  /** Use this to remove background when using with GlassCard */
  removeBg?: boolean;

  /** The width will be of fixed length */
  fixedWidth?: CssLength | boolean;

  /** The height will be of fixed length */
  fixedHeight?: CssLength | boolean;
}
