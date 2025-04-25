import fs from "fs-extra";

/**
 * Detects the package manager being used in the host project
 */
export default async function detectPackageManager(): Promise<string> {
  try {
    const files = await fs.readdir(process.cwd());
    if (files.includes("pnpm-lock.yaml")) return "pnpm";
    if (files.includes("yarn.lock")) return "yarn";
    if (files.includes("package-lock.json")) return "npm";

    // Default to npm if no lock file is found
    return "npm";
  } catch (error) {
    console.warn("Error detecting package manager:", error);
    return "npm";
  }
}
