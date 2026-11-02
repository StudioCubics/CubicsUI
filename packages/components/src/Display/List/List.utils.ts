// Module-level so references are stable across renders
export const LIST_OBSERVED_ATTRIBUTES: string[] = ["data-collapsed"];

// If the active node sits inside collapsed ancestors, glide to the outermost collapsed one
export function resolveCollapsedAncestor(
  activeNode: Element,
  root: HTMLElement,
): Element {
  let parent: HTMLElement | null =
    activeNode.parentElement?.closest("li") ?? null;
  let outermostCollapsedAncestor: HTMLElement | null = null;
  while (parent && parent !== root) {
    if (parent.dataset.collapsed === "true") {
      outermostCollapsedAncestor = parent;
    }
    parent = parent.parentElement?.closest("li") ?? null;
  }
  return outermostCollapsedAncestor ?? activeNode;
}
