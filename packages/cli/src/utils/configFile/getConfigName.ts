import { configFiles, type CUIConfig } from "@/types/cuiConfig.js";

export default function getConfigName(generatedConfig: CUIConfig) {
  if (generatedConfig.envOptions.typescript) {
    return configFiles[1];
  }
  return configFiles[0];
}
