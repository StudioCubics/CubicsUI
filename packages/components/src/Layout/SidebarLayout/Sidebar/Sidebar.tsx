"use client";

import { type ReactElement } from "react";
import { cn } from "@cubicsui/utils";
import { useSidebarLayout } from "../SidebarLayout";
import styles from "./Sidebar.module.css";
import type { SidebarProps } from "../SidebarLayout.types";

export function Sidebar(props: SidebarProps): ReactElement {
  const { children, ...rest } = props;
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
