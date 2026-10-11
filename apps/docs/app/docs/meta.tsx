import type {
  ListItemProps,
  ListItemTypeCollapsibleProps,
} from "@cubicsui/components";
import {
  BrushIcon,
  CodeXMLIcon,
  ComponentIcon,
  FishingHookIcon,
  ToolCaseIcon,
} from "@cubicsui/icons";
import type { Route } from "next";
import type { ReactNode } from "react";

export type CubicsUISiteMapValue = {
  icon: ReactNode;
  label: string;
  pkg: string;
  meta: ListItemProps<Route>[];
};
export type CubicsUISiteMap = Record<string, CubicsUISiteMapValue>;

function getMeta(
  id: string,
  tree: ListItemProps<Route>[],
): ListItemProps<Route>[] {
  return (
    (tree.find((si) => si.id == id) as ListItemTypeCollapsibleProps<Route>)
      ?.nodes ?? []
  );
}
export const getSiteMap = (tree: ListItemProps<Route>[]): CubicsUISiteMap => {
  return {
    components: {
      icon: <ComponentIcon width="1em" />,
      label: "Components",
      pkg: "@cubicsui/components",
      meta: getMeta("components", tree),
    },
    hooks: {
      icon: <FishingHookIcon width="1em" />,
      label: "Hooks",
      pkg: "@cubicsui/hooks",
      meta: getMeta("hooks", tree),
    },
    icons: {
      icon: <BrushIcon width="1em" />,
      label: "Icons",
      pkg: "@cubicsui/icons",
      meta: getMeta("icons", tree),
    },
    mdx: {
      icon: <CodeXMLIcon width="1em" />,
      label: "MDX",
      pkg: "@cubicsui/mdx",
      meta: getMeta("mdx", tree),
    },
    types: {
      icon: <BrushIcon width="1em" />,
      label: "Types",
      pkg: "@cubicsui/types",
      meta: getMeta("types", tree),
    },
    utils: {
      icon: <ToolCaseIcon width="1em" />,
      label: "Utilities",
      pkg: "@cubicsui/utils",
      meta: getMeta("utils", tree),
    },
  };
};
