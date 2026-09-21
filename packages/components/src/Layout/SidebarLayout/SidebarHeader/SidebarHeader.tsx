"use client";

import type { ReactElement } from "react";
import { cn } from "@cubicsui/utils";
import { useSidebarLayout } from "../SidebarLayout";
import { SidebarToggle } from "./SidebarToggle";
import { useMounted } from "@cubicsui/hooks";
import type { SidebarHeaderProps } from "../SidebarLayout.types";
import styles from "./SidebarHeader.module.css";

export function SidebarHeader(props: SidebarHeaderProps): ReactElement {
  const {
    logo,
    sidebarToggle = <SidebarToggle />,
    children,
    className,
    ...rest
  } = props;
  const { sidebarOpen, closesTo } = useSidebarLayout();
  const { mounted } = useMounted();
  return (
    <div
      {...rest}
      suppressHydrationWarning
      data-slot={"sidebar-header"}
      data-open={sidebarOpen}
      className={cn(
        className,
        styles.root,
        closesTo && styles[`closesTo_${closesTo}`],
      )}
    >
      <span className={cn(styles.header)}>
        {logo && <span className={cn(styles.logo)}>{mounted && logo}</span>}
        <span className={cn(styles.sidebarToggle)}>{sidebarToggle}</span>
      </span>
      {children}
    </div>
  );
}
