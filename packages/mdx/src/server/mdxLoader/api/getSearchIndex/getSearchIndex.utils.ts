import GithubSlugger from "github-slugger";

export const stripMarkdown = (s: string) =>
  s
    // --- Remove non-content blocks ---
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "") // MDX comments: {/* ... */}
    .replace(/<!--[\s\S]*?-->/g, "") // HTML comments: <!-- ... -->
    .replace(/^(import|export)\s.+$/gm, "") // MDX import/export statements
    .replace(/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/gm, "") // table separator rows: |---|---|
    // .replace(/^\s*\|.*\|\s*$/gm, (row) => row.replace(/\|/g, " ")) // table rows → plain cells
    .replace(/^\s*([-*_])\1{2,}\s*$/gm, "") // horizontal rules: ---, ***, ___

    // --- Unwrap markup, keep the readable text ---
    .replace(/^\s*>\s*\[!\w+\][^\S\n]*/gm, "") // callout marker: `> [!NOTE] Title` → `Title`
    .replace(/<[^>]+>/g, " ") // JSX/HTML tags → space
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images: ![alt](src) → alt
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links: [text](url) → text
    .replace(/[*_`>#~]/g, "") // leftover inline syntax: bold, italic, code, quotes, headings, strikethrough

    // --- Normalize whitespace ---
    .replace(/[^\S\n]+/g, " ") // collapse spaces/tabs, keep newlines
    .replace(/ ?\n ?/g, "\n") // trim spaces around newlines
    .replace(/\n{3,}/g, "\n\n") // allow at most one blank line
    .trim();

/** Splits an MDX body into one chunk per heading, ids match rehype-slug */
export function chunkBody(body: string) {
  const slugger = new GithubSlugger(); // same slugger rehype-slug uses
  const chunks: { heading: string; id: string; content: string }[] = [];
  let cur = { heading: "", id: "", lines: [] as string[] };
  let inFence = false;

  const flush = () => {
    const content = stripMarkdown(cur.lines.join("\n"));
    if (content || cur.heading) {
      chunks.push({ heading: cur.heading, id: cur.id, content });
    }
  };

  for (const line of body.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue; // code blocks are excluded from the index
    }
    if (inFence) continue;
    const m = /^#{1,6}\s+(.+)$/.exec(line);
    if (m) {
      flush();
      const heading = stripMarkdown(m[1]);
      cur = { heading, id: slugger.slug(heading), lines: [] };
    } else {
      cur.lines.push(line);
    }
  }
  flush();
  return chunks;
}
