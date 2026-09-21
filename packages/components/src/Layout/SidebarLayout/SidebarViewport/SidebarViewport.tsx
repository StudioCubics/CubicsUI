"use client";

import { type ComponentProps, type ReactElement } from "react";
import { cn, mergeRefs } from "@cubicsui/utils";
import styles from "./SidebarViewport.module.css";
import { useSidebarLayout } from "../SidebarLayout";
import { usePersistScrollPosition } from "@cubicsui/hooks";
import type { SidebarOverflowProps } from "../SidebarLayout.types";

export function SidebarViewport(
  props: ComponentProps<"div"> & SidebarOverflowProps,
): ReactElement {
  const {
    children,
    className,
    ref,
    persistScrollPosition = false,
    ...rest
  } = props;
  const { closesTo, variant, type, id } = useSidebarLayout();
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
      )}
    >
      {children}
    </div>
  );
}
