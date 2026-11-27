import { DropDownIcon } from "@cubicsui/icons";
import { cn } from "@cubicsui/utils";
import type { ElementType, MouseEvent, ReactElement } from "react";
import { useList } from "../List";
import type { ListItemTypeCollapsibleProps } from "../List.types";
import { ListItem } from "./ListItem";
import styles from "./ListItem.module.css";

export function ListItemTypeCollapsible<H extends string = string>(
  props: ListItemTypeCollapsibleProps<H>,
): ReactElement | null {
  const {
    id,
    className,
    ordered,
    nodes,
    defaultCollapsed,
    href,
    disabled,
    children,
    icon,
    onlyIcon,
    beforeSurface,
    afterSurface,
    selected: _selected,
    color: _color,
    size: _size,
    dropdownIcon,
    listType: _listType,
    LinkComponent: _LinkComponent,
    slotProps = {},
    onClick,
    onCollapsed,
    onRootClick,
    ...rest
  } = props;
  const {
    LinkComponent,
    selectedWhen,
    listType,
    getCollapsed,
    toggleCollapsed,
    color,
    size,
  } = useList();
  const Component = (
    href ? (_LinkComponent ?? LinkComponent) : "div"
  ) as ElementType;
  const ListComponent: "ol" | "ul" = ordered ? "ol" : "ul";
  const active = _selected || selectedWhen?.(props);
  const collapsed = getCollapsed(id, defaultCollapsed);

  function handleDropdownToggleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    handleCollapse();
    slotProps.dropdownToggle?.onClick?.(e);
  }

  function handleCollapse() {
    toggleCollapsed(id, collapsed);
    onCollapsed?.();
  }
  function handleSurfaceClick(
    e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLDivElement>,
  ) {
    if (disabled) return;
    if (href || onClick) {
      onClick?.(e);
    } else {
      handleCollapse();
    }
  }

  return (
    <li
      {...rest}
      id={id}
      className={cn(className, styles.root)}
      data-color={_color || color}
      data-size={_size || size}
      data-collapsed={collapsed}
      onClick={onRootClick}
      suppressHydrationWarning
    >
      {beforeSurface}
      <Component
        {...slotProps.surface}
        className={cn(
          slotProps.surface?.className,
          styles.surface,
          disabled && styles.disabled,
        )}
        data-active={active}
        onClick={handleSurfaceClick}
        href={href}
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
              onClick={handleDropdownToggleClick}
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
      {afterSurface}
    </li>
  );
}
