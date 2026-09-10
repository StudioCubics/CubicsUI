"use client";

import { cn, mergeRefs } from "@cubicsui/utils";
import {
  createContext,
  useContext,
  type ReactElement,
  type Context,
} from "react";
import styles from "./List.module.css";
import type { ListContextProps, ListProps } from "./List.types";

export const ListContext: Context<ListContextProps | null> =
  createContext<ListContextProps | null>(null);

export function useList(): ListContextProps {
  let c = useContext(ListContext);
  if (!c) return {};
  return c;
}

export function List(props: ListProps): ReactElement {
  const {
    ordered,
    children,
    ref,
    className,
    slotProps = {},
    color,
    size,
    listType,
    style,
    selectedWhen,
    LinkComponent = "a",
    ...rest
  } = props;
  const Component: "ul" | "ol" = ordered ? "ol" : "ul";
  // TODO add collapsed tracking from context instead of ListItem

  return (
    <ListContext.Provider
      value={{
        selectedWhen,
        LinkComponent,
        color,
        size,
        listType,
      }}
    >
      <Component
        ref={mergeRefs(ref)}
        className={cn(styles.root, className)}
        data-color={color}
        data-size={size}
        style={{ ...style, listStyleType: listType }}
        {...rest}
      >
        {children}
      </Component>
    </ListContext.Provider>
  );
}
