"use client";

import { ChevronRightIcon, EllipsisIcon } from "@cubicsui/icons";
import { cn } from "@cubicsui/utils";
import { Fragment, isValidElement, type ReactElement } from "react";
import styles from "./Breadcrumbs.module.css";
import type { BreadcrumbsProps } from "./Breadcrumbs.types";
import { BreadcrumbsItem } from "./BreadcrumbsItem";
import { useBreadcrumbs } from "./useBreadcrumbs";

export function Breadcrumbs(props: BreadcrumbsProps): ReactElement {
  const {
    onChange,
    boundaryCount,
    siblingCount,
    children,
    defaultSelected,
    separator = <ChevronRightIcon className={styles.icon} />,
    ellipsis = <EllipsisIcon className={styles.icon} />,
    renderItem = (props) => <BreadcrumbsItem {...props} />,
    selectedWhen,
    size,
    color,
    className,
    ...rest
  } = props;
  const { items, activeCrumb, handleClick, expand } = useBreadcrumbs({
    crumbs: children,
    defaultSelected,
    selectedWhen,
    onChange,
    boundaryCount,
    siblingCount,
  });

  return (
    <div
      {...rest}
      className={cn(className, styles.root)}
      data-size={size}
      data-color={color}
    >
      {items.map((item, idx) => {
        const isEllipsis = item.type === "ellipsis";
        // Non-element children (strings, numbers) have no props
        const crumbProps =
          !isEllipsis && isValidElement(item.crumb)
            ? item.crumb.props
            : undefined;
        const isActive =
          !isEllipsis &&
          (selectedWhen
            ? crumbProps !== undefined && selectedWhen(crumbProps)
            : activeCrumb === item.index);
        const isClickable =
          isEllipsis ||
          Boolean(
            (crumbProps?.href || crumbProps?.onClick) && !crumbProps?.disabled,
          );
        return (
          <Fragment
            key={
              isEllipsis ? item.key : `crumb-${crumbProps?.id ?? item.index}`
            }
          >
            {renderItem({
              className: cn(
                styles.item,
                isActive && styles.active,
                isClickable && styles.clickable,
                isEllipsis && styles.ellipsis,
              ),
              onClick: isEllipsis
                ? () => expand(item.from)
                : () => handleClick(item.index),
              children: isEllipsis ? ellipsis : item.crumb,
            })}
            {idx !== items.length - 1 &&
              !isEllipsis &&
              items[idx + 1].type !== "ellipsis" &&
              separator}
          </Fragment>
        );
      })}
    </div>
  );
}
