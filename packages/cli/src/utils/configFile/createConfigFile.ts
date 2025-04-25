import { outputFile, pathExists } from "fs-extra";
import { join } from "path";

export default async function createCuiConfigFile() {
  const filePath = join(process.cwd(), "cui.config.js");

  const defaultContent = `
  // cui.config.js
  
  module.exports = {
    // Add your configuration here
  };
  `.trimStart();

  try {
    const exists = await pathExists(filePath);

    if (exists) {
      console.error("❌ cui.config.js already exists.");
      return;
    }

    await outputFile(filePath, defaultContent);
    console.log("✅ cui.config.js created successfully!");
  } catch (error) {
    if (error instanceof Error)
      console.error("❌ Error creating cui.config.js:", error.message);
  }
}
