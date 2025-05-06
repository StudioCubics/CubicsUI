import { envPath } from "@/constants/defaults.js";
import fs from "fs-extra";
import { parse as parseEnv } from "@dotenvx/dotenvx";
import { InitOptions } from "./_index.js";

export const envVariablesObject = { CUI_DB_URI: "" };

/**
 * Writes or appends the default environment variables to .env file.
 * @returns void
 */
export default async function initEnvFile(options: InitOptions) {
  envVariablesObject.CUI_DB_URI = options.database;

  const envVariablesString = genEnvVariablesString(envVariablesObject);

  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envVariablesString, "utf8");
    console.log(".env file created and default CUI_DB_URI added.");
  } else {
    const content = fs.readFileSync(envPath, "utf8");
    const parsed = parseEnv(content);

    if (!parsed["CUI_DB_URI"]) {
      fs.appendFileSync(envPath, `\n${envVariablesString}`);
      console.log("CUI_DB_URI appended to existing .env file.");
    } else {
      console.log("CUI_DB_URI already exists in .env file.");
    }
  }
}

function genEnvVariablesString(variables: Record<string, string>): string {
  let envVariablesString = "";
  Object.keys(variables).forEach((key) => {
    envVariablesString = envVariablesString + `${key}=${variables[key]}\n`;
  });
  return envVariablesString;
}
