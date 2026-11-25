"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import type { ElementType } from "react";
import styles from "./ClampedText.module.css";
import type {
  ClampedTextBaseProps,
  ClampedTextProps,
} from "./ClampedText.types";

function ClampedTextBase<C extends ElementType = "p">(
  props: ClampedTextProps<C>,
) {
  const { as, className, lineCount = 1, style, ...restProps } = props;
  const Component = as || "p";

  const componentProps = {
    className: cn(className, styles.root),
    style: { WebkitLineClamp: `${lineCount}`, ...style },
    ...restProps,
  };

  return <Component {...componentProps} />;
}
ClampedTextBase.displayName = "ClampedText";

export const ClampedText = ClampedTextBase as PolymorphicComponentType<
  ClampedTextBaseProps,
  "p"
>;
