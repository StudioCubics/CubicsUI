import type { Root } from "mdast";
import { noScriptsWalk } from "./remarkNoScript.utils";
/**
 * Remark plugin that rejects executable JS in MDX, so untrusted content can't run code on the server.
 *
 * Throws on `import`/`export`, `{expressions}` and attribute expressions (`onClick={...}`, `{...props}`).
 * Literal attributes (`<Sandcube title="x" hidden />`) and fenced code blocks are unaffected.
 *
 * @returns A remark transformer that throws if the tree contains a script.
 */
export default function remarkNoScripts() {
  return (tree: Root) => noScriptsWalk(tree);
}
