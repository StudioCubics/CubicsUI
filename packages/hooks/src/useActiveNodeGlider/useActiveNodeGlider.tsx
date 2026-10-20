import type { SetState } from "@cubicsui/types";
import { useGlider, type UseGliderReturn } from "../useGlider/useGlider";
import { useState, useEffect } from "react";

export interface UseActiveNodeGliderReturn extends UseGliderReturn {
  setActiveNode: SetState<Element | null>;
  activeNode: Element | null;
}

/** Glider that returns active node along with it */
export function useActiveNodeGlider(
  element: string,
): UseActiveNodeGliderReturn {
  const [activeNode, setActiveNode] = useState<Element | null>(null);
  const { gliderRef, rootRef } = useGlider(
    (glider, rootRect, scrollLeft, scrollTop) => {
      if (!activeNode) {
        glider.style.opacity = "0";
        glider.style.scale = "1 0";
        glider.style.left = "0";
        return;
      }
      const rect = activeNode.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(activeNode);
      const borderRadius = computedStyle.borderRadius;
      glider.style.position = "absolute";
      glider.style.opacity = "1";
      glider.style.scale = "1 1";
      glider.style.width = `${rect.width}px`;
      glider.style.height = `${rect.height}px`;
      glider.style.left = `${rect.left - rootRect.left + scrollLeft}px`;
      glider.style.top = `${rect.top - rootRect.top + scrollTop}px`;
      glider.style.borderRadius = borderRadius;
    },
    [activeNode],
  );
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateActiveNode = () => {
      const activeNodes = root.querySelectorAll("[data-active='true']");
      const newActiveNode =
        activeNodes.length > 0
          ? activeNodes.item(activeNodes.length - 1)
          : null;
      if (!newActiveNode) {
        setActiveNode(null);
        return;
      }
      let parent: HTMLElement | null =
        newActiveNode.parentElement?.closest(element) ?? null;
      let outermostCollapsedAncestor: HTMLElement | null = null;
      while (parent && parent !== root) {
        if (parent.dataset.collapsed === "true") {
          outermostCollapsedAncestor = parent;
        }
        parent = parent.parentElement?.closest(element) ?? null;
      }
      setActiveNode(outermostCollapsedAncestor ?? newActiveNode);
    };
    updateActiveNode();
    const observer = new MutationObserver(updateActiveNode);
    observer.observe(root, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-active", "data-expanded"],
    });

    return () => observer.disconnect();
  }, [rootRef]);
  return { gliderRef, rootRef, setActiveNode, activeNode };
}
