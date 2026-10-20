/**
 * Use as placeholder when some function is not implemented yet
 */
export function notImplemented(): never {
  const lines = new Error().stack?.split("\n").map((l) => l.trim()) ?? [];
  // V8 prefixes the stack with "Error", Firefox/Safari don't
  const frames = lines[0]?.startsWith("Error") ? lines.slice(1) : lines;
  // frames[0] = this function, frames[1] = the caller
  // V8 adds "[as getOpen]" when called through a differently named property
  const alias = frames[0]?.match(/\[as ([^\]]+)\]/)?.[1];
  const caller = frames[1];

  console.warn(
    `Function${alias ? ` "${alias}"` : ""} not implemented.${
      caller ? `\n  check ${caller}` : ""
    }`,
  );
  return undefined as never;
}
