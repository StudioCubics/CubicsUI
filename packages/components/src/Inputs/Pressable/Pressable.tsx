"use client";
import { useId } from "@cubicsui/hooks";
import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn, mergeRefs } from "@cubicsui/utils";
import { type ElementType, type ReactElement, useRef } from "react";
import { useRipple } from "../../Misc/Ripple/Ripple";
import styles from "./Pressable.module.css";
import type { PressableBaseProps, PressableProps } from "./Pressable.types";

function PressableBase<T extends ElementType = "div">(
  props: PressableProps<T>,
): ReactElement {
  const {
    as,
    ref,
    className,
    children,
    disabled,
    onClick,
    onKeyDown,
    onKeyUp,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    id,
    slotProps = {},
    ...rest
  } = props;
  const Component = as || "div";
  const isNativeButton = Component === "button";
  const contentId = useId(id);
  const containerRef = useRef<HTMLElement>(null);
  const { createRipple, rippleElements } = useRipple(
    slotProps.ripple,
    containerRef,
  );

  // Name comes from aria-label, or falls back to the (inert) content
  const labelledBy = ariaLabel || ariaLabelledBy ? ariaLabelledBy : contentId;
  const hasHref = "href" in rest;
  return (
    <Component
      ref={mergeRefs(ref, containerRef)}
      role={isNativeButton || hasHref ? undefined : "button"}
      tabIndex={isNativeButton ? undefined : disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      aria-disabled={disabled || undefined}
      className={cn(className, styles.root, disabled && styles.disabled)}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        createRipple(e);
        onClick?.(e);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        onKeyDown?.(e);
        if (isNativeButton || hasHref || disabled) return;
        // Enter activates on keydown, Space on keyup (native button behavior)
        if (e.key === "Enter" && !e.repeat) {
          e.preventDefault();
          createRipple(e as unknown as React.MouseEvent<HTMLElement>);
          e.currentTarget.click();
        } else if (e.key === " ") {
          e.preventDefault(); // stop page scroll
        }
      }}
      onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => {
        onKeyUp?.(e);
        if (isNativeButton || hasHref || disabled) return;
        if (e.key === " ") {
          e.preventDefault();
          createRipple(e as unknown as React.MouseEvent<HTMLElement>);
          e.currentTarget.click();
        }
      }}
      {...rest}
    >
      <span
        {...slotProps.content}
        id={contentId}
        inert
        className={cn(slotProps.content?.className, styles.content)}
      >
        {children}
      </span>
      {rippleElements}
    </Component>
  );
}
PressableBase.displayName = "Pressable";

/**
 * Makes any content behave as a single, accessible button.
 *
 * The children keep their look but become inert, so only the props set on
 * `Pressable` (`onClick`, `disabled`, etc.) are interactive. The whole area
 * shows a pointer cursor, a ripple on activation, and supports keyboard
 * activation with Enter and Space.
 *
 * Because children are inert, screen readers only see the `Pressable` itself.
 * Pass an `aria-label` describing the action so it has a reliable accessible
 * name.
 *
 * @example
 * ```tsx
 * <Pressable onClick={openProfile} aria-label="Open Jane Doe's profile">
 *   <Card>Jane Doe</Card>
 * </Pressable>
 * ```
 *
 * @example
 * ```tsx
 * // Render as another element or component
 * <Pressable onClick={() => console.log("hello")}>
 *   <TextInput label="Name" placeholder="Click anywhere" />
 * </Pressable>
 * ```
 */
export const Pressable =
  PressableBase as PolymorphicComponentType<PressableBaseProps>;
