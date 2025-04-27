import { CUIConfig } from "@/types/cuiConfig.js";
import { cosmiconfig } from "cosmiconfig";

export default async function loadConfig() {
  const explorer = cosmiconfig("cui");
  const result = await explorer.search();
  if (!result) {
    console.error("❌ Could not find a cui.config file.");
    process.exit(1);
  }
  if (result.isEmpty) {
    console.error("❌ cui.config file is empty.");
    process.exit(1);
  }
  const config: CUIConfig = result.config;
  return config;
}
