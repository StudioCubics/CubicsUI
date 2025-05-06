import { defaultBaseUrl, defaultLibraryName } from "@/constants/defaults.js";
import type { CUIConfig } from "../../types/cuiConfig.js";
import { InitOptions } from "@/commands/init/_index.js";
import { checkIfSrcFolderExists, isProjectUsingTypescript } from "../checks.js";
import findOrCreateLibrary from "../findOrCreateLibrary.js";
import { connectDB, disconnectDB } from "@cubicsui/db";

/**
 * Generates the final configuration of the `cui.config` file.
 * The defaults are also defined over here
 * @param composedConfig The configuration detected by the cli
 * @returns The required values that is used in `cui.config`
 */
export default async function configGen(
  options: InitOptions
): Promise<CUIConfig> {
  const databaseOptions: CUIConfig["libraryOptions"] = {
    libraryName: options.library ?? defaultLibraryName,
    baseUrl: checkIfSrcFolderExists() ? "./src" : defaultBaseUrl,
  };

  await connectDB();
  const library = await findOrCreateLibrary(databaseOptions);
  await disconnectDB();

  return {
    envOptions: {
      typescript: options.typescript ?? isProjectUsingTypescript(),
      stylePattern: "*.module.scss",
      documentationPattern: "*.md",
    },
    libraryOptions: {
      libraryName: library.name,
      baseUrl: library.baseUrl,
    },
  };
}
