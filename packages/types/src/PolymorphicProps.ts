import type { ComponentPropsWithRef, ElementType, ReactElement } from "react";

export type AsProp<C extends ElementType> = {
  as?: C;
};

export type PolymorphicComponentProps<
  C extends ElementType,
  Props = object,
> = AsProp<C> & Omit<ComponentPropsWithRef<C>, keyof Props | "as"> & Props;

export type PolymorphicComponentType<
  Props,
  DefaultElement extends ElementType = "div",
> = <C extends ElementType = DefaultElement>(
  props: PolymorphicComponentProps<C, Props>,
) => ReactElement | null;
