import {
  CodeblockModel,
  ComponentDocument,
  CodeblockDocument,
  ComponentModel,
  connectDB,
  disconnectDB,
  LibraryModel,
} from "@cubicsui/db";
import fs from "fs-extra";
import loadConfig from "../../utils/configFile/loadConfig.js";
import { stageComponents } from "./stageComponents.js";
import picocolors from "picocolors";
import { printRootNode } from "@/utils/print.js";

/**
 * Recursively uploads a component and its local dependencies to the database.
 * Associates style and doc codeblocks without creating separate components.
 * @param componentAbsPath - Absolute path of the root component to upload.
 */
export default async function setComponents(componentAbsPath: string) {
  try {
    const config = await loadConfig();
    const { databaseOptions } = config;

    if (!fs.existsSync(componentAbsPath)) {
      throw new Error(`⛔ No file found in ${componentAbsPath}`);
    }

    console.log(
      `\n🔼 Uploading components starting from: ${componentAbsPath}\n`
    );

    await connectDB();

    // Create or get the library
    const library = await LibraryModel.findOneOrCreate(
      { name: databaseOptions.library.name },
      databaseOptions.library
    );

    // Track processed files: path -> component._id
    const processedFiles = new Map<string, ComponentDocument["_id"]>();

    // Collect components and codeblocks before saving
    const componentsToSave: ComponentDocument[] = [];
    const codeblocksToSave: CodeblockDocument[] = [];

    console.log(
      `\n⌛ Staging components ${picocolors.italic("(Duplicate components are not shown)")}\n`
    );
    printRootNode(1, "💿 Database", "up");
    await stageComponents(
      componentAbsPath,
      config,
      library,
      processedFiles,
      componentsToSave,
      codeblocksToSave
    );

    // Save all collected models
    console.log("\n💾 Saving staged components to database...");
    await ComponentModel.bulkSave(componentsToSave);
    await CodeblockModel.bulkSave(codeblocksToSave);

    console.log(
      `\n✅ Completed uploading all components starting from ${componentAbsPath}`
    );
    await disconnectDB();
  } catch (error) {
    console.error(`❌ Failed to upload component "${componentAbsPath}"!`);
    console.error(error);

    await disconnectDB();
    process.exit(1);
  }
}
