import type { CUIConfig } from "@/types/cuiConfig.js";

/**
 * Define and validate CubicsUI configuration
 * this is exposed to the user using package.json exports
 * users can import this using
 * `import {defineConfig} from "@cubicsui/cli"`
 * @param config Partial configuration object
 * @returns Validated configuration
 */
export default function defineConfig(config: CUIConfig): CUIConfig {
  return config;
}
