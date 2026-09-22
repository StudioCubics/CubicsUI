import { toCamelCase } from "@cubicsui/utils";
import type { Context, ComponentMetaCollapsible } from "../types.js";

/**
 * Gets or creates the collapsible meta node for a category. Merges
 * regardless of processing order. Pass `href` only when a real page.mdx
 * exists for the folder, orelse it stays href-less.
 */
export function upsertCategoryNode(
  category: string,
  title: string,
  context: Context,
  href?: string,
): ComponentMetaCollapsible {
  const slug = toCamelCase(category);

  let node = context.componentsMeta.find(
    (item): item is ComponentMetaCollapsible =>
      item.type === "collapsible" && item.id === slug,
  );

  if (!node) {
    node = {
      type: "collapsible",
      id: slug,
      children: title,
      ...(href ? { href } : {}),
      nodes: [],
    };
    context.componentsMeta.push(node);
  } else {
    node.children = title;
    if (href) node.href = href;
  }

  return node;
}
