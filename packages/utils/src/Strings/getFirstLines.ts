/** Keeps only the first `n` non-empty lines of the string provided */
export function getFirstLines(s: string, n = 2): string {
  const out: string[] = [];
  let start = 0;

  // Scan line by line and stop early
  while (out.length < n && start <= s.length) {
    let end = s.indexOf("\n", start);
    if (end === -1) end = s.length;
    const line = s.slice(start, end);
    if (line.trim()) out.push(line);
    start = end + 1;
  }

  return out.join("\n");
}
