import fs from "node:fs";
import path from "node:path";
import {
  cn,
  EXTENSION_TO_LANGUAGE_IDENTIFIER,
  indentLines,
  toJsxAttrs,
} from "@cubicsui/utils";
import type { MDXTagTransformer } from "../../types.js";

export interface SignatureOptions {
  start?: string;
  end?: string;
}

export interface ParsedFile {
  meta: Record<string, unknown> | null;
  content: string;
}

const DEFAULTS: Required<SignatureOptions> = {
  start: "#@SANDCUBE_START",
  end: "#@SANDCUBE_END",
};

/**
 * Reads any file, finds the first start tag, takes everything up to the
 * end tag, and parses it as key/value pairs ("key: value" or "key = value").
 * Returns the meta object and the file content with the block removed.
 */
export function readFrontMatter(
  text: string,
  opts: SignatureOptions = {},
): ParsedFile {
  const { start, end } = { ...DEFAULTS, ...opts };

  const startIdx = text.indexOf(start);
  if (startIdx === -1) return { meta: null, content: text };

  const bodyStart = startIdx + start.length;
  const endIdx = text.indexOf(end, bodyStart);
  if (endIdx === -1) return { meta: null, content: text };

  // Parse everything between the tags
  const meta: Record<string, string | boolean> = {};
  for (const line of text.slice(bodyStart, endIdx).split(/\r?\n/)) {
    // optional leading non-word prefix (//, #, *, --) is skipped, key must be an identifier-like token
    const m = line.match(/^\s*(?:[^\w\s]+\s*)?([\w.-]+)\s*[:=]\s*(.*?)\s*$/);
    const key = m?.[1];
    const raw = m?.[2];
    if (key === undefined || raw === undefined) continue;

    const value = raw.replace(/^(["'])(.*)\1$/, "$2"); // strip wrapping quotes
    meta[key] = value === "true" ? true : value === "false" ? false : value;
  }

  // Remove whole lines from the start tag's line through the end tag's line,
  // which also drops any comment opener/closer sitting on those lines
  const removeFrom = text.lastIndexOf("\n", startIdx) + 1;
  const nl = text.indexOf("\n", endIdx + end.length);
  const removeTo = nl === -1 ? text.length : nl + 1;

  return { meta, content: text.slice(0, removeFrom) + text.slice(removeTo) };
}

export interface AutoSandcubeTransformerAttrs {
  title: string;
  src: string;
  [key: string]: unknown;
}

function listFilesRecursive(
  dirPath: string,
  baseDir: string = dirPath,
): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return listFilesRecursive(entryPath, baseDir);
    }
    return [path.relative(baseDir, entryPath).split(path.sep).join("/")];
  });
}

/**
 * Transforms this
 *
 * `<auto-sandcube src="./playground" title="Button Playground" />`
 *
 * to this
 *
 * ```tsx
 * <Sandcube title="Button Playground">
 *     <SandcubeFile path="/App.tsx">
 *       ```tsx
 *       import { content } from "./data";
 *       import { Button } from "@cubicsui/components";
 *       export default function Home() {
 *         return (
 *           <div>
 *             <Button variant="contained">{content}</Button>
 *           </div>
 *         );
 *       }
 *
 *       ```
 *     </SandcubeFile>
 *     <SandcubeFile path="/data.ts">
 *       ```ts
 *       export const content = "Button Content";
 *
 *       ```
 *     </SandcubeFile>
 * </Sandcube>
 * ```
 *
 * Pass props to each SandcubeFile like this
 * ```html
 * <!-- #@SANDCUBE_START
 * readOnly: true
 * #@SANDCUBE_END -->
 * <html>...</html>
 * ```
 * works with any language make sure to wrap with comments
 * ```jsx
 * // #@SANDCUBE_START
 * // hidden: true
 * // #@SANDCUBE_END -->
 * const C=()=><div/>
 * ```
 * @param {AutoSandcubeTransformerAttrs} attrs requires src and title
 *
 */
export const autoSandcubeTransformer: MDXTagTransformer = (
  attrs,
  mdxPath,
  _,
) => {
  if (!attrs.src || !attrs.title) {
    console.warn(
      `<auto-sandcube/> Missing required attrs in ${mdxPath}: ${cn(attrs.src, attrs.title)}`,
    );
    return "";
  }
  const { src, title, baseDir } = attrs;
  const absoluteSrcPath = path.resolve(path.dirname(mdxPath), src);
  if (
    !fs.existsSync(absoluteSrcPath) ||
    !fs.statSync(absoluteSrcPath).isDirectory()
  ) {
    console.warn(`<auto-sandcube/> Source not found: ${absoluteSrcPath}`);
    return "";
  }
  function formatter(rootDir: string, relativeFilePath: string) {
    const content = fs.readFileSync(
      path.join(rootDir, relativeFilePath),
      "utf-8",
    );
    const ext = path.extname(relativeFilePath);
    const language =
      EXTENSION_TO_LANGUAGE_IDENTIFIER[ext] ?? ext.replace(".", "");

    const { meta, content: cleanContent } = readFrontMatter(content);
    const indentedContent = indentLines(cleanContent, "      ");
    const SCFileProps = toJsxAttrs({
      path: `/${relativeFilePath}`,
      ...meta,
    });
    return `    <SandcubeFile ${SCFileProps}>
      \`\`\`${language}
${indentedContent}
      \`\`\`
    </SandcubeFile>`;
  }

  const children = listFilesRecursive(absoluteSrcPath, baseDir)
    .filter((p) => p !== "config.json")
    .map((p) => formatter(absoluteSrcPath, p))
    .join("\n");

  const SCProps = toJsxAttrs({
    title,
  });

  return `<Sandcube ${SCProps}>
${children}
</Sandcube>`;
};
