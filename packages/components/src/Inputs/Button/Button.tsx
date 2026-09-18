"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { type ElementType, type ReactElement } from "react";
import { eventWithRipple, useRipple } from "../../Misc/Ripple/Ripple";
import { cn } from "@cubicsui/utils";
import type { ButtonBaseProps, ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

function ButtonBase<C extends ElementType = "button">(
  props: ButtonProps<C>,
): ReactElement {
  const {
    as,
    className,
    children,
    variant,
    size = "md",
    color = "default",
    startIcon,
    endIcon,
    icon,
    align,
    fullWidth = false,
    onTouchStart,
    onClick,
    disabled,
    slotProps: _slotProps,
    ...restProps
  } = props as ButtonProps<"button">;
  const slotProps: NonNullable<ButtonBaseProps["slotProps"]> = _slotProps ?? {};
  const Component = (as || "button") as ElementType;
  const { rippleElements, createRipple } = useRipple(slotProps.ripple);

  const componentProps = {
    className: cn(
      className,
      styles.root,
      icon && styles.iconButton,
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      variant && styles[`variant_${variant}`],
      align && styles[`align_${align}`],
    ),
    onTouchStart: eventWithRipple(createRipple, onTouchStart),
    onClick: eventWithRipple(createRipple, onClick),
    "data-color": color,
    "data-size": size,
    disabled,
    ...restProps,
  };

  return (
    <Component {...componentProps}>
      {startIcon && (
        <span
          {...slotProps.startIcon}
          className={cn(styles.adornment, slotProps.startIcon?.className)}
        >
          {startIcon}
        </span>
      )}
      {children}
      {endIcon && (
        <span
          {...slotProps.endIcon}
          className={cn(styles.adornment, slotProps.endIcon?.className)}
        >
          {endIcon}
        </span>
      )}
      {rippleElements}
    </Component>
  );
}

ButtonBase.displayName = "Button";

/**
 * A polymorphic button component.
 * By default it renders a `<button>`, but any element can be used via the `as` prop.
 *
 * ```tsx
 * <Button as="a" href="/docs">...</Button>
 * ```
 */
export const Button = ButtonBase as PolymorphicComponentType<
  ButtonBaseProps,
  "button"
>;
