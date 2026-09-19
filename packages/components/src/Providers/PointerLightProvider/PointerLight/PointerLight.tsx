"use client";

import { useMounted, usePointerPosition } from "@cubicsui/hooks";
import { cn, remap } from "@cubicsui/utils";
import type { CSSProperties, ReactElement } from "react";
import styles from "./PointerLight.module.css";
import type { PointerLightProps } from "../PointerLightProvider.types";
import { POINTERLIGHT_DEFAULTS } from "../PointerLightProvider";

function getSpeedAdjustedSize(value: number, mouseSpeed: number) {
  return value - Math.round(remap(mouseSpeed, [33, 1000], [0, 100]));
}

// TODO fix functionality
export function PointerLight(props: PointerLightProps): ReactElement | null {
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
  const { mounted } = useMounted();
  if (!mounted) return null;
  return (
    <div
      {...slotProps.root}
      className={cn(styles.root, slotProps.root?.className)}
      key="pointerlight"
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
          width: `${getSpeedAdjustedSize(25, pointerSpeed)}em`,
          height: `${getSpeedAdjustedSize(12, pointerSpeed)}em`,
          opacity,
          ...style,
        }}
      />
    </div>
  );
}
