"use client";

import type { Point2D } from "@cubicsui/types";
import { type PointerEvent, type RefObject, useEffect, useRef } from "react";

export function useDraggable<E extends HTMLElement = HTMLElement>(
  props: { disable: boolean } = { disable: false },
): {
  handleDragStart: (e: PointerEvent<E>) => void;
  handleDragMove: (e: PointerEvent<E>) => void;
  handleDragEnd: (e: PointerEvent<E>) => void;
  draggableRef: RefObject<E | null>;
} {
  const { disable } = props;
  const draggableRef = useRef<E | null>(null);
  const dragOffsetRef = useRef<Point2D>({ x: 0, y: 0 });
  const dragStartRef = useRef<Point2D | null>(null);
  const handleDragStart = (e: PointerEvent<E>) => {
    if (disable || !draggableRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      x: e.clientX - dragOffsetRef.current.x,
      y: e.clientY - dragOffsetRef.current.y,
    };
    draggableRef.current.style.cursor = "grabbing";
  };

  const handleDragMove = (e: PointerEvent<E>) => {
    if (disable || !dragStartRef.current || !draggableRef.current) return;
    const nextX = e.clientX - dragStartRef.current.x;
    const nextY = e.clientY - dragStartRef.current.y;
    dragOffsetRef.current = { x: nextX, y: nextY };
    draggableRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
  };

  const handleDragEnd = (e: PointerEvent<E>) => {
    if (!dragStartRef.current || !draggableRef.current) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragStartRef.current = null;
    draggableRef.current.style.cursor = "grab";
  };
  useEffect(() => {
    if (!draggableRef.current) return;
    draggableRef.current.style.cursor = "grab";
    draggableRef.current.style.userSelect = "none";
    draggableRef.current.style.touchAction = "none";
  }, []);
  return { handleDragStart, handleDragMove, handleDragEnd, draggableRef };
}
