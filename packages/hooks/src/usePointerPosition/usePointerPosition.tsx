"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

interface PositionMatrix {
  x: number;
  y: number;
}

type Event = MouseEvent | undefined;

export interface UsePointerPositionProps {
  includeTouch?: boolean;
  defaultPosition?: PositionMatrix;
  /** The intensity multiplier of the effect movement has on the speed
   * @default 10
   */
  intensity?: number;
}

export interface UsePointerPositionReturnType {
  pointerPosition: PositionMatrix;
  pointerSpeed: number;
  pointerSpeedRef: RefObject<number>;
  pointerPositionRef: RefObject<{ x: number; y: number }>;
}

export function usePointerPosition(
  props: UsePointerPositionProps | void,
): UsePointerPositionReturnType {
  const {
    includeTouch = false,
    defaultPosition,
    intensity = 10,
  } = props || {
    includeTouch: false,
  };
  const defaultPositionMatrix = {
    x: defaultPosition?.x ?? -9999,
    y: defaultPosition?.y ?? -9999,
  };
  const [pointerPosition, setPointerPosition] = useState<PositionMatrix>(
    defaultPositionMatrix,
  );
  const pointerPositionRef = useRef(defaultPositionMatrix);
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
      let x, y;
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
