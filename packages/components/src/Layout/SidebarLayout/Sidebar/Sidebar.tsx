"use client";

import { cn } from "@cubicsui/utils";
import type { ReactElement } from "react";
import { useSidebarLayout } from "../SidebarLayout";
import type { SidebarProps } from "../SidebarLayout.types";
import styles from "./Sidebar.module.css";

export function Sidebar(props: SidebarProps): ReactElement {
  const { children, removeBg = false, ...rest } = props;
  const { sidebarOpen, size, side, closesTo, variant, type } =
    useSidebarLayout();

  return (
    <aside
      {...rest}
      suppressHydrationWarning
      data-size={size}
      data-slot={"sidebar"}
      data-open={sidebarOpen}
      className={cn(
        styles.root,
        removeBg && styles.removeBg,
        closesTo && styles[`closesTo_${closesTo}`],
        variant && styles[`variant_${variant}`],
        type && styles[`type_${type}`],
        side && styles[`side_${side}`],
      )}
    >
      {children}
    </aside>
  );
}
