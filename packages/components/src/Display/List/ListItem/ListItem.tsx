"use client";

import { DropDownIcon } from "@cubicsui/icons";
import { cn } from "@cubicsui/utils";
import type { ElementType, MouseEvent, ReactElement } from "react";
import { useList } from "../List";
import type {
  ListItemProps,
  ListItemTypeCollapsibleProps,
  ListItemTypeHeaderProps,
  ListItemTypeItemProps,
  ListItemTypeSeparatorProps,
} from "../List.types";
import styles from "./ListItem.module.css";

export function ListItem(props: ListItemProps): ReactElement {
  const { type } = props;
  switch (type) {
    case "separator":
      return <ListItemTypeSeparator {...props} />;
    case "collapsible":
      return <ListItemTypeCollapsible {...props} />;
    case "header":
      return <ListItemTypeHeader {...props} />;
    default:
      return <ListItemTypeItem {...props} />;
  }
}
export function ListItemTypeSeparator(
  props: ListItemTypeSeparatorProps,
): ReactElement {
  const { className, ...rest } = props;
  return <hr {...rest} className={cn(className, styles.separator)} />;
}

export function ListItemTypeHeader(
  props: ListItemTypeHeaderProps,
): ReactElement {
  const { children, renderLine = false } = props;
  return (
    <span className={cn(styles.header, renderLine && styles.renderLine)}>
      {children}
    </span>
  );
}
export function ListItemTypeCollapsible(
  props: ListItemTypeCollapsibleProps,
): ReactElement | null {
  const {
    id,
    ordered,
    href,
    disabled,
    icon,
    children,
    selected: _selected,
    onClick,
    onCollapsed,
    defaultCollapsed,
    nodes,
    color,
    size,
    className,
    dropdownIcon,
    onlyIcon,
    listType: _listType,
    LinkComponent: _LinkComponent,
    slotProps = {},
    ...rest
  } = props;
  const {
    LinkComponent,
    selectedWhen,
    listType,
    getCollapsed,
    toggleCollapsed,
  } = useList();
  const Component = (
    href ? (_LinkComponent ?? LinkComponent) : "div"
  ) as ElementType;
  const ListComponent: "ol" | "ul" = ordered ? "ol" : "ul";
  const active = _selected || selectedWhen?.(props);
  const collapsed = getCollapsed(id, defaultCollapsed);

  function handleClick(e: MouseEvent) {
    if (disabled) return;
    if (href || onClick) {
      onClick?.(e);
    } else {
      toggleCollapsed(id, collapsed);
    }
  }

  return (
    <li
      {...slotProps.root}
      id={id}
      className={cn(slotProps.root?.className, styles.root)}
      data-color={color}
      data-size={size}
      data-collapsed={collapsed}
      suppressHydrationWarning
    >
      <Component
        className={cn(className, styles.surface, disabled && styles.disabled)}
        data-active={active}
        onClick={handleClick}
        href={href}
        {...rest}
      >
        {icon && (
          <span
            {...slotProps.icon}
            className={cn(slotProps.icon?.className, styles.icon)}
          >
            {icon}
          </span>
        )}
        {children !== false && children != null && !onlyIcon && (
          <span
            {...slotProps.content}
            className={cn(slotProps.content?.className, styles.content)}
          >
            {children}
          </span>
        )}
        {!onlyIcon && (
          <span
            {...slotProps.action}
            className={cn(slotProps.action?.className, styles.action)}
          >
            <button
              {...slotProps.dropdownToggle}
              suppressHydrationWarning
              className={cn(
                slotProps.dropdownToggle?.className,
                styles.dropdownToggle,
              )}
              type="button"
              data-open={!collapsed}
              disabled={disabled}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCollapsed(id, collapsed);
                onCollapsed?.();
                slotProps.dropdownToggle?.onClick?.(e);
              }}
            >
              {dropdownIcon ?? <DropDownIcon />}
            </button>
          </span>
        )}
      </Component>
      {!!nodes?.length && !onlyIcon && (
        <ListComponent
          suppressHydrationWarning
          className={cn(styles.sublist)}
          style={{ listStyleType: _listType || listType }}
          aria-expanded={!collapsed}
          {...slotProps.sublist}
        >
          {nodes.map((n, i) => (
            <ListItem
              // biome-ignore lint/suspicious/noArrayIndexKey: for creating unique keys
              key={i}
              {...(n.type === "collapsible" && { dropdownIcon })}
              {...((n.type === "item" || n.type === "collapsible") && {
                disabled: n.disabled ?? disabled,
              })}
              {...n}
            />
          ))}
        </ListComponent>
      )}
    </li>
  );
}

export function ListItemTypeItem(props: ListItemTypeItemProps): ReactElement {
  const {
    href,
    children,
    icon,
    actions: action,
    disabled,
    onClick,
    selected: _selected,
    onlyIcon = false,
    color,
    size,
    className,
    LinkComponent: _LinkComponent,
    slotProps = {},
    ...rest
  } = props;
  const { LinkComponent, selectedWhen } = useList();
  const isClickable = !!href || !!onClick;
  const Component = (
    href ? (_LinkComponent ?? LinkComponent) : "div"
  ) as ElementType;
  const active = _selected || selectedWhen?.(props);

  function handleClick(e: MouseEvent) {
    if (!isClickable) return;
    onClick?.(e);
  }

  return (
    <li
      {...slotProps.root}
      className={cn(slotProps.root?.className, styles.root)}
      data-color={color}
      data-size={size}
    >
      <Component
        className={cn(
          className,
          styles.surface,
          disabled && styles.disabled,
          isClickable && styles.isClickable,
        )}
        data-active={active}
        onClick={handleClick}
        href={href}
        {...rest}
      >
        {icon && (
          <span
            {...slotProps.icon}
            className={cn(slotProps.icon?.className, styles.icon)}
          >
            {icon}
          </span>
        )}
        {children !== false && children != null && !onlyIcon && (
          <span
            {...slotProps.content}
            className={cn(slotProps.content?.className, styles.content)}
          >
            {children}
          </span>
        )}
        {action && !onlyIcon && (
          <span
            {...slotProps.action}
            className={cn(slotProps.action?.className, styles.action)}
          >
            {action}
          </span>
        )}
      </Component>
    </li>
  );
}
