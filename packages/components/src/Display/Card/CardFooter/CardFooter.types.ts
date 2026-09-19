import type { ComponentProps } from "react";

export interface CardFooterProps extends ComponentProps<"div"> {
  /**Overflows card's padding with negative margin */
  overflowMargin?: boolean;
}
