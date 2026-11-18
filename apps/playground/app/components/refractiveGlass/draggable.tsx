"use client";

import {
  RefractiveGlass,
  type RefractiveGlassProps,
} from "@cubicsui/components";
import { useDraggable } from "@cubicsui/hooks";
import { cn, mergeEvents, mergeRefs } from "@cubicsui/utils";

export function Draggable(props: Partial<RefractiveGlassProps> = {}) {
  const { children, ...rest } = props;
  return Array.from({ length: 3 }).map((_, i) => {
    return (
      <section
        // biome-ignore lint/suspicious/noArrayIndexKey: dqweqwe
        key={i}
        className={cn("grid", i % 2 ? "image_bg" : i % 3 ? "rgb_bg" : "")}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <DraggableGlassItem
              // biome-ignore lint/suspicious/noArrayIndexKey: dqweqwe
              key={i}
              {...rest}
            >
              {children ?? `Grid Item ${i + 1}`}
            </DraggableGlassItem>
          );
        })}
      </section>
    );
  });
}
function DraggableGlassItem(props: RefractiveGlassProps) {
  const {
    ref,
    children,
    style,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    ...rest
  } = props;
  const { draggableRef, handleDragEnd, handleDragMove, handleDragStart } =
    useDraggable<HTMLDivElement>();
  return (
    <RefractiveGlass
      {...rest}
      ref={mergeRefs(draggableRef)}
      style={{ ...style, padding: "var(--gap-3)" }}
      onPointerDown={mergeEvents(onPointerDown, handleDragStart)}
      onPointerMove={mergeEvents(onPointerMove, handleDragMove)}
      onPointerUp={mergeEvents(onPointerUp, handleDragEnd)}
      onPointerCancel={mergeEvents(onPointerCancel, handleDragEnd)}
    >
      {children}
    </RefractiveGlass>
  );
}
