import { program } from "commander";
import registerInitCommand from "@/commands/init.js";
import { resolve } from "path";
import { config } from "dotenv";
import registerUploadCommand from "./commands/upload.js";

// Resolve `.env` from the user's project root
const envPath = resolve(process.cwd(), ".env");
config({ path: envPath });

program.name("cui").description("CubicsUI CLI").version("0.0.1");
registerInitCommand(program);
registerUploadCommand(program);

program.parse(process.argv);
