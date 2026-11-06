import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ElementType } from "react";

export type ContentFlowBaseProps = {
  /** Applies the size tokens on this element. When omitted, tokens are inherited from the nearest ancestor that defines them (e.g. PageLayout). */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export type ContentFlowProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, ContentFlowBaseProps>;
