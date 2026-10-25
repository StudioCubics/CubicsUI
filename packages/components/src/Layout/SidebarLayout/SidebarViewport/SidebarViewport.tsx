"use client";

import { usePersistScrollPosition } from "@cubicsui/hooks";
import { cn, mergeRefs } from "@cubicsui/utils";
import type { ReactElement } from "react";
import { useSidebarLayout } from "../SidebarLayout";
import type { SidebarViewportProps } from "../SidebarLayout.types";
import styles from "./SidebarViewport.module.css";

export function SidebarViewport(props: SidebarViewportProps): ReactElement {
  const { children, className, ref, persistScrollPosition, removeBg, ...rest } =
    props;
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
        removeBg && styles.removeBg,
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
