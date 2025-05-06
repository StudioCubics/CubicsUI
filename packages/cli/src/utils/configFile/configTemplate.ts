import { CUIConfig } from "@/types/cuiConfig.js";

/**
 * Default configuration template for ESM modules
 * @param composedConfig The configuration detected by the cli
 * @returns The template that will be used to build `cui.config`
 */

export default async function configTemplate(
  generatedConfig: CUIConfig
): Promise<string> {
  return `
import { defineConfig } from '@cubicsui/cli';
export default defineConfig(${JSON.stringify(generatedConfig)});`;
}
