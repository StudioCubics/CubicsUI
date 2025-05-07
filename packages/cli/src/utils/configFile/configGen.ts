import {
  defaultBaseUrl,
  defaultDocumentationPattern,
  defaultLibraryName,
  defaultStylePattern,
} from "@/constants/defaults.js";
import type { CUIConfig } from "../../types/cuiConfig.js";
import { InitOptions } from "@/commands/init/_index.js";
import { checkIfSrcFolderExists, isProjectUsingTypescript } from "../checks.js";
import findOrCreateLibrary from "../findOrCreateLibrary.js";
import { connectDB, disconnectDB } from "@cubicsui/db";
import { confirm, input } from "@inquirer/prompts";
import pc from "picocolors";

/**
 * Generates the final configuration of the `cui.config` file.
 * The defaults are also defined over here
 * @param {InitOptions} options
 * @returns The required values that is used in `cui.config`
 */
export default async function configGen(
  options: InitOptions
): Promise<CUIConfig> {
  const libraryOptions: CUIConfig["libraryOptions"] = {
    libraryName:
      options.library ??
      (await input({
        message: `What is the name of the library in your database? ${pc.dim("If the library doesnt exist it will be created")}\n`,
        default: defaultLibraryName,
      })),
    baseUrl: checkIfSrcFolderExists() ? "./src" : defaultBaseUrl,
  };

  await connectDB();
  const library = await findOrCreateLibrary(libraryOptions);
  await disconnectDB();

  const envOptions: CUIConfig["envOptions"] = {
    typescript:
      options.typescript ??
      (await confirm({
        message: "Are you using typescript in your project?",
        default: isProjectUsingTypescript(),
      })),
    styleModulePattern:
      options.stylePattern ??
      (await input({
        message: "What is the pattern of the style modules in your project?",
        default: defaultStylePattern,
      })),
    documentationPattern:
      options.documentationPattern ??
      (await input({
        message:
          "What is the pattern of the documentation files in your project?",
        default: defaultDocumentationPattern,
      })),
  };

  return {
    libraryOptions: { libraryName: library.name, baseUrl: library.baseUrl },
    envOptions,
  };
}
