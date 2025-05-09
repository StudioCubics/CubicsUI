import { program } from "commander";
import { config } from "@dotenvx/dotenvx";
import { envPath } from "./constants/defaults.js";
import registerInitCommand from "@/commands/init/_index.js";
import registerUploadCommand from "./commands/upload/_index.js";
import registerGetCommand from "./commands/get/_index.js";

// Resolve `.env` from the user's project root
config({ path: envPath, quiet: true, ignore: ["MISSING_ENV_FILE"] });

program.name("cui").description("CubicsUI CLI").version("0.0.1");
registerInitCommand(program);
registerUploadCommand(program);
registerGetCommand(program);

program.parse(process.argv);
