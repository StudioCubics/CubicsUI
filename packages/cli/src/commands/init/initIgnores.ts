import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { filesToIgnore } from "@/constants/defaults.js";
import fs from "fs-extra";
import ignore from "ignore";
import { logger } from "@/main.js";

/**
 * Writes files to ignore to .gitignore and other ignore files if present
 * @returns void
 */
export default async function initIgnores() {
  const ignoreFilePath = resolve(process.cwd(), ".gitignore");

  let gitignoreContent = "";
  try {
    gitignoreContent = await readFile(ignoreFilePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      logger.warning(`.gitignore not found, creating one: ${ignoreFilePath}`);
      // Ensure the file exists
      await fs.ensureFile(ignoreFilePath);
    } else {
      throw error;
    }
  }

  const ig = ignore().add(gitignoreContent);
  const newEntries = filesToIgnore.filter((file) => !ig.ignores(file));

  if (newEntries.length === 0) {
    return;
  }

  const dataToAppend = `\n# Added by CubicsUI\n${newEntries.join("\n")}\n`;
  await writeFile(ignoreFilePath, gitignoreContent + dataToAppend, "utf8");
}
