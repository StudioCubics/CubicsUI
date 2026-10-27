"use client";

import { useMounted } from "@cubicsui/hooks";
import { cn } from "@cubicsui/utils";
import type { ReactElement } from "react";
import { useSidebarLayout } from "../SidebarLayout";
import type { SidebarHeaderProps } from "../SidebarLayout.types";
import styles from "./SidebarHeader.module.css";
import { SidebarToggle } from "./SidebarToggle";

export function SidebarHeader(props: SidebarHeaderProps): ReactElement {
  const {
    logo,
    sidebarToggle = <SidebarToggle />,
    children,
    className,

    ...rest
  } = props;
  const { sidebarOpen, closesTo, side } = useSidebarLayout();
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
        side && styles[`side_${side}`],
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
