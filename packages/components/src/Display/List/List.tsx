"use client";

import { useActiveNodeGlider, useDisclosureGroup } from "@cubicsui/hooks";
import { cn, mergeRefs } from "@cubicsui/utils";
import {
  type Context,
  createContext,
  type ReactElement,
  useContext,
} from "react";
import { GlassCard } from "../GlassCard/GlassCard";
import styles from "./List.module.css";
import type { ListContextProps, ListProps } from "./List.types";
import {
  LIST_OBSERVED_ATTRIBUTES,
  resolveCollapsedAncestor,
} from "./List.utils";
import { ListScript } from "./ListScript";

export const ListContext: Context<ListContextProps | null> =
  createContext<ListContextProps | null>(null);

export function useList(): ListContextProps {
  const c = useContext(ListContext);
  // Local fallback state
  const collapsed = useDisclosureGroup("List", {});
  if (c) return c;
  return collapsed;
}
export function List(props: ListProps): ReactElement {
  const {
    id,
    ref,
    children,
    className,
    ordered,
    style,
    color,
    size,
    exclusive,
    listType: _listType,
    renderGlider,
    persist,
    defaultCollapsedIds = [],
    scriptProps,
    nonce,
    selectedWhen,
    LinkComponent = "a",
    GliderComponent = GlassCard,
    slotProps = {},
    ...rest
  } = props;

  const collapsed = useDisclosureGroup("List", {
    id,
    persist,
    saveOnly: "only-true",
    exclusive,
    defaultCollapsedIds,
    fallbackCollapsed: false,
  });
  const { gliderRef, rootRef } = useActiveNodeGlider({
    observeAttributes: LIST_OBSERVED_ATTRIBUTES,
    resolveActiveNode: resolveCollapsedAncestor,
  });
  // Default to decimal list if ordered is true
  const listType = (_listType ?? ordered) ? "decimal" : undefined;
  const glider = renderGlider ? (
    <GliderComponent
      {...slotProps.glider}
      ref={gliderRef}
      className={cn(styles.glider, slotProps.glider?.className)}
    />
  ) : null;
  const Component: "ul" | "ol" = ordered ? "ol" : "ul";

  return (
    <ListContext.Provider
      value={{
        selectedWhen,
        LinkComponent,
        color,
        size,
        listType,
        ...collapsed,
      }}
    >
      <Component
        ref={mergeRefs(ref, rootRef)}
        className={cn(styles.root, className)}
        data-color={color}
        data-size={size}
        style={{
          ...style,
          listStyleType: listType,
        }}
        {...rest}
      >
        {children}
        {glider}
        {collapsed.canPersist && (
          <ListScript
            {...scriptProps}
            nonce={nonce}
            storageKey={collapsed.storageKey}
          />
        )}
      </Component>
    </ListContext.Provider>
  );
}
