import fs from "fs";
import path from "path";
import type { MDXTagTransformer } from "../../types.js";
import { EXTENSION_TO_LANGUAGE_IDENTIFIER } from "@cubicsui/utils";

/**
 * Recursively lists all files in a directory, returning paths relative to
 * that directory with forward slashes (skips dotfiles).
 */
function listFilesRecursive(
  dirPath: string,
  baseDir: string = dirPath,
): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return entries
    .filter((entry) => !entry.name.startsWith("."))
    .flatMap((entry) => {
      const entryPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        return listFilesRecursive(entryPath, baseDir);
      }
      return [path.relative(baseDir, entryPath).split(path.sep).join("/")];
    });
}

/**
 * Reads optional config.json from the example dir, if present.
 * Returns {} on missing file or parse failure (with a warning on failure).
 * Untyped on purpose every key gets piped through as a prop, whatever it is.
 */
function readConfig(
  absoluteDirPath: string,
  mdxPath: string,
): Record<string, unknown> {
  const configPath = path.join(absoluteDirPath, "config.json");
  if (!fs.existsSync(configPath)) return {};

  try {
    const parsed = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      console.warn(
        `<auto-sandcube/> config.json must be a JSON object in ${mdxPath}`,
      );
      return {};
    }
    return parsed as Record<string, unknown>;
  } catch (err) {
    console.warn(
      `<auto-sandcube/> Failed to parse config.json in ${mdxPath}: ${err}`,
    );
    return {};
  }
}
/**
 * Indents every non-empty line of a multi-line string by the given prefix.
 * Used to keep fenced code block content aligned with its surrounding
 * markdown indentation, so markdown's dedent-on-fence-indent behavior
 * doesn't strip the original file's relative indentation.
 */
function indentLines(content: string, indent: string): string {
  return content
    .split("\n")
    .map((line) => (line.length > 0 ? indent + line : line))
    .join("\n");
}

/**
 * Serializes a props object into a JSX attribute string.
 * Strings become "value", everything else (number/boolean/object/array) becomes {expr}.
 */
function toJsxAttrs(props: Record<string, unknown>): string {
  return Object.entries(props)
    .map(([key, value]) =>
      typeof value === "string"
        ? `${key}="${value}"`
        : `${key}={${JSON.stringify(value)}}`,
    )
    .join(" ");
}

export const autoSandcubeTransformer: MDXTagTransformer = (
  attrs,
  mdxPath,
  _,
) => {
  const { dir, title } = attrs;
  if (!dir || !title) {
    console.warn(
      `<auto-sandcube/> Missing required attrs in ${mdxPath},\n ${!attrs.dir && "dir"}\n ${!attrs.title && "title"}`,
    );
    return "";
  }
  const absoluteDirPath = path.resolve(path.dirname(mdxPath), dir);

  if (
    !fs.existsSync(absoluteDirPath) ||
    !fs.statSync(absoluteDirPath).isDirectory()
  ) {
    console.warn(`<auto-sandcube/> Directory not found: ${absoluteDirPath}`);
    return "";
  }

  const config = readConfig(absoluteDirPath, mdxPath);

  // Pipe every config.json key through as a prop; only fall back on title if absent
  const sandcubeProps: Record<string, unknown> = {
    title,
    ...config,
  };

  // config.json is metadata only, exclude it from the rendered file list
  const relativeFilePaths = listFilesRecursive(absoluteDirPath).filter(
    (p) => p !== "config.json",
  );

  const sandcubeFiles = relativeFilePaths
    .map((relativeFilePath) => {
      const content = fs.readFileSync(
        path.join(absoluteDirPath, relativeFilePath),
        "utf-8",
      );
      const ext = path.extname(relativeFilePath);
      const language =
        EXTENSION_TO_LANGUAGE_IDENTIFIER[ext] ?? ext.replace(".", "");

      const indentedContent = indentLines(content, "      ");

      return `    <SandcubeFile path="/${relativeFilePath}">
      \`\`\`${language}
${indentedContent}
      \`\`\`
    </SandcubeFile>`;
    })
    .join("\n");

  return `<Sandcube ${toJsxAttrs(sandcubeProps)}>
${sandcubeFiles}
</Sandcube>`;
};
