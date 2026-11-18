"use client";

import { useInView, usePointerPosition } from "@cubicsui/hooks";
import type {
  PolymorphicComponentProps,
  PolymorphicComponentType,
} from "@cubicsui/types";
import { cn, mergeRefs, remap } from "@cubicsui/utils";
import { type ElementType, useEffect, useRef } from "react";
import styles from "./GlassCard.module.css";

export type GlassCardProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, object>;

function GlassCardBase<C extends ElementType = "div">(
  props: GlassCardProps<C>,
) {
  const { as, id, children, className, ref, ...restProps } = props;
  const Component: ElementType = as || "div";
  const { pointerPosition } = usePointerPosition();
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef);

  useEffect(() => {
    if (!cardRef.current || !inView) return;
    if (!pointerPosition.x || !pointerPosition.y) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = pointerPosition.x - rect.left;
    const y = pointerPosition.y - rect.top;
    const xCenter = rect.left + rect.width / 2;
    const yCenter = rect.top + rect.height / 2;

    const dx = (pointerPosition.x - xCenter) / rect.width;
    const dy = (pointerPosition.y - yCenter) / rect.height;

    // Angle from card center to mouse
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 270;

    // Distance normalized against window width/height
    const dxGlobal = pointerPosition.x - xCenter;
    const dyGlobal = pointerPosition.y - yCenter;
    const ndX = Math.min(Math.abs(dxGlobal) / window.innerWidth, 1);
    const ndY = Math.min(Math.abs(dyGlobal) / window.innerHeight, 1);
    const md = Math.min(ndX + ndY, 1); // Manhattan distance capped at 1
    const intensity = remap(md, [0, 1], [0.2, 1]); // maps to 0.2..1

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    cardRef.current.style.setProperty("--gradient-angle", `${angle}deg`);
    cardRef.current.style.setProperty("--reflection-intensity", `${intensity}`);
  }, [pointerPosition, inView]);

  return (
    <Component
      ref={mergeRefs(ref, cardRef)}
      className={cn(className, styles.root)}
      {...restProps}
    >
      {children}
    </Component>
  );
}

GlassCardBase.displayName = "GlassCard";

/**
 * A polymorphic card component.
 * By default it renders a `<div/>`, but any element can be used via the `as` prop.
 *
 * ```tsx
 * <GlassCard as="span" >...</GlassCard>
 * ```
 */
export const GlassCard = GlassCardBase as PolymorphicComponentType<
  object,
  "div"
>;
