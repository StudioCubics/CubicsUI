import { isProjectInitialised, isDBURIAvailableInEnv } from "@/utils/checks.js";
import initEnvFile from "@/commands/init/initEnvFile.js";
import rerunCurrentCommand from "@/utils/rerunCurrentCommand.js";
import initConfigFile from "./initConfigFile.js";
import { InitOptions } from "./_index.js";
import initIgnores from "./initIgnores.js";
import { confirm, input } from "@inquirer/prompts";
import { defaultDbURI, defaultLibraryName } from "@/constants/defaults.js";

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
export default async function initProject(
  options: Partial<InitOptions>
): Promise<void> {
  // Check if config already exists in the root
  if (isProjectInitialised()) {
    console.error(
      "\nThis project seems to be already initialised for @cubicsui/cli.",
      "\nIf you are trying to reinitialise this project then delete the config file(cui.config) before initialising again."
    );
    process.exit(0);
  }
  const initOptions: InitOptions = {
    typescript:
      options.typescript ??
      (await confirm({
        message: "Are you using typescript in your project?",
        default: false,
      })),
    database:
      options.database ??
      (await input({
        message: "Input your MongoDB database url",
        default: defaultDbURI,
      })),
    library:
      options.library ??
      (await input({
        message: "Input the name of the library in your database",
        default: defaultLibraryName,
      })),
  };

  // Check if environment variables already exists if it exists continue or else initialise env file and then rerun the cui init function
  if (!isDBURIAvailableInEnv()) {
    await initEnvFile(initOptions);
    rerunCurrentCommand();
  } else {
    await initConfigFile(initOptions);
    await initIgnores();
  }
}
