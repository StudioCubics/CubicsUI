"use client";

import { useMounted } from "@cubicsui/hooks";
import type { PolymorphicComponentType } from "@cubicsui/types";
import { calculateSafePosition, cn, mergeRefs } from "@cubicsui/utils";
import {
  type CSSProperties,
  type ElementType,
  type ToggleEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Popover.module.css";
import type { PopoverBaseProps, PopoverProps } from "./Popover.types";

function PopoverBase<C extends ElementType = "div">(props: PopoverProps<C>) {
  const {
    as,
    ref,
    children,
    className,
    style,
    popover = "auto",
    margin,
    positionArea = "bottom center",
    transformOrigin = "top center",
    anchorWidth,
    disablePortal,
    unmountOnExit,
    open,
    anchorEl,
    onClose,
    ...rest
  } = props as PopoverProps<"div">;
  const Component = as || "div";
  const popoverRef = useRef<HTMLDivElement>(null);
  const { mounted } = useMounted();
  // uncontrolled: popovertarget/commands drive it
  const uncontrolled = open === undefined;
  // controlled: position and anchor width calculated in JS relative to anchorEl
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [width, setWidth] = useState<number | undefined>();

  // Show or hide using native API (re-runs once the node has mounted)
  useLayoutEffect(() => {
    const el = popoverRef.current;
    if (!mounted || uncontrolled || !el) return;

    const isOpen = el.matches(":popover-open");
    if (open && !isOpen) el.showPopover();
    else if (!open && isOpen) el.hidePopover();
  }, [open, mounted, uncontrolled]);

  // Position relative to the anchor when controlled
  useLayoutEffect(() => {
    if (!mounted || uncontrolled || !open || !anchorEl) return;

    function update() {
      if (!anchorEl) return;
      if (anchorWidth) setWidth(anchorEl.getBoundingClientRect().width);
      setPosition(
        calculateSafePosition(popoverRef.current, anchorEl, {
          positionArea,
          margin,
        }),
      );
    }

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [
    open,
    mounted,
    uncontrolled,
    anchorEl,
    anchorWidth,
    positionArea,
    transformOrigin,
  ]);

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
