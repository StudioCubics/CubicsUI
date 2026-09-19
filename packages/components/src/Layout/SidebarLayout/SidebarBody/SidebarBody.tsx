"use client";

import { cn } from "@cubicsui/utils";
import type { ReactElement } from "react";
import styles from "./SidebarBody.module.css";
import { useSidebarLayout } from "../SidebarLayout";
import type { SidebarBodyProps } from "./SidebarBody.types";

export function SidebarBody(props: SidebarBodyProps): ReactElement {
  const { children, className, showOnClose = false, ...rest } = props;
  const { sidebarOpen } = useSidebarLayout();
  return (
    <div
      {...rest}
      suppressHydrationWarning
      data-slot={"sidebar-body"}
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
