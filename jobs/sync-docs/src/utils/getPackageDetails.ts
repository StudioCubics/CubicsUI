import fs from "node:fs";
import path from "node:path";
import type { PackageDetails } from "../types.js";

/**
 * Gets the pkg details when pkg name and directory is given
 */
export function getPackageDetails(pkg: string, dir: string): PackageDetails {
  const src = path.resolve(`${dir}/${pkg}`);
  const json = JSON.parse(
    fs.readFileSync(path.resolve(src, "package.json"), "utf8"),
  );
  const name = json.name;
  const version = json.version;
  const pkgSrcPath = path.resolve(src, "src");
  const tsConfigPath = path.resolve(src, "tsconfig.json");
  return { src, name, json, version, pkgSrcPath, tsConfigPath };
}
