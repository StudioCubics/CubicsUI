import { defaultConfigSchema } from "@/constants/defaults.js";
import { CUIConfig } from "@/types/cuiConfig.js";

/**
 * Default configuration template
 * @param composedConfig The configuration detected by the cli
 * @returns The template that will be used to build `cui.config`
 */
export default async function configTemplate(
  composedConfig: CUIConfig
): Promise<string> {
  return JSON.stringify({ $schema: defaultConfigSchema, ...composedConfig });
}
// export default async function configTemplate(
//   generatedConfig: CUIConfig
// ): Promise<string> {
//   return `
// import { defineConfig } from '@cubicsui/cli';
// export default defineConfig(${JSON.stringify(generatedConfig)});`;
// }
