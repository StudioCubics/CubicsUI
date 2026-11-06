"use client";

import { usePersistScrollPosition } from "@cubicsui/hooks";
import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn, mergeRefs } from "@cubicsui/utils";
import type { ElementType, ReactElement } from "react";
import { useSidebarLayout } from "../SidebarLayout";
import type {
  SidebarViewportBaseProps,
  SidebarViewportProps,
} from "../SidebarLayout.types";
import styles from "./SidebarViewport.module.css";

function SidebarViewportBase(props: SidebarViewportProps): ReactElement {
  const {
    as,
    children,
    className,
    ref,
    persistScrollPosition,
    removeBg,
    ...rest
  } = props;
  const { closesTo, variant, type, side, id } = useSidebarLayout();
  const { containerRef } = usePersistScrollPosition({
    id: id ?? "",
    disabled: !persistScrollPosition,
  });
  const Component = as || "div";
  return (
    <Component
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
    </Component>
  );
}
SidebarViewportBase.displayName = "SidebarViewportBase";

export const SidebarViewport = SidebarViewportBase as PolymorphicComponentType<
  SidebarViewportBaseProps,
  ElementType
>;
