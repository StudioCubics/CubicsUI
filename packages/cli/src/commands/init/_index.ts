import { Command } from "commander";
import initProject from "./initProject.js";

export interface InitOptions {
  typescript: boolean;
  database: string;
  library: string;
  stylePattern: string;
  documentationPattern: string;
}

export default function registerInitCommand(program: Command) {
  program
    .command("init")
    .option("--ts, --typescript", "Add typescript to cui.config.envOptions")
    .option("--db,--database [uri]", "URI of the MongoDB database")
    .option("--lib, --library [name]", "Name of the library in the database")
    .option(
      "--sp, --style-pattern [pattern]",
      "Wildcard pattern of the style files"
    )
    .option(
      "--dp, --documentation-pattern [pattern]",
      "Wildcard pattern of the documentation files"
    )
    .action(initProject);
}
