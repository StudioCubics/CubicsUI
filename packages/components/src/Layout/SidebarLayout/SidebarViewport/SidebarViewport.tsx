"use client";

import type { ComponentProps, ReactElement } from "react";
import { cn } from "@cubicsui/utils";
import styles from "./SidebarViewport.module.css";
import { useSidebarLayout } from "../SidebarLayout";

export function SidebarViewport(props: ComponentProps<"div">): ReactElement {
  const { children, className, ...rest } = props;
  const { closesTo, variant, type } = useSidebarLayout();
  return (
    <div
      {...rest}
      data-slot={"sidebar-viewport"}
      className={cn(
        className,
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
