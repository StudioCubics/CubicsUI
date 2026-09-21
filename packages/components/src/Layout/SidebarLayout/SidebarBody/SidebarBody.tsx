"use client";

import { cn, mergeRefs } from "@cubicsui/utils";
import type { ComponentProps, ReactElement } from "react";
import styles from "./SidebarBody.module.css";
import { useSidebarLayout } from "../SidebarLayout";
import { usePersistScrollPosition } from "@cubicsui/hooks";
import type {
  SidebarOverflowProps,
  SidebarShowProps,
} from "../SidebarLayout.types";

export function SidebarBody(
  props: ComponentProps<"div"> & SidebarShowProps & SidebarOverflowProps,
): ReactElement {
  const {
    ref,
    children,
    className,
    showOnClose = false,
    persistScrollPosition = false,
    ...rest
  } = props;
  const { sidebarOpen, id } = useSidebarLayout();
  const { containerRef } = usePersistScrollPosition({
    id: id ?? "",
    disabled: !persistScrollPosition,
  });
  return (
    <div
      {...rest}
      suppressHydrationWarning
      ref={mergeRefs(ref, containerRef)}
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
