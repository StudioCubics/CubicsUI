"use client";

import { useMounted } from "@cubicsui/hooks";
import { calculateSafePosition, type Position } from "@cubicsui/utils";
import { type ElementType, useLayoutEffect, useRef, useState } from "react";
import type { PopoverProps, UsePopoverReturn } from "./Popover.types";

export function usePopover<C extends ElementType = "div">(
  props: PopoverProps<C>,
): UsePopoverReturn {
  const {
    open,
    anchorEl,
    anchorWidth,
    positionArea,
    offset,
    viewportPadding,
    transformOrigin,
  } = props;
  const popoverRef = useRef<HTMLDivElement>(null);
  const { mounted } = useMounted();
  // uncontrolled: popovertarget/commands drive it
  const uncontrolled = open === undefined;
  // controlled: position and anchor width calculated in JS relative to anchorEl
  const [position, setPosition] = useState<Position>();
  const [width, setWidth] = useState<number>();

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
          offset,
          viewportPadding,
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

  return { popoverRef, uncontrolled, position, width, mounted };
}
