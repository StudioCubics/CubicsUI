"use client";

import type {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  MouseEvent,
  RefObject,
  TouchEvent,
} from "react";
import { useCallback, useState } from "react";
import type { Ripple, UseRippleProps, UseRippleReturns } from "./Ripple.types";
import styles from "./Ripple.module.css";

/**
 * Use to add ripples to any components triggered by any event
 */
export function useRipple<C extends HTMLElement>(
  props: UseRippleProps = {},
  containerRef?: RefObject<HTMLElement | null>,
): UseRippleReturns<C> {
  const { duration = 750, color = "currentColor", disabled = false } = props;

  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = useCallback(
    (
      event: TouchEvent<C> | MouseEvent<C> | ChangeEvent<C> | FocusEvent<C>,
    ): void => {
      const { currentTarget } = event;
      const isMouseEvent = "clientX" in event && "clientY" in event;
      if (!currentTarget) return;
      if (disabled) return;

      // measure against the container if it exists instead of the element that fired the event
      const element = containerRef?.current ?? event.currentTarget;
      const rect = element.getBoundingClientRect();

      const diameter = Math.max(element.offsetWidth, element.offsetHeight);
      const radius = diameter / 2;

      const left = isMouseEvent
        ? event.clientX - rect.left - radius
        : Math.floor((rect.right - rect.left) / 2);
      const top = isMouseEvent
        ? event.clientY - rect.top - radius
        : Math.floor((rect.bottom - rect.top) / 2);

      const newRipple = {
        key: Date.now(),
        size: diameter,
        x: left,
        y: top,
        color,
        blur: diameter * 0.168,
      };

      setRipples((prev) => (prev.length <= 2 ? [...prev, newRipple] : prev));

      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.key !== newRipple.key),
        );
      }, duration);
    },
    [duration, color, disabled, containerRef],
  );

  const rippleElements = ripples.map((ripple) => (
    <Ripple
      ripple={ripple}
      key={ripple.key}
      duration={duration}
      color={color}
    />
  ));

  return { createRipple, rippleElements };
}

function Ripple({
  ripple,
  color,
  duration,
}: { ripple: Ripple } & UseRippleProps) {
  return (
    <span className={styles.root}>
      <span
        className={styles.main}
        style={{
          ...({
            "--ripple-color": color,
            "--ripple-duration": `${duration}ms`,
            "--ripple-blur": `${ripple.blur}px`, // scales with diameter now
          } as CSSProperties),
          width: ripple.size,
          height: ripple.size,
          left: ripple.x,
          top: ripple.y,
        }}
      />
    </span>
  );
}
