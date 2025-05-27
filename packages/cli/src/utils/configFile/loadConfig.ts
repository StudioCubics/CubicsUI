import { logger } from "@/main.js";
import { CUIConfig } from "@/types/cuiConfig.js";
import { cosmiconfig } from "cosmiconfig";

/**
 * Loads the config file from the user's project
 */
export default async function loadConfig() {
  const explorer = cosmiconfig("cui", {
    searchPlaces: ["package.json", "cuiconfig.json"],
    packageProp: "cui",
  });
  const result = await explorer.search();
  if (!result) {
    logger.failure("Could not find a cuiconfig.json file.");
    process.exit(1);
  }
  if (result.isEmpty) {
    logger.failure("cuiconfig.json file is empty.");
    process.exit(1);
  }
  const config: CUIConfig = result.config;
  return config;
}
