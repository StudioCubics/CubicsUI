import GithubSlugger from "github-slugger";

export const stripMarkdown = (s: string) =>
  s
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "") // MDX comments {/* ... */}
    .replace(/<!--[\s\S]*?-->/g, "") // HTML comments
    .replace(/^(import|export)\s.+$/gm, "") // MDX esm
    .replace(/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/gm, "") // table separator rows
    // .replace(/^\s*\|.*\|\s*$/gm, (row) => row.replace(/\|/g, " ")) // table rows → plain cells
    .replace(/^\s*([-*_])\1{2,}\s*$/gm, "") // horizontal rules
    .replace(/<[^>]+>/g, " ") // JSX tags
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images → alt text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text
    .replace(/[*_`>#~]/g, "")
    .replace(/[^\S\n]+/g, " ") // collapse spaces/tabs only, keep newlines
    .replace(/ ?\n ?/g, "\n") // trim spaces around newlines
    .replace(/\n{3,}/g, "\n\n") // max one blank line
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
