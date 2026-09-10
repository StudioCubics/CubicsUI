"use client";

import { cn } from "@cubicsui/utils";
import { type ElementType, type MouseEvent, type ReactElement } from "react";
import styles from "./ListItem.module.css";

import { useList } from "../List";
import { useLocalStorage, useMounted } from "@cubicsui/hooks";
import { ListDropDownIcon } from "./ListDropDownIcon/ListDropDownIcon";
import type {
  ListItemProps,
  ListItemTypeSeparatorProps,
  ListItemTypeCollapsibleProps,
  ListItemTypeItemProps,
  ListItemTypeHeaderProps,
} from "../List.types";

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
    ordered = false,
    href,
    disabled,
    icon,
    children,
    selected: _selected,
    onClick,
    collapsed: _collapsed = false,
    nodes,
    color,
    size,
    listType: _listType,
    LinkComponent: _LinkComponent,
  } = props;
  const { LinkComponent, selectedWhen, listType } = useList();
  const { mounted } = useMounted();
  const isClickable = !disabled;
  const Component = (
    !!href ? (_LinkComponent ?? LinkComponent) : "div"
  ) as ElementType;
  const ListComponent: "ol" | "ul" = ordered ? "ol" : "ul";
  const selected = _selected || selectedWhen?.(props);

  const [collapsed, setCollapsed] = useLocalStorage(
    `${id}-collapsed`,
    _collapsed,
    {
      initializeWithValue: true,
    },
  );
  function handleClick(e: MouseEvent) {
    if (disabled) return;
    if (href || onClick) {
      onClick?.(e);
    } else {
      setCollapsed(!collapsed);
    }
  }
  if (!mounted) return null;
  return (
    <li
      className={cn(styles.root, collapsed && styles.collapsed)}
      data-color={color}
      data-size={size}
      data-slot={"list-item"}
      data-selected={selected}
    >
      <Component
        className={cn(
          styles.surface,
          disabled && styles.disabled,
          isClickable && styles.isClickable,
        )}
        onClick={handleClick}
        href={href}
      >
        {icon && <span className={cn(styles.icon)}>{icon}</span>}
        <span className={cn(styles.content)}>{children}</span>
        <span className={cn(styles.action)}>
          <button
            className={cn(styles.dropdownToggle)}
            type="button"
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCollapsed(!collapsed);
            }}
          >
            <ListDropDownIcon collapsed={collapsed} />
          </button>
        </span>
      </Component>
      {!!nodes?.length && (
        <ListComponent
          className={cn(styles.sublist)}
          style={{ listStyleType: _listType || listType }}
        >
          {nodes.map((n, i) => (
            <ListItem key={i} {...n} />
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
    action,
    disabled,
    onClick,
    selected: _selected,
    color,
    size,
    LinkComponent: _LinkComponent,
  } = props;
  const { LinkComponent, selectedWhen } = useList();
  const isClickable = !!href || !!onClick;
  const Component = (
    !!href ? (_LinkComponent ?? LinkComponent) : "div"
  ) as ElementType;
  const selected = _selected || selectedWhen?.(props);

  function handleClick(e: MouseEvent) {
    if (!isClickable) return;
    onClick?.(e);
  }

  return (
    <li
      className={cn(styles.root)}
      data-color={color}
      data-size={size}
      data-slot={"list-item"}
      data-selected={selected}
    >
      <Component
        className={cn(
          styles.surface,
          disabled && styles.disabled,
          isClickable && styles.isClickable,
        )}
        onClick={handleClick}
        href={href}
      >
        {icon && <span className={cn(styles.icon)}>{icon}</span>}
        <span className={cn(styles.content)}>{children}</span>
        {action && <span className={cn(styles.action)}>{action}</span>}
      </Component>
    </li>
  );
}
