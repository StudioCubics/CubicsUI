import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ComponentProps, ElementType, ReactNode } from "react";

export interface VoidTextBaseProps {
  /** You can pass an image to represent the empty void */
  image?: ReactNode;
  /** The title of the void @default "Nothing found!" */
  title?: string;
  /** The subtitle of the void */
  subtitle?: string;

  slotProps?: {
    image?: ComponentProps<"span">;
    title?: ComponentProps<"p">;
    subtitle?: ComponentProps<"p">;
  };

  children?: never;
}
export type VoidTextProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, VoidTextBaseProps>;
