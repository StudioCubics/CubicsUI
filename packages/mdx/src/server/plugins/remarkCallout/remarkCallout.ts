import type { MdNode } from "./remarkCallout.types";
import {
  calloutWalk,
  DEFAULT_REMARK_CALLOUT_TYPES,
} from "./remarkCallout.utils";

/**
 * Remark plugin that converts callout blockquotes into `<Callout />` MDX elements.
 *
 * A blockquote whose first line matches `> [!TYPE] optional title` (where TYPE is one of the allowed
 * callout types) is replaced with `<Callout type="type" title="Title">`. The marker line is stripped
 * from the content and the author's line breaks are preserved. Unknown types are left as normal blockquotes.
 *
 * @param options.types - Allowed callout types (lowercase). Defaults to `DEFAULT_CALLOUT_TYPES`.
 * @returns A remark transformer that mutates the mdast tree in place.
 *
 * @example
 * ```mdx
 * > [!NOTE] Heads up
 * > This renders as a Callout with type "note" and title "Heads up".
 * ```
 * ↓
 * ```html
 * <Callout type="note" title="Heads up">
 *  This renders as a Callout with type "note" and title "Heads up".
 * </Callout
 */
export default function remarkCallouts(options?: {
  types?: readonly string[];
}) {
  const types = options?.types ?? DEFAULT_REMARK_CALLOUT_TYPES;
  return (tree: MdNode) => calloutWalk(tree, types);
}
