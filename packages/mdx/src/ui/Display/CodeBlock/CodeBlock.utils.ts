// line height at fontSize 14 is ~19px in monaco's default; used to size the editor to its content
const LINE_HEIGHT = 19;

export function getCodeHeight(code: string) {
  // should return with height + --gap-2 padding block
  return `calc(${code.split("\n").length * LINE_HEIGHT}px + 2 * var(--gap-3))`;
}
/** Monaco shares one model per `path`, so untitled blocks need a unique id */
export function hashCode(code: string) {
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = (Math.imul(31, hash) + code.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}
