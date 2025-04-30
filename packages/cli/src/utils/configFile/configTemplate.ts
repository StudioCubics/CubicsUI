import configGen from "./configGen.js";
import { InitOptions } from "@/commands/init/_index.js";

/**
 * Default configuration template for ESM modules
 * @param composedConfig The configuration detected by the cli
 * @returns The template that will be used to build `cui.config`
 */

export default async function configTemplate(
  options: InitOptions
): Promise<string> {
  const generatedConfig = await configGen(options);
  return `
import { defineConfig } from '@cubicsui/cli';
export default defineConfig(${JSON.stringify(generatedConfig)});`;
}
