import type { ComponentProps, ReactNode } from "react";

export interface LabeledValueProps extends ComponentProps<"div"> {
  /** The label for the value */
  label: ReactNode;
  /** The font size and spacing of the elements inside root */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Color theme of the label. */
  color?: "primary" | "secondary" | "tertiary" | "error" | "warn" | "success";
  /** Custom divider seperating the two defaults to a line */
  divider?: ReactNode;
  /** Removes the divider */
  removeDivider?: boolean;
  /** Will prioritise the width of the content more than the label  */
  disableLabelWidth?: boolean;
  /** Will try to keep the width of both content and label 50/50 */
  enableEvenWidth?: boolean;
  /** If set to true then clamps one line with ellipses in the end orelse clamps to the amount of lines set  */
  clampLabel?: true | Omit<number, 1 | 0>;
  /** Scrolls over label that is overflow hidden and and clamped  */
  scrollOverflowLabel?: boolean;

  slotProps?: {
    label?: ComponentProps<"span">;
    content?: ComponentProps<"span">;
  };
}
