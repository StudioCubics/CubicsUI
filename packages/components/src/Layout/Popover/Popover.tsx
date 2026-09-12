"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import type { CSSProperties, ElementType, ToggleEvent } from "react";
import type { PopoverBaseProps, PopoverProps } from "./Popover.types";
import styles from "./Popover.module.css";

function PopoverBase<C extends ElementType = "div">(props: PopoverProps<C>) {
  const {
    as,
    children,
    className,
    style,
    positionArea = "bottom center",
    transformOrigin = "top center",
    anchorWidth,
    popover = "auto",
    onClose,
    ...rest
  } = props as PopoverProps<"div">;
  const Component = as || "div";
  const componentProps = {
    ...rest,
    popover: popover,
    onToggle: (e: ToggleEvent<HTMLDivElement>) => {
      rest.onToggle?.(e);
      if (e.newState === "closed") {
        onClose?.();
      }
    },
    className: cn(className, styles.root, anchorWidth && styles.anchorWidth),
    style: {
      ...style,
      "--popover-position-area": positionArea,
      "--popover-transform-origin": transformOrigin,
    } as CSSProperties,
  };
  return <Component {...componentProps}>{children}</Component>;
}

PopoverBase.displayName = "Popover";

/**
 * A polymorphic popover component.
 * By default it renders a `<div>`, but any element can be used via the `as` prop.
 *
 * ```tsx
 * <Popover as="article" href="/docs">...</Popover>
 * ```
 */
export const Popover = PopoverBase as PolymorphicComponentType<
  PopoverBaseProps,
  "div"
>;
