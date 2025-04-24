import createCuiConfigFile from "@/utils/createConfigFile.js";
import { Command } from "commander";

export default function registerInitCommand(program: Command) {
  program.command("init").action(createCuiConfigFile);
}
