import { cn } from "@cubicsui/utils";
import type { ElementType, MouseEvent, ReactElement } from "react";
import { useList } from "../List";
import type { ListItemTypeItemProps } from "../List.types";
import styles from "./ListItem.module.css";

export function ListItemTypeItem<H extends string = string>(
  props: ListItemTypeItemProps<H>,
): ReactElement {
  const {
    className,
    href,
    disabled,
    children,
    icon,
    actions,
    onlyIcon,
    beforeSurface,
    afterSurface,
    selected: _selected,
    color: _color,
    size: _size,
    LinkComponent: _LinkComponent,
    slotProps = {},
    onClick,
    onRootClick,
    ...rest
  } = props;
  const { LinkComponent, selectedWhen, size, color } = useList();
  const isClickable = !!href || !!onClick;
  const Component = (
    href ? (_LinkComponent ?? LinkComponent) : "div"
  ) as ElementType;
  const active = _selected ?? selectedWhen?.(props);

  function handleSurfaceClick(
    e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLDivElement>,
  ) {
    if (!isClickable) return;
    onClick?.(e);
  }

  return (
    <li
      className={cn(className, styles.root)}
      data-color={_color || color}
      data-size={_size || size}
      onClick={onRootClick}
      {...rest}
    >
      {beforeSurface}
      <Component
        {...slotProps.surface}
        className={cn(
          slotProps.surface?.className,
          styles.surface,
          disabled && styles.disabled,
          isClickable && styles.isClickable,
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
        {actions && !onlyIcon && (
          <span
            {...slotProps.action}
            className={cn(slotProps.action?.className, styles.action)}
          >
            {actions}
          </span>
        )}
      </Component>
      {afterSurface}
    </li>
  );
}
