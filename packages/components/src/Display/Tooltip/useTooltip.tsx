"use client";
import {
  calculateSafePosition,
  type Position,
  type SafePositionOptions,
} from "@cubicsui/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import type { UseTooltipReturnType } from "./Tooltip.types";

export function useTooltip(
  options: SafePositionOptions = {},
): UseTooltipReturnType {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState<Position>({ x: -9999, y: -9999 });
  const anchorRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = anchorRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      setShowTooltip(true);
    };

    const handleMouseLeave = () => {
      setShowTooltip(false);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const updatePosition = useCallback(() => {
    const safePos = calculateSafePosition(
      tooltipRef.current,
      anchorRef.current,
      options,
    );

    setPosition(safePos);
  }, [options]);

  useEffect(() => {
    if (!showTooltip) return;

    // Initial position calculation
    updatePosition();

    // Update position on scroll and resize
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [showTooltip]);

  return { showTooltip, position, anchorRef, tooltipRef, updatePosition };
}
