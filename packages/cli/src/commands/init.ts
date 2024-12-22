import { resolve } from "path";
import { format } from "prettier";
import { writeFile } from "fs/promises";
import { configTemplateESM } from "../constants/config.js";
import { configFiles } from "../interfaces/CUIConfig.js";
import detectConfigForInit from "../functions/detectConfig.js";
import { checkIfConfigExists } from "../functions/checks.js";

/**
 * Initializes the configuration file for the CubicsUI CLI toolkit.
 *
 * @description
 * Prepares the project for component generation using CubicsUI by creating a configuration file.
 * This function is typically invoked via the `npx cui init` command.
 *
 * @workflow
 * - Automatically detects project configuration parameters
 * - Generates a standardized configuration file in the project root
 *
 * @returns {Promise<void>} Resolves when configuration is successfully created
 *
 * @throws {Error} Exits the process if initialization fails or config already exists
 *
 * @example
 * // Typical usage
 * npx cui init
 */
export default async function init(): Promise<void> {
  const finalConfig = configFiles[0];
  // Step 1. Check if config already exists in the root
  await checkIfConfigExists();
  // Step 2. Detect the necessary values for the config file from the host project automatically or ask the host
  const detectedConfig = await detectConfigForInit();

  // Step 3. Build the config file cui.config based on the detectedConfig
  console.log("⏳ Building config file, please wait...");
  try {
    console.log("⏳ Finalizing config file, please wait...");
    // Format the final config with prettier
    const finalConfigContent = await format(
      configTemplateESM(detectedConfig).trim(),
      {
        semi: false,
        parser: "babel-ts",
      }
    );
    await writeFile(resolve(process.cwd(), finalConfig), finalConfigContent);
    console.log(`✔ Created ${finalConfig} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create ${finalConfig}:`, error);
    process.exit(1);
  }
}
