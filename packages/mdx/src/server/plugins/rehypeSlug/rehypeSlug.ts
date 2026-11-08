import GithubSlugger from "github-slugger";
import type { Element, Nodes, Root } from "hast";
import type { RehypeSlugOptions } from "./rehypeSlug.types";
import { REHYPE_SLUG_HEADINGS, toText } from "./rehypeSlug.utils";

/** Adds github-style `id`s to headings, de-duplicating repeats (`intro`, `intro-1`) */
export default function rehypeSlug(options: RehypeSlugOptions = {}) {
  const { prefix = "" } = options;

  return (tree: Root) => {
    // Fresh slugger per document so duplicates are tracked per page
    const slugger = new GithubSlugger();

    function visit(node: Nodes) {
      if (node.type === "element") {
        const el = node as Element;
        // Keep ids that are already set manually
        if (REHYPE_SLUG_HEADINGS.has(el.tagName) && !el.properties?.id) {
          el.properties = {
            ...el.properties,
            id: prefix + slugger.slug(toText(el)),
          };
        }
      }
      if ("children" in node) node.children.forEach(visit);
    }

    visit(tree);
  };
}
