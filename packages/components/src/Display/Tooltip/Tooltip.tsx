"use client";

import { useDisclosure, useMounted, usePointerPosition } from "@cubicsui/hooks";
import type { AnchorLike } from "@cubicsui/types";
import { cn, mergeRefs } from "@cubicsui/utils";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type Ref,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Popover } from "../../Layout/Popover/Popover";
import styles from "./Tooltip.module.css";
import type { TooltipProps } from "./Tooltip.types";
import { DEFAULT_ARROW_SIZE, updateArrow } from "./Tooltip.utils";

/** Make sure the children can have ref or else tooltip wont work  */
export function Tooltip(props: TooltipProps): ReactElement {
  const {
    ref,
    title,
    children,
    className,
    renderArrow,
    arrowSize = DEFAULT_ARROW_SIZE,
    pointerGap = 16,
    followPointer,
    positionArea = "bottom center",
    pointToCenterOfAnchor,
    ...rest
  } = props;
  const popoverRef = useRef<HTMLDivElement>(null);
  const { mounted } = useMounted();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { open, handleOpen, handleClose } = useDisclosure();
  const { pointerPosition } = usePointerPosition();
  const pointerAnchor = useMemo<AnchorLike>(
    () => ({
      getBoundingClientRect: () =>
        new DOMRect(pointerPosition.x, pointerPosition.y, 0, 0),
    }),
    [pointerPosition.x, pointerPosition.y],
  );
  const activeAnchor = followPointer ? pointerAnchor : anchorEl;

  const offset =
    (renderArrow ? arrowSize.height : 0) + (followPointer ? pointerGap : 0);

  const pointTowards =
    followPointer && !pointToCenterOfAnchor ? pointerAnchor : anchorEl;
  // Popover moves with the pointer when following, so the arrow must recalculate on each move
  const pointerDep = followPointer ? pointerAnchor : null;

  /** Handles hovering over the children */
  useLayoutEffect(() => {
    if (!anchorEl) return;

    anchorEl.addEventListener("mouseenter", handleOpen);
    anchorEl.addEventListener("mouseleave", handleClose);

    return () => {
      anchorEl.removeEventListener("mouseenter", handleOpen);
      anchorEl.removeEventListener("mouseleave", handleClose);
    };
  }, [anchorEl]);

  /** Keeps the arrow pointing at the anchor */
  useLayoutEffect(() => {
    const popover = popoverRef.current;
    if (!renderArrow || !open || !pointTowards || !popover) return;

    function update() {
      if (popoverRef.current && pointTowards)
        updateArrow(pointTowards, popoverRef.current, arrowSize);
    }

    if (followPointer) update();
    // Wait a frame, Popover sets its position in its own layout effect
    const frame = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [renderArrow, open, pointTowards, pointerDep, followPointer, arrowSize]);

  // Server and first client render: children as is, so hydration matches
  if (!mounted) return children;

  // toArray resolves fulfilled lazy references
  const child = Children.toArray(children)[0];

  // Still not a real element (text, nothing, unresolved): render as is
  if (!isValidElement<{ ref?: Ref<HTMLElement> }>(child)) return children;

  return (
    <>
      {cloneElement(child, { ref: mergeRefs(setAnchorEl, child.props.ref) })}
      <Popover
        // Set to manual to make it not close when clicking
        popover="hint"
        {...rest}
        open={open}
        anchorEl={activeAnchor}
        ref={mergeRefs(popoverRef, ref)}
        className={cn(className, styles.root, renderArrow && styles.arrow)}
        offset={offset || undefined}
        positionArea={positionArea}
      >
        {title}
      </Popover>
    </>
  );
}
