"use client";

import { cn } from "@cubicsui/utils";
import type { ReactElement } from "react";
import styles from "./SidebarFooter.module.css";
import type { SidebarFooterProps } from "./SidebarFooter.types";
import { useSidebarLayout } from "../SidebarLayout";

export function SidebarFooter(props: SidebarFooterProps): ReactElement {
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
