import uploadComponents from "@/utils/uploadComponents.js";
import { Command } from "commander";

export default function registerUploadCommand(program: Command) {
  program
    .command("upload")
    .argument("<componentPath>", "Path of the file you want to upload")
    .action((componentPath) => uploadComponents(componentPath));
}
