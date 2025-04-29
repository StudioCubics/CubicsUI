import {
  CodeblockModel,
  ComponentDocument,
  ComponentModel,
  connectDB,
  disconnectDB,
  LibraryModel,
} from "@cubicsui/db";
import fs from "fs-extra";
import loadConfig from "../../utils/configFile/loadConfig.js";
import { processComponent } from "./processComponent.js";
import { convertAbsToRelPath } from "@cubicsui/helpers";

/**
 * Recursively uploads a component and its local dependencies to the database.
 * Associates style and doc codeblocks without creating separate components.
 * @param componentPath - Path of the root component to upload.
 */
export default async function uploadComponents(componentPath: string) {
  try {
    const config = await loadConfig();

    if (!fs.existsSync(componentPath)) {
      throw new Error(`No file found in ${componentPath}`);
    }

    console.log(`Uploading components starting from: ${componentPath}`);

    await connectDB();

    // Create or get the library
    let library = await LibraryModel.findOne({
      name: config.databaseOptions.libraryName,
    }).exec();
    if (!library) {
      library = await LibraryModel.create({
        name: config.databaseOptions.libraryName,
        desc: "",
        rootPath: config.envOptions.baseUrl,
      });
    }

    const componentRelPath = convertAbsToRelPath(
      componentPath,
      config.envOptions.baseUrl
    );

    // Track processed files: path -> component._id
    const processedFiles = new Map<string, ComponentDocument["_id"]>();

    // Collect components and codeblocks before saving
    const componentsToSave: ComponentDocument[] = [];
    const codeblocksToSave: InstanceType<typeof CodeblockModel>[] = [];

    await processComponent(
      componentRelPath,
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
      `✅ Completed uploading all components starting from ${componentPath}`
    );
    await disconnectDB();
  } catch (error) {
    console.error(error);
    await disconnectDB();
    process.exit(1);
  }
}
