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
import { logger } from "@/main.js";

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

    logger.log(
      `Uploading components starting from: ${componentAbsPath}`,
      "Info",
      "🔼"
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

    logger.waiting(
      `Staging components ${picocolors.italic("(Duplicate components are not shown)")}`
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
    logger.saving("Saving staged components to database...");
    await ComponentModel.bulkSave(componentsToSave);
    await CodeblockModel.bulkSave(codeblocksToSave);

    logger.success(
      `Completed uploading all components starting from ${componentAbsPath}`
    );
    await disconnectDB();
  } catch (error) {
    logger.failure(`Failed to upload component "${componentAbsPath}"!`);
    console.error(error);

    await disconnectDB();
    process.exit(1);
  }
}
