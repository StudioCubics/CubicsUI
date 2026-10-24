"use client";

import { cn, mergeRefs } from "@cubicsui/utils";
import { createContext, useContext, type ReactElement } from "react";
import type { AccordionContextProps, AccordionProps } from "./Accordion.types";
import { GlassCard } from "../GlassCard/GlassCard";
import { useActiveNodeGlider, useDisclosureGroup } from "@cubicsui/hooks";
import styles from "./Accordion.module.css";
import { AccordionScript } from "./AccordionScript";

const AccordionContext = createContext<AccordionContextProps | null>(null);

export function useAccordion(): AccordionContextProps {
  const c = useContext(AccordionContext);
  // Local fallback state
  const collapsed = useDisclosureGroup("Accordion", {
    fallbackCollapsed: true,
  });
  if (c) return c;
  return collapsed;
}

export function Accordion(props: AccordionProps): ReactElement {
  const {
    as,
    ref,
    id,
    children,
    persist,
    exclusive,
    defaultCollapsedIds,
    renderGlider = false,
    className,
    scriptProps,
    nonce,
    slotProps = {},
    GliderComponent = GlassCard,
    ...rest
  } = props;

  const collapsed = useDisclosureGroup("Accordion", {
    id,
    persist,
    saveOnly: "only-false",
    exclusive,
    defaultCollapsedIds,
    fallbackCollapsed: true,
  });
  const { gliderRef, rootRef } = useActiveNodeGlider();

  const glider =
    exclusive && renderGlider ? (
      <GliderComponent
        {...slotProps.glider}
        ref={gliderRef}
        className={cn(styles.glider, slotProps.glider?.className)}
      />
    ) : null;
  const Component = as ?? "div";

  return (
    <AccordionContext.Provider value={collapsed}>
      <Component
        ref={mergeRefs(ref, rootRef)}
        className={cn(className, styles.root)}
        {...rest}
      >
        {children}
        {glider}
        {collapsed.canPersist && (
          <AccordionScript
            {...scriptProps}
            nonce={nonce}
            storageKey={collapsed.storageKey}
          />
        )}
      </Component>
    </AccordionContext.Provider>
  );
}
