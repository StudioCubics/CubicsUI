import path from "path";
import fs from "fs";

/**
 * Resolved metadata for a package inside the monorepo.
 *
 * Includes filesystem paths, package.json metadata, and
 * TypeScript source configuration used for documentation generation.
 */
export interface PackageDetails {
  /** Absolute path to the package root directory */
  src: string;

  /** Package name from package.json */
  name: string;

  /** Raw parsed package.json contents */
  json: Record<string, unknown>;

  /** Package version from package.json */
  version: number;

  /** Absolute path to the source directory (typically /src) */
  docSrcPath: string;

  /** Absolute path to the package tsconfig.json */
  tsConfigPath: string;
}

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
  const docSrcPath = path.resolve(src, "src");
  const tsConfigPath = path.resolve(src, "tsconfig.json");
  return { src, name, json, version, docSrcPath, tsConfigPath };
}
