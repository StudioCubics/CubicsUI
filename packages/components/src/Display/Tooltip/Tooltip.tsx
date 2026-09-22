"use client";

import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { useTooltip } from "./useTooltip";
import styles from "./Tooltip.module.css";
import getArrowDirection from "./getArrowDirection";
import { cn, mergeRefs } from "@cubicsui/utils";
import type { TooltipProps } from "./Tooltip.types";

export function Tooltip({
  title,
  children,
  renderArrow = false,
  anchorOrigin,
  transformOrigin,
  margin,
}: TooltipProps): ReactElement {
  const options = useMemo(() => {
    return {
      anchorOrigin: anchorOrigin ?? "bottom center",
      transformOrigin: transformOrigin ?? "top center",
      margin: margin ?? 8,
    };
  }, [anchorOrigin, transformOrigin, margin]);
  const { anchorRef, showTooltip, tooltipRef, position, updatePosition } =
    useTooltip(options);

  const direction = renderArrow
    ? getArrowDirection(
        anchorOrigin ?? "bottom center",
        transformOrigin ?? "top center",
      )
    : undefined;

  const child = Children.only(children);

  useEffect(() => {
    if (showTooltip) updatePosition();
  }, [title, showTooltip, updatePosition]);

  return (
    <>
      {showTooltip &&
        createPortal(
          <div
            className={cn(styles.root)}
            ref={tooltipRef}
            data-arrow={direction}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          >
            {title}
          </div>,
          document.body,
        )}
      {cloneElement(child, {
        ref: mergeRefs(anchorRef, child.props.ref),
      })}
    </>
  );
}
