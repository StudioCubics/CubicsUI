import { Command } from "commander";
import initProject from "./initProject.js";
import { defaultLibraryName } from "@/constants/defaults.js";

export interface InitOptions {
  typescript?: boolean;
  libraryName?: string;
}

export default function registerInitCommand(program: Command) {
  program
    .command("init")
    .option("--ts, --typescript", "Add typescript to cui.config.envOptions")
    .option(
      "--lib, --libraryName [name]",
      "Name of the library in the database",
      defaultLibraryName
    )
    .action((options) => initProject(options));
}
