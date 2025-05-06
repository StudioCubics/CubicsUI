import { Command } from "commander";
import initProject from "./initProject.js";

export interface InitOptions {
  typescript: boolean;
  database: string;
  library: string;
}

export default function registerInitCommand(program: Command) {
  program
    .command("init")
    .option("--ts, --typescript", "Add typescript to cui.config.envOptions")
    .option("--db,--database [uri]", "URI of the MongoDB database")
    .option("--lib, --library [name]", "Name of the library in the database")
    .action((options) => initProject(options));
}
