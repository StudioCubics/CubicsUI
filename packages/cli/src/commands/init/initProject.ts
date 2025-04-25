import { isProjectInitialised, isDBURIAvailableInEnv } from "@/utils/checks.js";
import initEnvFile from "@/commands/init/initEnvFile.js";
import rerunCurrentCommand from "@/utils/rerunCurrentCommand.js";
import initConfigFile from "./initConfigFile.js";
import { InitOptions } from "./index.js";
import initIgnores from "./initIgnores.js";

/**
 * Initializes the configuration file and the cache folder ".cui" for the CubicsUI CLI toolkit.
 *
 * @description
 * Prepares the project for component generation using CubicsUI by creating a configuration file
 * and cache folder `.cui`, adds environment variables to a .env file and modifies existing `.gitignore` file to ignore `.cui` folder.
 *
 * @returns {Promise<void>} Resolves when configuration is successfully created
 *
 * @throws {Error} Exits the process if initialization fails or config already exists
 *
 * @example
 * // Typical usage
 * cui init
 */
export default async function initProject(options: InitOptions): Promise<void> {
  // Check if config already exists in the root
  if (isProjectInitialised()) {
    console.error(
      "\nThis project seems to be already initialised for @cubicsui/cli."
    );
    console.error(
      "\nIf you are trying to reinitialise this project then delete the config file(cui.config) and .cui folder before initialising again."
    );
    process.exit(0);
  }

  // Check if environment variables already exists if it exists continue or else initialise env file and then rerun the cui init function
  if (!isDBURIAvailableInEnv()) {
    console.log(
      "\nLooks like environment variable CUI_DB_URI is missing, cui will now add the default value of CUI_DB_URI to .env file"
    );
    await initEnvFile();
    rerunCurrentCommand();
  } else {
    await initConfigFile(options);
    await initIgnores();
  }
}
