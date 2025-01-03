import { configGen } from "../constants/config.js";
import { CUIConfig } from "@cubicsui/db";

/**
 * Define and validate CubicsUI configuration
 * this is exposed to the user using package.json exports
 * users can import this using
 * `import {defineConfig} from "@cubicsui/cli"`
 * @param config Partial configuration object
 * @returns Validated configuration
 */
export default function defineConfig(config: CUIConfig): CUIConfig {
  // Merging default values with provided config
  const mergedConfig = { ...configGen(), ...config };
  // Validating the merged configuration
  return mergedConfig;
}
