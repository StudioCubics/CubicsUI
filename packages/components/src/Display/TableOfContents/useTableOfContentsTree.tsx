"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  TableOfContentsTree,
  TocItem,
  UseTableOfContentsOptions,
  UseTableOfContentsReturn,
} from "./TableOfContents.types";

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

/** Builds a flat TOC tree from the headings inside the container */
const buildTree = (
  container: HTMLElement,
  selector: string,
): TableOfContentsTree => {
  const headings = Array.from(
    container.querySelectorAll<HTMLElement>(selector),
  );
  const tree: TocItem[] = [];
  const usedIds = new Set<string>();

  // Stack of ancestors: depth + href + numbering counter
  const stack: { depth: number; href: string; numbering: number[] }[] = [];
  // Sibling counters per parent href ("" = root)
  const counters = new Map<string, number>();

  for (const el of headings) {
    const value = el.textContent?.trim() ?? "";
    if (!value) continue;

    const depth = Number(el.tagName.slice(1)) || 1;

    // Ensure a unique id on the heading so the href resolves
    let id = el.id || slugify(value) || "heading";
    if (!el.id) {
      let unique = id;
      let i = 1;
      while (usedIds.has(unique) || document.getElementById(unique)) {
        unique = `${id}-${i++}`;
      }
      id = unique;
      el.id = id;
    }
    usedIds.add(id);

    // Pop ancestors that are not shallower than the current heading
    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();

    const parentEntry = stack[stack.length - 1];
    const parent = parentEntry?.href ?? "";
    const count = (counters.get(parent) ?? 0) + 1;
    counters.set(parent, count);

    const numbering = [...(parentEntry?.numbering ?? []), count];
    const href = `#${id}`;

    tree.push({ value, href, depth, numbering, parent });
    stack.push({ depth, href, numbering });
  }

  return tree;
};

export function useTableOfContentsTree<T extends HTMLElement = HTMLElement>(
  options: UseTableOfContentsOptions = {},
): UseTableOfContentsReturn<T> {
  const { selector = "h1, h2, h3, h4, h5, h6" } = options;
  const ref = useRef<T | null>(null);
  const [tree, setTree] = useState<TableOfContentsTree>([]);

  const update = useCallback(() => {
    if (!ref.current) return;
    setTree((prev) => {
      if (!ref.current) return prev;
      const next = buildTree(ref.current, selector);
      if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
      return next;
    });
  }, [selector]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    update();

    // Rebuild when headings are added, removed or their text changes
    const observer = new MutationObserver(update);
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [update]);

  return { ref, tree };
}
