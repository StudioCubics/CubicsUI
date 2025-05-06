import pc from "picocolors";
import { envPath } from "@/constants/defaults.js";
import fs from "fs-extra";
import { parse as parseEnv } from "@dotenvx/dotenvx";
import { InitOptions } from "./_index.js";
import { password } from "@inquirer/prompts";

export const envVariablesObject = { CUI_DB_URL: "" };

/**
 * Initialises the project by writin or appending the environment variables to .env file.
 * @returns void
 */
export default async function initEnvFile(options: InitOptions) {
  envVariablesObject.CUI_DB_URL =
    options.database ??
    (await password({
      message: `What is your MongoDB database connection string? ${pc.dim("This will be securely stored in a .env file")}\n`,
      mask: true,
    }));

  const envVariablesString = genEnvVariablesString(envVariablesObject);

  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envVariablesString, "utf8");
    console.log("⚠ .env file created and CUI_DB_URL variable added.");
  } else {
    const content = fs.readFileSync(envPath, "utf8");
    const parsed = parseEnv(content);

    if (!parsed["CUI_DB_URL"]) {
      fs.appendFileSync(envPath, `\n${envVariablesString}`);
      console.log("⚠ CUI_DB_URL appended to existing .env file.");
    }
  }
}

function genEnvVariablesString(variables: Record<string, string>): string {
  let envVariablesString = "";
  Object.keys(variables).forEach((key) => {
    envVariablesString = envVariablesString + `${key}="${variables[key]}"\n`;
  });
  return envVariablesString;
}
