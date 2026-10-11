"use client";

import { cn, isServer, mergeRefs, notImplemented } from "@cubicsui/utils";
import {
  createContext,
  useContext,
  type ReactElement,
  type Context,
  useState,
  useEffect,
  useId,
  useMemo,
} from "react";
import styles from "./List.module.css";
import type { ListContextProps, ListProps } from "./List.types";
import { useGlider } from "@cubicsui/hooks";
import { GlassCard } from "../GlassCard/GlassCard";
import { ListScript } from "./ListScript";

export const ListContext: Context<ListContextProps | null> =
  createContext<ListContextProps | null>(null);

export function useList(): ListContextProps {
  let c = useContext(ListContext);
  if (!c)
    return {
      toggleCollapsed: notImplemented,
      getCollapsed: (_id, defaultCollapsed) => defaultCollapsed ?? false,
    };
  return c;
}

function getExplicitCollapsed(
  storageKey: string | null,
): Record<string, boolean> {
  if (isServer || !storageKey) return {};
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return JSON.parse(stored) as Record<string, boolean>;
  } catch (_) {}
  return {};
}

export function List(props: ListProps): ReactElement {
  const {
    ordered,
    children,
    ref,
    className,
    slotProps = {},
    color,
    size,
    listType,
    style,
    renderGlider = false,
    selectedWhen,
    LinkComponent = "a",
    GliderComponent = GlassCard,
    id,
    persist,
    defaultCollapsedIds = [],
    scriptProps,
    nonce,
    ...rest
  } = props;
  const Component: "ul" | "ol" = ordered ? "ol" : "ul";
  const [activeNode, setActiveNode] = useState<Element | null>(null);
  const { gliderRef, rootRef } = useGlider(
    (glider, rootRect, scrollLeft, scrollTop) => {
      if (!activeNode) return;
      const rect = activeNode.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(activeNode);
      const borderRadius = computedStyle.borderRadius;
      glider.style.position = "absolute";
      glider.style.opacity = "1";
      glider.style.scale = "1";
      glider.style.width = `${rect.width}px`;
      glider.style.height = `${rect.height}px`;
      glider.style.left = `${rect.left - rootRect.left + scrollLeft}px`;
      glider.style.top = `${rect.top - rootRect.top + scrollTop}px`;
      glider.style.borderRadius = borderRadius;
    },
    [activeNode],
  );

  const generatedId = useId();
  const listId = id ?? generatedId;
  const storageKey = `collapsedIds-${listId}`;
  // Persist when an id is given, unless explicitly disabled with persist={false}
  const canPersist = persist ?? id !== undefined;
  // Set of ids the List itself wants collapsed by default (lowest priority)
  const defaultCollapsedIdsSet = useMemo(
    () => new Set(defaultCollapsedIds),
    [defaultCollapsedIds],
  );
  const [explicitCollapsed, setExplicitCollapsed] = useState<
    Record<string, boolean>
  >(() => getExplicitCollapsed(canPersist ? storageKey : null));

  function toggleCollapsed(id: string, current: boolean) {
    setExplicitCollapsed((prev) => {
      const next = { ...prev, [id]: !current };
      try {
        if (canPersist) localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (e) {
        // Unsupported
      }
      return next;
    });
  }
  function getCollapsed(id: string, defaultCollapsed?: boolean): boolean {
    if (id in explicitCollapsed) return explicitCollapsed[id];
    if (defaultCollapsed !== undefined) return defaultCollapsed;
    return defaultCollapsedIdsSet.has(id);
  }

  const glider = renderGlider ? (
    <GliderComponent
      {...slotProps.glider}
      ref={gliderRef}
      className={cn(styles.glider, slotProps.glider?.className)}
    />
  ) : null;

  useEffect(() => {
    if (isServer) return;
    setExplicitCollapsed(getExplicitCollapsed(canPersist ? storageKey : null));
  }, [storageKey, canPersist]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateActiveNode = () => {
      const selectedNodes = root.querySelectorAll<HTMLElement>(
        "li[data-selected='true']",
      );
      const selectedNode =
        selectedNodes.length > 0
          ? selectedNodes.item(selectedNodes.length - 1)
          : null;
      if (!selectedNode) {
        setActiveNode(null);
        return;
      }
      let parent: HTMLElement | null =
        selectedNode.parentElement?.closest<HTMLElement>("li") ?? null;
      let outermostCollapsedAncestor: HTMLElement | null = null;
      while (parent && parent !== root) {
        if (parent.dataset.collapsed === "true") {
          outermostCollapsedAncestor = parent;
        }
        parent = parent.parentElement?.closest<HTMLElement>("li") ?? null;
      }
      setActiveNode(outermostCollapsedAncestor ?? selectedNode);
    };
    updateActiveNode();
    const observer = new MutationObserver(updateActiveNode);
    observer.observe(root, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-selected", "data-collapsed"],
    });

    return () => observer.disconnect();
  }, [rootRef]);

  return (
    <ListContext.Provider
      value={{
        selectedWhen,
        LinkComponent,
        color,
        size,
        listType,
        getCollapsed,
        toggleCollapsed,
      }}
    >
      <Component
        ref={mergeRefs(ref, rootRef)}
        className={cn(styles.root, className)}
        data-color={color}
        data-size={size}
        style={{
          ...style,
          listStyleType: (listType ?? ordered) ? "decimal" : undefined,
        }}
        {...rest}
      >
        {children}
        {glider}
        {canPersist && (
          <ListScript {...scriptProps} nonce={nonce} storageKey={storageKey} />
        )}
      </Component>
    </ListContext.Provider>
  );
}
