"use client";
import type { Point2D } from "@cubicsui/types";
import { type RefObject, useEffect, useRef, useState } from "react";

type Event = MouseEvent | undefined;

export interface UsePointerPositionProps {
  /** Shows the last touch position too */
  includeTouch?: boolean;
  /** Shows the last touch position too */
  defaultPosition?: Point2D;
  /** The intensity multiplier of the effect movement has on the speed
   * @default 10*/
  intensity?: number;
}

export interface UsePointerPositionReturn {
  /** The x and y coords of the pointer */
  pointerPosition: Point2D;
  /** The current speed of the pointer Note: this shit is unreliable */
  pointerSpeed: number;
  /** A ref object version of the same pointerSpeed */
  pointerSpeedRef: RefObject<number>;
  /** A ref object version of the same x y coors of the pointer */
  pointerPositionRef: RefObject<{ x: number; y: number }>;
}

export function usePointerPosition(
  props?: UsePointerPositionProps,
): UsePointerPositionReturn {
  const {
    includeTouch = false,
    defaultPosition = { x: -9999, y: -9999 },
    intensity = 10,
  } = props || {};
  const [pointerPosition, setPointerPosition] =
    useState<Point2D>(defaultPosition);
  const pointerPositionRef = useRef(defaultPosition);
  const [pointerSpeed, setPointerSpeed] = useState(0);
  const pointerSpeedRef = useRef(0);
  const [prevEvent, setPrevEvent] = useState<Event>(undefined);

  useEffect(() => {
    pointerPositionRef.current = pointerPosition;
    pointerSpeedRef.current = pointerSpeed;
  }, [pointerPosition, pointerSpeed]);

  useEffect(() => {
    const updateMousePosition = (currentEvent: MouseEvent) => {
      const [x, y] = [currentEvent.clientX, currentEvent.clientY];
      const movementX = Math.abs(
        currentEvent.clientX - (prevEvent?.clientX ? prevEvent?.clientX : 0),
      );
      const movementY = Math.abs(
        currentEvent.clientY - (prevEvent?.clientY ? prevEvent?.clientY : 0),
      );
      const movement = Math.sqrt(movementX * movementX + movementY * movementY);
      const speed = Math.round(intensity * movement);
      setPointerSpeed(speed);
      setPointerPosition({ x, y });
      setPrevEvent(currentEvent);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [prevEvent, intensity]);
  useEffect(() => {
    const updateTouchPosition = (currentEvent: TouchEvent) => {
      let x = null,
        y = null;
      if (currentEvent.touches) {
        const touch = currentEvent.touches[0];
        [x, y] = [touch.clientX, touch.clientY];
      }
      if (!x || !y) return;
      setPointerPosition({ x, y });
    };
    return () => {
      if (includeTouch) {
        window.removeEventListener("touchmove", updateTouchPosition);
      }
    };
  }, [includeTouch]);
  return { pointerPosition, pointerSpeed, pointerSpeedRef, pointerPositionRef };
}
