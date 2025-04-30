import { resolve } from "path";
import { format } from "prettier";
import fs from "fs-extra";
import { InitOptions } from "@/commands/init/_index.js";
import getConfigName from "@/utils/configFile/getConfigName.js";
import configTemplate from "@/utils/configFile/configTemplate.js";

/**
 * Builds the `cui.config` file in the root of the project
 * @param options
 */
export default async function (options: InitOptions) {
  //  Detect the necessary values for the config file from the host project automatically or ask the host
  const configFileName = getConfigName();
  try {
    const configTemplateString = (await configTemplate(options)).trim();
    // Build the config file cui.config based on the detectedConfig
    console.log("⌛ Finalizing config file, please wait...");
    // Format the final config with prettier
    const finalConfigContent = await format(configTemplateString, {
      semi: false,
      parser: "babel-ts",
    });
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
