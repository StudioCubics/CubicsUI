"use client";

import { deepMerge } from "@cubicsui/utils";
import {
  type ComponentProps,
  createContext,
  type JSXElementConstructor,
  type ReactElement,
  type ReactNode,
  useContext,
  useMemo,
} from "react";

// biome-ignore lint/suspicious/noExplicitAny: must accept any component
type AnyComponent = JSXElementConstructor<any>;

export type DefaultPropsEntry = readonly [
  component: AnyComponent,
  props: object,
];
type DefaultPropsMap = ReadonlyMap<AnyComponent, object>;

const DefaultPropsContext = createContext<DefaultPropsMap>(new Map());

/** Type-safe entry builder: props are checked against the component's own props. */
export function defineDefaultProps<T extends AnyComponent>(
  component: T,
  props: Partial<ComponentProps<T>>,
): DefaultPropsEntry {
  return [component, props];
}

export interface DefaultPropsProviderProps {
  /** Keep this reference stable (module constant or useMemo) to avoid re-renders. */
  defaults: readonly DefaultPropsEntry[];
  children?: ReactNode;
}

export function DefaultPropsProvider(
  props: DefaultPropsProviderProps,
): ReactElement {
  const { defaults, children } = props;
  const parent = useContext(DefaultPropsContext);

  const value = useMemo(() => {
    const map = new Map(parent);
    for (const [component, componentProps] of defaults) {
      // Nested providers merge with, and override, the parent's defaults
      map.set(component, deepMerge([map.get(component), componentProps]));
    }
    return map;
  }, [parent, defaults]);

  return (
    <DefaultPropsContext.Provider value={value}>
      {children}
    </DefaultPropsContext.Provider>
  );
}

/** Returns props merged over the inherited defaults. Explicit `undefined` does not override a default. */
export function useDefaultProps<T extends AnyComponent>(
  component: T,
  props: ComponentProps<T>,
): ComponentProps<T> {
  const defaults = useContext(DefaultPropsContext).get(component);
  if (!defaults) return props;
  return deepMerge<ComponentProps<T>>([defaults, props]);
}
