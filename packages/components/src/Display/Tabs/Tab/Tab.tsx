"use client";

import { type ElementType, useRef, type MouseEvent } from "react";
import styles from "./Tab.module.css";
import { useTabs } from "../Tabs";
import { cn, mergeRefs } from "@cubicsui/utils";
import type { PolymorphicComponentType } from "@cubicsui/types";
import type { TabBaseProps, TabProps } from "../Tabs.types";

function TabBase<C extends ElementType = "div">(props: TabProps<C>) {
  const {
    as,
    className,
    startAdornment,
    endAdornment,
    disabled,
    href,
    onClick,
    value,
    onTouchStart,
    children,
    slotProps = {},
    ref,
    LinkComponent = "a",
    ...restProps
  } = props;
  const { activeTab, setActiveTab } = useTabs();
  const tabRef = useRef<HTMLButtonElement>(null);

  const selected = activeTab == value;

  const Component = href ? LinkComponent : as || "div";

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (tabRef.current)
      tabRef.current.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
      });
    setActiveTab(value);
    onClick?.(e);
  }

  const componentProps = {
    className: cn(
      className,
      styles.root,
      disabled ? styles.disabled : undefined,
    ),
    "data-selected": selected,
    value,
    onClick: handleClick,
    disabled,
    href: !disabled ? href : undefined,
    ref: mergeRefs(ref, tabRef),
    ...restProps,
  };

  return (
    <Component {...componentProps}>
      {startAdornment && (
        <span
          {...slotProps.startAdornment}
          className={cn(styles.adornment, slotProps.startAdornment?.className)}
        >
          {startAdornment}
        </span>
      )}
      {children}
      {endAdornment && (
        <span
          {...slotProps.endAdornment}
          className={cn(styles.adornment, slotProps.endAdornment?.className)}
        >
          {endAdornment}
        </span>
      )}
    </Component>
  );
}
TabBase.displayName = "Tab";

/**
 * A polymorphic Tab component.
 *
 * By default it renders a `<button>`, but any element can be used via the `as` prop:
 *
 * ```tsx
 * <Tab as="a" href="/docs">Read docs</Tab>
 * ```
 */
export const Tab = TabBase as PolymorphicComponentType<TabBaseProps, "div">;
