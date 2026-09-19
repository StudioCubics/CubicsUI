"use client";

import { type ComponentProps, type ReactElement, type ReactNode } from "react";
import { cn } from "@cubicsui/utils";
import { useSidebarLayout } from "../SidebarLayout";
import styles from "./Sidebar.module.css";

export function Sidebar(
  props: ComponentProps<"div"> & {
    children: ReactNode;
  },
): ReactElement {
  const { children, ...rest } = props;
  const { sidebarOpen, size, closesTo, variant, type } = useSidebarLayout();
  return (
    <div
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
      )}
    >
      {children}
    </div>
  );
}
