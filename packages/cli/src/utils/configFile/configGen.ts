import { defaultBasePath, defaultLibraryName } from "@/constants/defaults.js";
import type { CUIConfig, DetectedConfig } from "./cuiConfig.js";

/**
 * Generates the final configuration of the `cui.config` file.
 * The defaults are also defined over here
 * @param detectedConfig The configuration detected by the cli
 * @returns The required values that is used in `cui.config`
 */
export default function configGen(detectedConfig?: DetectedConfig): CUIConfig {
  return {
    envOptions: {
      typescript: false,
      basePath: defaultBasePath,
    },
    databaseOptions: {
      libraryName: defaultLibraryName,
    },
    ...detectedConfig,
  };
}
