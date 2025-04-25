import {
  isProjectUsingNextJs,
  isProjectUsingTypescript,
} from "@/utils/checks.js";
import { type ConfigFile, configFiles } from "./configFile/cuiConfig.js";

export default function getConfigName() {
  // By default use the "cui.config.mjs" file
  let finalConfigName: ConfigFile = configFiles[0];
  // If the detected config is typescript then use "cui.config.ts" instead
  if (isProjectUsingTypescript()) {
    console.log("⚠ tsconfig.json file detected");
    finalConfigName = configFiles[1];
  }
  // Set back to mjs eventhough built with typescript as nextJS doesnt use typescript in runtime
  if (isProjectUsingNextJs()) {
    console.log("⚠ next.config file detected");
    finalConfigName = configFiles[0];
  }

  return finalConfigName;
}
