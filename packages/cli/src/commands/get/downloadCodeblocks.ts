import { CUIConfig } from "@/types/cuiConfig.js";
import {
  ComponentDocument,
  CodeblockDocument,
  CodeblockModel,
} from "@cubicsui/db";
import { convertAbsToRelPath } from "@cubicsui/helpers";
import { dirname, join, resolve } from "path";
import fs from "fs-extra";
import { confirm } from "@inquirer/prompts";
import pc from "picocolors";

/**
 * Downloads and saves codeblocks associated with a given component to the specified output paths.
 *
 * @param component - The component document containing references to the codeblocks (script, styles, and documentation).
 * @param config - The configuration object containing library options, including the base URL for resolving paths.
 */
export default async function downloadCodeblocks(
  component: ComponentDocument,
  config: CUIConfig
) {
  // resolve outpath
  const resolvedOutPath = resolve(
    config.libraryOptions.baseUrl,
    component.outPath
  );
  const outDir = dirname(resolvedOutPath);

  let styleCB,
    docCB = null;

  // Get the codeblock for the script
  const scriptCB = await CodeblockModel.findByIdOrThrow(component.script);

  // Write codeblocks to their files
  await handleCodeblockSaving(scriptCB, outDir, config);

  // Get the codeblock for the style module
  if (component.styles) {
    styleCB = await CodeblockModel.findByIdOrThrow(component.styles);
    await handleCodeblockSaving(styleCB, outDir, config);
  }
  if (component.doc) {
    docCB = await CodeblockModel.findByIdOrThrow(component.doc);
    await handleCodeblockSaving(docCB, outDir, config);
  }
}
async function handleCodeblockSaving(
  codeblock: CodeblockDocument,
  outDir: string,
  config: CUIConfig
) {
  const filePath = join(outDir, codeblock.name);
  const relFilePath = convertAbsToRelPath(
    filePath,
    config.libraryOptions.baseUrl
  );
  if (fs.existsSync(filePath)) {
    const rewrite = await confirm({
      message: `Replace existing "${pc.yellow(relFilePath)}"?`,
    });
    if (!rewrite) {
      console.warn(`🔔 No changes made to "${pc.bold(relFilePath)}"`);
      return;
    }
  }
  await fs.ensureFile(filePath);
  await fs.writeFile(filePath, codeblock.content);
}
