"use client";

import { type ReactElement } from "react";
import { useTabs } from "../Tabs";
import styles from "./TabsBar.module.css";
import { cn } from "@cubicsui/utils";
import { GlassCard } from "../../GlassCard/GlassCard";
import { useGlider } from "@cubicsui/hooks";
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

  const { activeTab } = useTabs();

  const { gliderRef, rootRef } = useGlider(
    (glider, rootRect, scrollLeft, scrollTop) => {
      if (!activeTab || !rootRef.current) return;
      const activeTabElement = rootRef.current.querySelector(
        `[value='${activeTab}']`,
      );
      if (!activeTabElement) return;
      const rect = activeTabElement?.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(activeTabElement);
      const borderRadius = computedStyle.borderRadius;
      glider.style.position = "absolute";
      glider.style.scale = "1";
      glider.style.opacity = "1";
      glider.style.width = `${rect.width}px`;
      glider.style.height = `${rect.height}px`;
      glider.style.left = `${rect.left - rootRect.left + scrollLeft}px`;
      glider.style.top = `${rect.top - rootRect.top + scrollTop}px`;
      glider.style.borderRadius = borderRadius;
    },
    [activeTab],
  );
  const glider = renderGlider ? (
    <GliderComponent
      {...slotProps.glider}
      data-slot={"glider"}
      ref={gliderRef}
      className={cn(styles.glider, slotProps.glider?.className)}
    />
  ) : null;

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
      {glider}
    </nav>
  );
}
