import {
  CodeblockDocument,
  CodeblockModel,
  // CodeblockModel,
  ComponentDocument,
  ComponentModel,
  // ComponentModel,
  connectDB,
  disconnectDB,
} from "@cubicsui/db";
import fs from "fs-extra";
import loadConfig from "../../utils/configFile/loadConfig.js";
import { processComponent } from "./processComponent.js";
import findOrCreateLibrary from "@/utils/findOrCreateLibrary.js";
import picocolors from "picocolors";

/**
 * Recursively uploads a component and its local dependencies to the database.
 * Associates style and doc codeblocks without creating separate components.
 * @param componentAbsPath - Absolute path of the root component to upload.
 */
export default async function uploadComponents(componentAbsPath: string) {
  try {
    const config = await loadConfig();

    if (!fs.existsSync(componentAbsPath)) {
      throw new Error(`⛔ No file found in ${componentAbsPath}`);
    }

    console.log(
      `\n🔼 Uploading components starting from: ${componentAbsPath}\n`
    );

    await connectDB();

    // Create or get the library
    const library = await findOrCreateLibrary(config.libraryOptions);

    // Track processed files: path -> component._id
    const processedFiles = new Map<string, ComponentDocument["_id"]>();

    // Collect components and codeblocks before saving
    const componentsToSave: ComponentDocument[] = [];
    const codeblocksToSave: CodeblockDocument[] = [];

    console.log(
      `⌛ Staging components ${picocolors.italic("(Duplicate components are not shown)")}`
    );
    await processComponent(
      componentAbsPath,
      config,
      library,
      processedFiles,
      componentsToSave,
      codeblocksToSave
    );

    // Save all collected models
    console.log("\n💾 Saving the staged components to the database.");
    await CodeblockModel.bulkSave(codeblocksToSave);
    await ComponentModel.bulkSave(componentsToSave);

    console.log(
      `\n✅ Completed uploading all components starting from ${componentAbsPath}`
    );
    await disconnectDB();
  } catch (error) {
    console.error(`❌ Failed to upload component!`);
    console.error(error);
    await disconnectDB();
    process.exit(1);
  }
}
