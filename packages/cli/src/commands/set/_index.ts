import setComponents from "@/commands/set/setComponents.js";
import { Command } from "commander";

export default function registerUploadCommand(program: Command) {
  program
    .command("set")
    .description(
      "Creates or updates the desired component from the currentProject to the database."
    )
    .argument("<componentPath>", "Path of the file you want to upload")
    .action(setComponents);
}
