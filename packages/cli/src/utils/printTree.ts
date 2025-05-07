import pc from "picocolors";
// ┬
// ─
// └
// │
// →
// ├

/**
 * Prints a tree based on depth of the provided object
 * @example
 * │
 * └┬→ ID: 681b96c73d1d8a7b20409720
 *  ├→ OutPath: components/check/check.tsx
 *  └→ Name: check
 *    │
 *    ├─┬→ ID: 681b96c73d1d8a7b20409725
 *    │ ├→ OutPath: components/extra/imported.ts
 *    │ └→ Name: imported
 *    │   │
 *    │   └┬→ ID: 681b96c73d1d8a7b20409727
 *    │    ├→ OutPath: components/extra/deeper.ts
 *    │    └→ Name: deeper
 *    │
 *    └┬→ ID: 681b96c73d1d8a7b20409729
 *     ├→ OutPath: components/extra/required.ts
 *     └→ Name: required
 */
export default function printTree(depth: number, obj: Record<string, string>) {
  const indentationLength = "   ";
  const keys = Object.keys(obj);

  let indentation = "";
  for (let index = 0; index < depth; index++) {
    indentation = indentation + indentationLength + "│";
  }

  const beginIndent = replaceLast(indentation, "│", "├");

  const suffixes = {
    beg: beginIndent + "┬" + "→",
    mid: indentation + "├" + "→",
    end: indentation + "└" + "→",
  };

  if (depth == 0) suffixes.beg = replaceLast(suffixes.beg, "┬", "├");

  console.log(depth == 0 ? "│" : indentation);

  keys.forEach((k, i) => {
    const suffix =
      i == 0
        ? suffixes.beg
        : i == keys.length - 1
          ? suffixes.end
          : suffixes.mid;
    console.log(suffix, `${pc.bold(k)}: ${obj[k]}`);
  });
}
function replaceLast(str: string, search: string, replace: string) {
  const index = str.lastIndexOf(search);
  if (index != -1) return str.slice(0, index) + replace + str.slice(index + 1);
  return str;
}
