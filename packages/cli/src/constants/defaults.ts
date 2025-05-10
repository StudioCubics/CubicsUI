import { resolve } from "path";

// Env variable related defaults
export const defaultDbURI = "mongodb://localhost:27017/cubicsui";
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
export const defaultStylePattern = "*.module.css";
export const defaultDocumentationPattern = "*.md";
export const defaultConfigSchema =
  "https://raw.githubusercontent.com/StudioCubics/CubicsUI/main/packages/cli/cui-config.schema.json";
export const defaultConfigFileName = "cuiconfig.json";
