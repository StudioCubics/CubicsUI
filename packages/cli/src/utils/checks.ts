import { defaultConfigFileName } from "@/constants/defaults.js";
import fs from "fs-extra";
import { parse, resolve } from "path";

/**
 * Checks if the the project is initialised for cui
 */
export function isProjectInitialised() {
  return fs.existsSync(resolve(process.cwd(), defaultConfigFileName));
}

/**
 * Checks if the CUI_DB_URL env variable is available in the process
 */
export function isDBURIAvailableInEnv() {
  return !!process.env.CUI_DB_URL;
}

/**
 * Check if project is using typescript or not by checking if the
 * file `tsconfig.json` exists or not
 * @returns {boolean} true if tsconfig.json exists
 */
export function isProjectUsingTypescript(): boolean {
  return fs.existsSync(resolve(process.cwd(), "tsconfig.json"));
}

/**
 * Check if project is using next js or not by checking if the
 * file `next.config` exists or not
 * @returns {boolean} true if the project is using nextJS
 */
export function isProjectUsingNextJs(): boolean {
  return fs
    .readdirSync(process.cwd())
    .some((file) => parse(file).name == "next.config");
}

/**
 * Check if there is a src folder in the host project root
 * @returns {boolean} returns true if src folder exists in the root of the host project
 */
export function checkIfSrcFolderExists(): boolean {
  return fs.existsSync(resolve(process.cwd(), "src"));
}
