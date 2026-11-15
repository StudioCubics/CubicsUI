import type { ComponentPropsWithRef, ElementType, ReactElement } from "react";

/**
 * Adds an optional `as` prop to specify the underlying HTML element or React component to render.
 *
 * @template C - The element type or component to render as.
 */
export type AsProp<C extends ElementType> = {
  /**
   * The HTML tag or custom React component to render as.
   */
  as?: C;
};

/**
 * Combines custom component props with the native props of the target element `C`,
 * omitting any conflicting keys from the underlying element.
 *
 * @template C - The element type or component passed to the `as` prop.
 * @template Props - Custom props specific to the component.
 */
export type PolymorphicComponentProps<
  C extends ElementType,
  Props = object,
> = AsProp<C> & Omit<ComponentPropsWithRef<C>, keyof Props | "as"> & Props;

/**
 * Represents a polymorphic React component type that infers native attributes and ref types
 * dynamically from the `as` prop, falling back to `DefaultElement` when `as` is omitted.
 *
 * @template Props - Custom props accepted by the component.
 * @template DefaultElement - The default HTML tag or component used when `as` is not provided. Defaults to `"div"`.
 */
export type PolymorphicComponentType<
  Props,
  DefaultElement extends ElementType = "div",
> = <C extends ElementType = DefaultElement>(
  props: PolymorphicComponentProps<C, Props>,
) => ReactElement | null;
