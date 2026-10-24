"use client";

import {
  type MouseEvent,
  type ReactElement,
  type ToggleEvent,
  useId,
  useRef,
} from "react";
import { cn, mergeRefs } from "@cubicsui/utils";
import { useAccordion } from "../Accordion";
import { useRipple } from "../../../Misc/Ripple/Ripple";
import { DropDownIcon } from "@cubicsui/icons";
import type { AccordionItemProps } from "../Accordion.types";
import styles from "./AccordionItem.module.css";

export function AccordionItem(props: AccordionItemProps): ReactElement {
  const {
    ref,
    id: _id,
    children,
    className,
    defaultCollapsed,
    color,
    size,
    variant,
    summary,
    disabled,
    dropdownIcon,
    highlightOpen,
    toggleOnlyOnIcon,
    onToggle,
    slotProps = {},
    ...rest
  } = props;
  const itemRef = useRef<HTMLDetailsElement | null>(null);
  const { getCollapsed, toggleCollapsed } = useAccordion();
  const fallbackId = useId();
  const id = _id ?? fallbackId;
  // Derived from context so exclusive changes rerender every item
  const collapsed = getCollapsed(id, defaultCollapsed);
  const { createRipple, rippleElements } = useRipple();

  function handleToggle(e: ToggleEvent<HTMLDetailsElement>) {
    const current = e.currentTarget.open;
    // Ignore toggle events caused by React syncing the `open` attribute
    if (current === getCollapsed(id, defaultCollapsed)) {
      toggleCollapsed(id, current);
      if (current) {
        itemRef.current?.scrollIntoView({
          block: "nearest",
          inline: "nearest",
          behavior: "smooth",
        });
      }
    }
    onToggle?.(e, current);
  }
  function handleSummaryClick(e: MouseEvent<HTMLElement>) {
    if (disabled || toggleOnlyOnIcon) {
      // Block the native details toggle; the dropdown button handles it instead
      e.preventDefault();
    } else {
      createRipple(e);
    }
    slotProps.summary?.onClick?.(e);
  }
  function handleDropdownClick(e: MouseEvent<HTMLButtonElement>) {
    if (!toggleOnlyOnIcon) return; // default behaviour: bubbles to summary, native toggle
    e.preventDefault();
    e.stopPropagation(); // keep the summary handler (and its ripple) out of it
    if (disabled) return;
    toggleCollapsed(id, collapsed);
    // Mirror the scroll-into-view behaviour of handleToggle
    if (collapsed) {
      itemRef.current?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
    onToggle?.(undefined as never, collapsed);
  }

  const componentProps = {
    id,
    open: !collapsed,
    disabled,
    className: cn(
      className,
      styles.root,
      highlightOpen && styles.higlightOpen,
      toggleOnlyOnIcon && styles.toggleOnlyOnIcon,
      variant && styles[`variant_${variant}`],
    ),
    "aria-expanded": !collapsed,
    "data-slot": "accordion_item",
    "data-active": !collapsed,
    "data-color": color,
    "data-size": size,
    onToggle: handleToggle,
    ...rest,
  };

  return (
    <details
      {...componentProps}
      ref={mergeRefs(ref, itemRef)}
      suppressHydrationWarning
    >
      <summary
        {...slotProps.summary}
        onClick={handleSummaryClick}
        className={cn(slotProps.summary?.className, styles.summary)}
      >
        <div
          {...slotProps.summaryContent}
          className={cn(
            styles.summaryContent,
            slotProps.summaryContent?.className,
          )}
        >
          {summary}
        </div>
        <button
          {...slotProps.dropdownToggle}
          type="button"
          data-open={!collapsed}
          className={cn(styles.dropdownToggle)}
          onClick={handleDropdownClick}
        >
          {dropdownIcon ?? <DropDownIcon />}
        </button>
        {rippleElements}
      </summary>
      <div
        {...slotProps.content}
        className={cn(styles.content, slotProps.content?.className)}
      >
        {children}
      </div>
    </details>
  );
}
