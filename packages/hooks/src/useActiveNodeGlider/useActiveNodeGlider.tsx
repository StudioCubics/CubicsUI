import type { SetState } from "@cubicsui/types";
import { useEffect, useState } from "react";
import { type UseGliderReturn, useGlider } from "../useGlider/useGlider";

export interface UseActiveNodeGliderReturn extends UseGliderReturn {
  setActiveNode: SetState<Element | null>;
  activeNode: Element | null;
}

export interface UseActiveNodeGliderOptions {
  /** Attributes (besides data-active) that trigger a re-resolve when mutated */
  observeAttributes?: string[];
  /** Maps the raw active node to the node the glider should actually target */
  resolveActiveNode?: (
    activeNode: Element,
    root: HTMLElement,
  ) => Element | null;
}

/** Glider that returns active node along with it */
export function useActiveNodeGlider(
  options: UseActiveNodeGliderOptions = {},
): UseActiveNodeGliderReturn {
  const { observeAttributes, resolveActiveNode } = options;
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
      setActiveNode(resolveActiveNode?.(newActiveNode, root) ?? newActiveNode);
    };
    updateActiveNode();
    const observer = new MutationObserver(updateActiveNode);
    observer.observe(root, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-active", ...(observeAttributes ?? [])],
    });

    return () => observer.disconnect();
  }, [rootRef, observeAttributes, resolveActiveNode]);
  return { gliderRef, rootRef, setActiveNode, activeNode };
}
