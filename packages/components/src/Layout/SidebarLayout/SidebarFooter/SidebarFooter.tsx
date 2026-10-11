"use client";

import { cn } from "@cubicsui/utils";
import type { ComponentProps, ReactElement } from "react";
import styles from "./SidebarFooter.module.css";
import { useSidebarLayout } from "../SidebarLayout";
import type { SidebarShowProps } from "../SidebarLayout.types";

export function SidebarFooter(
  props: ComponentProps<"div"> & SidebarShowProps,
): ReactElement {
  const { className, children, showOnClose = false, ...rest } = props;
  const { sidebarOpen } = useSidebarLayout();

  return (
    <div
      {...rest}
      suppressHydrationWarning
      data-slot={"sidebar-footer"}
      data-open={sidebarOpen}
      className={cn(
        className,
        styles.root,
        showOnClose && !sidebarOpen && styles.showOnClose,
      )}
    >
      {children}
    </div>
  );
}
