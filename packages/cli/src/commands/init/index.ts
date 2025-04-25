import { Command } from "commander";
import initProject from "./initProject.js";

export interface InitOptions {
  typescript?: boolean;
}

export default function registerInitCommand(program: Command) {
  program.command("init").action(initProject);
}
