import { resolve } from "path";
import { format } from "prettier";
import fs from "fs-extra";
import { InitOptions } from "@/commands/init/_index.js";
import getConfigName from "@/utils/configFile/getConfigName.js";
import configTemplate from "@/utils/configFile/configTemplate.js";
import configGen from "@/utils/configFile/configGen.js";

/**
 * Builds the `cui.config` file in the root of the project
 * @param options
 */
export default async function (options: InitOptions) {
  //  Detect the necessary values for the config file from the host project automatically or ask the host
  const generatedConfig = await configGen(options);
  const configFileName = getConfigName(generatedConfig);
  const configTemplateString = (await configTemplate(generatedConfig)).trim();

  // Format the final config with prettier
  const finalConfigContent = await format(configTemplateString, {
    semi: false,
    parser: "babel-ts",
  });
  await fs.writeFile(
    resolve(process.cwd(), configFileName),
    finalConfigContent
  );
  console.log(`✔ Created config file ${configFileName} in project root`);
}
