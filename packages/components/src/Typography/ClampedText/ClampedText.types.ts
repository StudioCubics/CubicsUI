import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ElementType } from "react";

export interface ClampedTextBaseProps {
  lineCount?: number;
}

export type ClampedTextProps<C extends ElementType = "p"> =
  PolymorphicComponentProps<C, ClampedTextBaseProps>;
