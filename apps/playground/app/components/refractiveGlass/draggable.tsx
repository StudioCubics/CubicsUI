"use client";

import { RefractiveGlass } from "@cubicsui/components";
import { useDraggable } from "@cubicsui/hooks";

export function Draggable() {
  return (
    <>
      <h2>These are draggable</h2>
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: dqweqwe
            key={i}
            className={i % 2 ? "image_bg" : i % 3 ? "rgb_bg" : ""}
          >
            <section className={"grid"}>
              {Array.from({ length: 3 }).map((_, i) => {
                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: dqweqwe
                    key={i}
                  >
                    <DraggableGlassItem
                      label={`Grid Item ${i + 1}`}
                    ></DraggableGlassItem>
                  </div>
                );
              })}
            </section>
          </div>
        );
      })}
    </>
  );
}
function DraggableGlassItem({ label }: { label: string }) {
  const { draggableRef, handleDragEnd, handleDragMove, handleDragStart } =
    useDraggable<HTMLDivElement>();
  return (
    <RefractiveGlass
      ref={draggableRef}
      style={{ padding: "var(--gap-3)" }}
      onPointerDown={handleDragStart}
      onPointerMove={handleDragMove}
      onPointerUp={handleDragEnd}
      onPointerCancel={handleDragEnd}
    >
      {label}
    </RefractiveGlass>
  );
}
