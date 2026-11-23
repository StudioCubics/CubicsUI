"use client";

import type {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  MouseEvent,
  RefObject,
  TouchEvent,
} from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Ripple.module.css";
import type { Ripple, UseRippleProps, UseRippleReturns } from "./Ripple.types";

/**
 * Use to add ripples to any components triggered by any event
 */
export function useRipple<C extends HTMLElement>(
  props: UseRippleProps = {},
  containerRef?: RefObject<HTMLElement | null>,
): UseRippleReturns<C> {
  const { duration = 750, color = "currentColor", disabled = false } = props;

  const [ripples, setRipples] = useState<Ripple[]>([]);
  const keyRef = useRef(0);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // clear pending timeouts on unmount
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach(clearTimeout);
      timeouts.clear();
    };
  }, []);

  const createRipple = useCallback(
    (
      event: TouchEvent<C> | MouseEvent<C> | ChangeEvent<C> | FocusEvent<C>,
    ): void => {
      const { currentTarget } = event;
      if (!currentTarget) return;
      if (disabled) return;

      // resolve a pointer position from mouse or touch events
      // detail === 0 means a keyboard/synthetic click, so we center instead
      let point: { x: number; y: number } | null = null;
      if ("touches" in event && event.touches.length > 0) {
        point = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      } else if (
        "clientX" in event &&
        "clientY" in event &&
        (event as MouseEvent<C>).detail !== 0
      ) {
        point = { x: event.clientX, y: event.clientY };
      }

      // measure against the container if it exists instead of the element that fired the event
      const element = containerRef?.current ?? event.currentTarget;
      const rect = element.getBoundingClientRect();

      const diameter = Math.max(element.offsetWidth, element.offsetHeight);
      const radius = diameter / 2;

      const left = point
        ? point.x - rect.left - radius
        : rect.width / 2 - radius;
      const top = point
        ? point.y - rect.top - radius
        : rect.height / 2 - radius;

      const newRipple = {
        key: keyRef.current++,
        size: diameter,
        x: left,
        y: top,
        color,
        blur: diameter * 0.168,
      };

      setRipples((prev) => (prev.length <= 2 ? [...prev, newRipple] : prev));

      const timeout = setTimeout(() => {
        timeoutsRef.current.delete(timeout);
        setRipples((prev) =>
          prev.filter((ripple) => ripple.key !== newRipple.key),
        );
      }, duration);
      timeoutsRef.current.add(timeout);
    },
    [duration, color, disabled, containerRef],
  );

  const rippleElements = ripples.map((ripple) => (
    <RippleComponent
      ripple={ripple}
      key={ripple.key}
      duration={duration}
      color={color}
    />
  ));

  return { createRipple, rippleElements };
}

function RippleComponent({
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
