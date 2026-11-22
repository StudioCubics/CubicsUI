"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn, mergeRefs } from "@cubicsui/utils";
import { type CSSProperties, type ElementType, type ToggleEvent } from "react";
import { createPortal } from "react-dom";
import styles from "./Popover.module.css";
import type { PopoverBaseProps, PopoverProps } from "./Popover.types";
import { usePopover } from "./usePopover";

function PopoverBase<C extends ElementType = "div">(props: PopoverProps<C>) {
  const {
    as,
    ref,
    children,
    className,
    style,
    popover = "auto",
    offset,
    positionArea,
    transformOrigin,
    anchorWidth,
    disablePortal,
    unmountOnExit,
    open,
    anchorEl,
    onClose,
    ...rest
  } = props as PopoverProps<"div">;

  const Component = as || "div";

  const { popoverRef, uncontrolled, position, width, mounted } =
    usePopover(props);

  const popoverContent = (
    <Component
      {...rest}
      ref={mergeRefs(popoverRef, ref)}
      popover={popover}
      onToggle={(e: ToggleEvent<HTMLDivElement>) => {
        if (e.newState === "closed") {
          onClose?.();
        }
        rest.onToggle?.(e);
      }}
      className={cn(
        className,
        styles.root,
        styles.overrideUAStyles,
        // controlled popovers are placed with top/left instead of position-area
        !uncontrolled && styles.controlled,
        // anchorWidth in controlled mode is set inline, CSS anchor-size has no anchor
        uncontrolled && anchorWidth && styles.anchorWidth,
      )}
      style={
        {
          ...style,
          "--popover-position-area": positionArea,
          "--popover-transform-origin": transformOrigin,
          ...(!uncontrolled && position
            ? { top: position.y, left: position.x }
            : {}),
          ...(!uncontrolled && anchorWidth && width !== undefined
            ? { width }
            : {}),
        } as CSSProperties
      }
    >
      {children}
    </Component>
  );

  // Controlled + unmountOnExit: the node only exists while open
  const unmounted = !uncontrolled && unmountOnExit && !open;
  // The portal needs `document`, which isn't available during SSR
  const canRender = disablePortal || mounted;

  if (unmounted || !canRender) return null;

  return disablePortal
    ? popoverContent
    : createPortal(popoverContent, document.body);
}

PopoverBase.displayName = "Popover";

/**
 * A polymorphic popover component.
 * By default it renders a `<div>`, but any element can be used via the `as` prop.
 *
 * ```tsx
 * <Popover as="article">...</Popover>
 * ```
 */
export const Popover = PopoverBase as PolymorphicComponentType<
  PopoverBaseProps,
  ElementType
>;
