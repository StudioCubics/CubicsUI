"use client";

import { usePointerPosition } from "@cubicsui/hooks";
import { cn, remap } from "@cubicsui/utils";
import type { CSSProperties, ReactElement } from "react";
import styles from "./PointerLight.module.css";
import type { PointerLightProps } from "../PointerLightProvider.types";
import { POINTERLIGHT_DEFAULTS } from "../PointerLightProvider";

function getSpeedAdjustedSize(value: number, mouseSpeed: number) {
  return value - Math.round(remap(mouseSpeed, [33, 1000], [0, 100]));
}

// TODO fix functionality
export function PointerLight(props: PointerLightProps): ReactElement {
  const {
    colorA = POINTERLIGHT_DEFAULTS.colorA,
    colorB = POINTERLIGHT_DEFAULTS.colorB,
    opacity = POINTERLIGHT_DEFAULTS.opacity,
    slotProps = {},
    className,
    style,
    ...rest
  } = props;
  const { pointerPosition, pointerSpeed } = usePointerPosition();

  return (
    <div
      {...slotProps.root}
      className={cn(styles.root, slotProps.root?.className)}
      style={
        {
          "--cursor-color-a": colorA,
          "--cursor-color-b": colorB,
        } as CSSProperties
      }
    >
      <div
        {...rest}
        className={cn(styles.main, className)}
        style={{
          left: `${pointerPosition.x}px`,
          top: `${pointerPosition.y}px`,
          width: `${getSpeedAdjustedSize(20, pointerSpeed)}em`,
          height: `${getSpeedAdjustedSize(10, pointerSpeed)}em`,
          opacity,
          ...style,
        }}
      />
    </div>
  );
}
