import { resolve } from "path";
import { format } from "prettier";
import fs from "fs-extra";
import { InitOptions } from "@/commands/init/index.js";
import getConfigName from "@/utils/getConfigName.js";
import getDetectedConfig from "@/utils/configFile/getDetectedConfig.js";
import { configTemplateESM } from "@/utils/configFile/configTemplate.js";

/**
 * Builds the `cui.config` file in the root of the project
 * @param options
 */
export default async function (options: InitOptions) {
  //  Detect the necessary values for the config file from the host project automatically or ask the host
  const detectedConfig = getDetectedConfig(options);
  const configFileName = getConfigName();
  try {
    // Build the config file cui.config based on the detectedConfig
    console.log("⌛ Finalizing config file, please wait...");
    // Format the final config with prettier
    const finalConfigContent = await format(
      configTemplateESM(detectedConfig).trim(),
      {
        semi: false,
        parser: "babel-ts",
      }
    );
    await fs.writeFile(
      resolve(process.cwd(), configFileName),
      finalConfigContent
    );
    console.log(`✔ Created ${configFileName} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create config file:`, error);
    process.exit(1);
  }
}
