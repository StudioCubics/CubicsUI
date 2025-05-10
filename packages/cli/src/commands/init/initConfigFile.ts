import { resolve } from "path";
import { format } from "prettier";
import fs from "fs-extra";
import { InitOptions } from "@/commands/init/_index.js";
import configTemplate from "@/utils/configFile/configTemplate.js";
import configGen from "@/utils/configFile/configGen.js";
import { defaultConfigFileName } from "@/constants/defaults.js";

/**
 * Builds the `cui.config` file in the root of the project
 * @param options
 */
export default async function (options: InitOptions) {
  //  Detect the necessary values for the config file from the host project automatically or ask the host
  const generatedConfig = await configGen(options);
  const configTemplateString = (await configTemplate(generatedConfig)).trim();

  // Format the final config with prettier
  const finalConfigContent = await format(configTemplateString, {
    semi: false,
    parser: "json",
  });
  await fs.writeFile(
    resolve(process.cwd(), defaultConfigFileName),
    finalConfigContent
  );
  console.log(
    `✅ Created config file ${defaultConfigFileName} in project root`
  );
}
