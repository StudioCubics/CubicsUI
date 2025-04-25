import { envPath, envVariables } from "@/constants/defaults.js";
import fs from "fs-extra";
import { parse } from "@dotenvx/dotenvx";

/**
 * Writes or appends the default environment variables to .env file
 * @returns void
 */
export default async function initEnvFile() {
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envVariables, "utf8");
    console.log(".env file created and default CUI_DB_URI added.");
  } else {
    const content = fs.readFileSync(envPath, "utf8");
    const parsed = parse(content);

    if (!parsed["CUI_DB_URI"]) {
      fs.appendFileSync(envPath, `\n${envVariables}`);
      console.log("CUI_DB_URI appended to existing .env file.");
    } else {
      console.log("CUI_DB_URI already exists in .env file.");
    }
  }
}
