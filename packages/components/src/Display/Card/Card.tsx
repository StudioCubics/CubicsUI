"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { Children, isValidElement, type ElementType } from "react";
import { cn } from "@cubicsui/utils";
import type { CardBaseProps, CardProps } from "./Card.types";
import styles from "./Card.module.css";

// CardBase.tsx
function CardBase<C extends ElementType = "div">(props: CardProps<C>) {
  const {
    as,
    className,
    variant = "contained",
    size = "md",
    fullWidth = false,
    fullHeight,
    fullScreen,
    square,
    disablePadding = false,
    fixedWidth,
    fixedHeight,
    elevation,
    style,
    ref: _ref,
    children,
    ...restProps
  } = props;
  const Component = (as || "div") as ElementType;

  // Split out the footer so it can render outside the opaque surface,
  // letting its backdrop-filter see through to whatever is behind the card.
  const childArray = Children.toArray(children);
  const footer = childArray.find(
    (child) =>
      isValidElement(child) &&
      (child.props as { "data-slot"?: string })["data-slot"] === "card_footer",
  );
  const rest = childArray.filter((child) => child !== footer);

  const componentProps = {
    className: cn(
      className,
      styles.root,
      fullWidth && styles.fullWidth,
      fullHeight && styles.fullHeight,
      fullScreen && styles.fullScreen,
      variant && styles[`variant_${variant}`],
    ),
    "data-size": size,
    style: {
      ...style,
      width: typeof fixedWidth === "string" ? fixedWidth : undefined,
      height: typeof fixedHeight === "string" ? fixedHeight : undefined,
    },
    ref: _ref,
    ...restProps,
  };
  if (footer)
    return (
      <Component {...componentProps}>
        <div
          className={cn(
            styles.surface,
            square && styles.square,
            disablePadding && styles.disablePadding,
            elevation && styles[`elevation_${elevation}`],
          )}
          data-size={size}
        >
          {rest}
        </div>
        {footer}
      </Component>
    );
  return (
    <Component
      {...componentProps}
      className={cn(
        componentProps.className,
        styles.surface,
        square && styles.square,
        disablePadding && styles.disablePadding,
        elevation && styles[`elevation_${elevation}`],
      )}
      data-size={size}
    >
      {rest}
    </Component>
  );
}

CardBase.displayName = "Card";

/**
 * A polymorphic Card component.
 *
 * By default it renders a `<Card>`, but any element can be used via the `as` prop:
 *
 * ```tsx
 * <Card as={GlassCard}>...</Card>
 * ```
 *
 */
export const Card = CardBase as PolymorphicComponentType<CardBaseProps, "div">;
