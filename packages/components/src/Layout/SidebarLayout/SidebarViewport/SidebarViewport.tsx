"use client";

import { type ReactElement } from "react";
import { cn, mergeRefs } from "@cubicsui/utils";
import styles from "./SidebarViewport.module.css";
import { useSidebarLayout } from "../SidebarLayout";
import { usePersistScrollPosition } from "@cubicsui/hooks";
import type { SidebarViewportProps } from "../SidebarLayout.types";

export function SidebarViewport(props: SidebarViewportProps): ReactElement {
  const {
    children,
    className,
    ref,
    persistScrollPosition = false,
    ...rest
  } = props;
  const { closesTo, variant, type, side, id } = useSidebarLayout();
  const { containerRef } = usePersistScrollPosition({
    id: id ?? "",
    disabled: !persistScrollPosition,
  });

  return (
    <div
      {...rest}
      ref={mergeRefs(ref, containerRef)}
      data-slot={"sidebar-viewport"}
      className={cn(
        className,
        styles.root,
        closesTo && styles[`closesTo_${closesTo}`],
        variant && styles[`variant_${variant}`],
        type && styles[`type_${type}`],
        side && styles[`side_${side}`],
      )}
    >
      {children}
    </div>
  );
}
