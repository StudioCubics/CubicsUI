"use client";

import { type ReactElement } from "react";
import styles from "./TabsBar.module.css";
import { cn } from "@cubicsui/utils";
import { GlassCard } from "../../GlassCard/GlassCard";
import { useActiveNodeGlider } from "@cubicsui/hooks";
import type { TabsBarProps } from "../Tabs.types";

export function TabsBar(props: TabsBarProps): ReactElement {
  const {
    children,
    className,
    renderGlider = false,
    removeBg = false,
    color,
    size = "md",
    slotProps = {},
    fullWidth = false,
    GliderComponent = GlassCard,
    ...rest
  } = props;

  const { gliderRef, rootRef } = useActiveNodeGlider();

  return (
    <nav
      {...rest}
      data-color={color}
      data-size={size}
      className={cn(
        className,
        styles.root,
        removeBg && styles.removeBg,
        fullWidth && styles.fullWidth,
      )}
      ref={rootRef}
    >
      {children}
      {renderGlider ? (
        <GliderComponent
          {...slotProps.glider}
          data-slot={"glider"}
          ref={gliderRef}
          className={cn(styles.glider, slotProps.glider?.className)}
        />
      ) : null}
    </nav>
  );
}
