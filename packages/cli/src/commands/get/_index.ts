import { Command } from "commander";
import getComponents from "./getComponents.js";

export default function registerGetCommand(program: Command) {
  program
    .command("get")
    .description(
      "Downloads the desired component from the database to current project."
    )
    .argument("<componentName>", "Name of the component you want to download")
    .action(getComponents);
}
