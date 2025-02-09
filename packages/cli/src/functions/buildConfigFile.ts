import { resolve } from "path";
import { format } from "prettier";
import { writeFile } from "fs/promises";
import { configTemplateESM } from "../functions/configTemplateESM.js";
import getDetectedConfig from "../functions/detectConfig.js";
import getConfigName from "../functions/getConfigName.js";
import { InitOptions } from "../commands/init.js";

export default async function buildConfigFile(options: InitOptions) {
  //  Detect the necessary values for the config file from the host project automatically or ask the host
  const detectedConfig = getDetectedConfig(options);
  const configFileName = getConfigName();
  try {
    // Build the config file cui.config based on the detectedConfig
    console.log("⏳ Finalizing config file, please wait...");
    // Format the final config with prettier
    const finalConfigContent = await format(
      configTemplateESM(detectedConfig).trim(),
      {
        semi: false,
        parser: "babel-ts",
      }
    );
    await writeFile(resolve(process.cwd(), configFileName), finalConfigContent);
    console.log(`✔ Created ${configFileName} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create config file:`, error);
    process.exit(1);
  }
}
