"use client";

import { useScrollLongText } from "@cubicsui/hooks";
import { cn, mergeRefs } from "@cubicsui/utils";
import type { ReactElement } from "react";
import styles from "./LabeledValue.module.css";
import type { LabeledValueProps } from "./LabeledValue.types";

export function LabeledValue(props: LabeledValueProps): ReactElement {
  const {
    label,
    children,
    className,
    divider = <hr />,
    size,
    color,
    removeDivider,
    disableLabelWidth,
    enableEvenWidth,
    clampLabel,
    scrollOverflowLabel,
    slotProps = {},
    ...rest
  } = props;
  const longTextRef = useScrollLongText();
  return (
    <div
      className={cn(
        className,
        styles.root,
        removeDivider && styles.removeDivider,
        disableLabelWidth && styles.disableLabelWidth,
        enableEvenWidth && styles.enableEvenWidth,
        clampLabel && styles.clampLabel,
        scrollOverflowLabel && styles.scrollOverflowLabel,
      )}
      data-size={size}
      data-color={color}
      {...rest}
    >
      <span
        {...slotProps.label}
        ref={mergeRefs(
          slotProps.label?.ref,
          scrollOverflowLabel ? longTextRef : undefined,
        )}
        className={cn(slotProps.label?.className, styles.label)}
        style={{
          ...slotProps.label?.style,
          WebkitLineClamp:
            typeof clampLabel === "number"
              ? clampLabel
              : typeof clampLabel === "boolean" && clampLabel
                ? 1
                : undefined,
        }}
      >
        {label}
      </span>
      {divider}
      <span
        {...slotProps.content}
        className={cn(slotProps.content?.className, styles.content)}
      >
        {children}
      </span>
    </div>
  );
}
