import {
  isProjectUsingTypescript,
  checkIfSrcFolderExists,
} from "@/utils/checks.js";
import { InitOptions } from "@/commands/init/index.js";
import type { DetectedConfig } from "./cuiConfig.js";
import configGen from "./configGen.js";

/**
 * Detects the host projects environment using check functions defined in checks.ts
 * during the initialisation stage
 * @returns {DetectedConfig} The detected config for the host project
 */
export default function getDetectedConfig(
  options: InitOptions
): DetectedConfig {
  console.log("⏳ Checking project environment, please wait...");
  const detectedConfig = configGen() as DetectedConfig;
  detectedConfig.envOptions.typescript =
    options?.typescript ?? isProjectUsingTypescript();
  detectedConfig.envOptions.basePath = checkIfSrcFolderExists() ? "./src" : ".";
  return detectedConfig;
}
