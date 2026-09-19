import type { ComponentProps } from "react";

export interface CardContentProps extends ComponentProps<"div"> {
  /**Overflows card's padding with negative margin */
  overflowMargin?: boolean;
}
