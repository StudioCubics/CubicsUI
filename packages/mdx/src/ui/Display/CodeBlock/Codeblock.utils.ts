// line height at fontSize 14 is ~19px in monaco's default; used to size the editor to its content
const LINE_HEIGHT = 19;

export function getCodeHeight(code: string) {
  // should return with height + --gap-2 padding block
  return `calc(${code.split("\n").length * LINE_HEIGHT}px + 2 * var(--gap-3))`;
}
