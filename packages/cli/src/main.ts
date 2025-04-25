import { program } from "commander";
import registerInitCommand from "@/commands/init/_index.js";
import { config } from "@dotenvx/dotenvx";
import registerUploadCommand from "./commands/upload.js";
import { envPath } from "./constants/defaults.js";

// Resolve `.env` from the user's project root
config({ path: envPath });

program.name("cui").description("CubicsUI CLI").version("0.0.1");
registerInitCommand(program);
registerUploadCommand(program);

program.parse(process.argv);
