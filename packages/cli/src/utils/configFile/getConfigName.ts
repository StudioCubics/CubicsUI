import { configFiles, type CUIConfig } from "@/types/cuiConfig.js";

export default function getConfigName(generatedConfig: CUIConfig) {
  if (generatedConfig.envOptions.typescript) {
    return configFiles[1];
  }
  return configFiles[0];
  // // By default use the "cui.config.mjs" file
  // let finalConfigName: ConfigFile = configFiles[0];
  // // If the detected config is typescript then use "cui.config.ts" instead
  // if (isProjectUsingTypescript()) {
  //   finalConfigName = configFiles[1];
  // }
  // // // Set back to mjs eventhough built with typescript as nextJS doesnt use typescript in runtime
  // // if (isProjectUsingNextJs()) {
  // //   finalConfigName = configFiles[0];
  // // }

  // return finalConfigName;
}
