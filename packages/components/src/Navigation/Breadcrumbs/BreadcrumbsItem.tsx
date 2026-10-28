"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import {
  cloneElement,
  type ElementType,
  isValidElement,
  type MouseEvent,
} from "react";
import type { BreadcrumbsItemProps } from "./Breadcrumbs.types";

function BreadcrumbsItemBase<C extends ElementType = "span">(
  props: BreadcrumbsItemProps<C>,
) {
  const { as, children, className, onClick, ...rest } =
    props as BreadcrumbsItemProps<"span">;
  const Component = (as || "span") as ElementType;

  // The child itself becomes the item
  if (!as && isValidElement<BreadcrumbsItemProps>(children)) {
    return cloneElement(children, {
      ...rest,
      className: cn(children.props.className, className),
      onClick: (e: MouseEvent<HTMLElement>) => {
        children.props.onClick?.(e);
        onClick?.(e);
      },
    });
  }

  return (
    <Component {...rest} className={className} onClick={onClick}>
      {children}
    </Component>
  );
}

BreadcrumbsItemBase.displayName = "BreadcrumbsItem";

/**
 * A polymorphic breadcrumbs item component.
 * By default it renders a `<span>`, but any element can be used via the `as` prop.
 *
 * ```tsx
 * <BreadcrumbsItem as="a" href="/docs">...</BreadcrumbsItem>
 * ```
 */
export const BreadcrumbsItem = BreadcrumbsItemBase as PolymorphicComponentType<
  object,
  "span"
>;
