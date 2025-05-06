import {
  CodeblockModel,
  ComponentDocument,
  ComponentModel,
  connectDB,
  disconnectDB,
} from "@cubicsui/db";
import fs from "fs-extra";
import loadConfig from "../../utils/configFile/loadConfig.js";
import { processComponent } from "./processComponent.js";
import findOrCreateLibrary from "@/utils/findOrCreateLibrary.js";

/**
 * Recursively uploads a component and its local dependencies to the database.
 * Associates style and doc codeblocks without creating separate components.
 * @param componentAbsPath - Absolute path of the root component to upload.
 */
export default async function uploadComponents(componentAbsPath: string) {
  try {
    const config = await loadConfig();

    if (!fs.existsSync(componentAbsPath)) {
      throw new Error(`No file found in ${componentAbsPath}`);
    }

    console.log(`Uploading components starting from: ${componentAbsPath}`);

    await connectDB();

    // Create or get the library
    const library = await findOrCreateLibrary(config.libraryOptions);

    // Track processed files: path -> component._id
    const processedFiles = new Map<string, ComponentDocument["_id"]>();

    // Collect components and codeblocks before saving
    const componentsToSave: ComponentDocument[] = [];
    const codeblocksToSave: InstanceType<typeof CodeblockModel>[] = [];

    await processComponent(
      componentAbsPath,
      config,
      library,
      processedFiles,
      componentsToSave,
      codeblocksToSave
    );

    // Save all collected models
    await CodeblockModel.bulkSave(codeblocksToSave);
    await ComponentModel.bulkSave(componentsToSave);

    console.log(
      `✔ Completed uploading all components starting from ${componentAbsPath}`
    );
    await disconnectDB();
  } catch (error) {
    console.error(error);
    await disconnectDB();
    process.exit(1);
  }
}
