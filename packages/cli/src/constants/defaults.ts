import { resolve } from "path";

// Env variable related defaults
export const envVariables = `CUI_DB_URI="mongodb://localhost:27017/cubicsui"\n`;
export const envFileName = ".env";
export const envPath = resolve(process.cwd(), envFileName);

// Cache related defaults
export const cacheDirName = ".cui";
export const libraryCacheFileName = "lib.json";

// Ignore defaults
export const filesToIgnore = [cacheDirName, ".env"];

// Config defaults
export const defaultLibraryName = "default";
export const defaultBaseUrl = ".";
