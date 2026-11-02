"use client";

import type { ListDefaultHrefType, ListItemProps } from "@cubicsui/components";
import { createContext, useContext } from "react";
import type { MDXPageTreeProviderProps } from "../../mdxLoader/mdxLoader.types";

const MDXPageTreeContext = createContext<ListItemProps[] | null>(null);

export function MDXPageTreeProvider<T extends ListDefaultHrefType>({
  tree,
  children,
}: MDXPageTreeProviderProps<T>) {
  return (
    <MDXPageTreeContext.Provider value={tree}>
      {children}
    </MDXPageTreeContext.Provider>
  );
}

export function useMDXPageTree<T extends ListDefaultHrefType>() {
  const ctx = useContext(MDXPageTreeContext);
  if (!ctx) throw new Error("usePageTree must be used within PageTreeProvider");
  return ctx as ListItemProps<T>[];
}
