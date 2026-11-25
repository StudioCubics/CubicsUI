import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ElementType } from "react";

export type VoidTextProps<C extends ElementType = "p"> =
  PolymorphicComponentProps<C, object>;
