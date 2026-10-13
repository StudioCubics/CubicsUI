import fs from "fs";
import path from "path";
import type { MDXTagTransformer } from "../../types.js";
import {
  cn,
  EXTENSION_TO_LANGUAGE_IDENTIFIER,
  indentLines,
  toJsxAttrs,
} from "@cubicsui/utils";

const HIDDEN_FILE_REGEX = /^[^/\\]+\.hidden\.[^./\\]+$/;
const READ_ONLY_FILE_REGEX = /^[^/\\]+\.readOnly\.[^./\\]+$/;

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
 * @param {AutoSandcubeTransformerAttrs} attrs
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

  function parser(rootDir: string, relativeFilePath: string) {
    const content = fs.readFileSync(
      path.join(rootDir, relativeFilePath),
      "utf-8",
    );
    const ext = path.extname(relativeFilePath);
    const language =
      EXTENSION_TO_LANGUAGE_IDENTIFIER[ext] ?? ext.replace(".", "");

    const indentedContent = indentLines(content, "      ");
    const SCFileProps = toJsxAttrs({
      path: `/${relativeFilePath}`,
      hidden: HIDDEN_FILE_REGEX.test(relativeFilePath),
      readOnly: READ_ONLY_FILE_REGEX.test(relativeFilePath),
    });
    return `    <SandcubeFile ${SCFileProps}>
      \`\`\`${language}
${indentedContent}
      \`\`\`
    </SandcubeFile>`;
  }

  const children = listFilesRecursive(absoluteSrcPath, baseDir)
    .filter((p) => p !== "config.json")
    .map((p) => parser(absoluteSrcPath, p))
    .join("\n");

  const SCProps = toJsxAttrs({
    title,
  });

  return `<Sandcube ${SCProps}>
${children}
</Sandcube>`;
};
