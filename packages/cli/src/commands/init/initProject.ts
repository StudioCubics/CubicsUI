import { isProjectInitialised, isDBURIAvailableInEnv } from "@/utils/checks.js";
import initEnvFile from "@/commands/init/initEnvFile.js";
import initConfigFile from "./initConfigFile.js";
import { InitOptions } from "./_index.js";
import initIgnores from "./initIgnores.js";
import rerunCurrentCommand from "@/utils/rerunCurrentCommand.js";

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
      "This project seems to be already initialised for @cubicsui/cli."
    );
    console.error(
      "If you are trying to reinitialise this project then delete the config file(cui.config) before initialising again."
    );
    process.exit(0);
  }

  // Check if environment variables already exists if it exists continue or else initialise env file and then rerun the cui init function
  try {
    if (!isDBURIAvailableInEnv()) {
      console.log(`\nThank you for installing CubicsUI! 🎉`);
      await initEnvFile(options);
      rerunCurrentCommand();
    } else {
      await initConfigFile(options);
      await initIgnores();
    }
  } catch (error) {
    if (error instanceof Error && error.name === "ExitPromptError") {
      console.error(`❌ Stopped initialising project`);
      console.log("👋 Until next time!");
    } else {
      console.error(`❌ Failed to initialise project!`);
      console.error(error);
    }
    process.exit(1);
  }
}
