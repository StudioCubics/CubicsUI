import {
  CodeblockModel,
  ComponentModel,
  connectDB,
  disconnectDB,
  LibraryModel,
} from "@cubicsui/db";
import fs from "fs-extra";
import { basename, extname } from "path";
import loadConfig from "./configFile/loadConfig.js";
import { getDependencies } from "@cubicsui/helpers";

export default async function uploadComponents(componentPath: string) {
  try {
    const config = await loadConfig();

    if (!fs.existsSync(componentPath))
      throw new Error(`No file found in ${componentPath}`);

    console.log(`uploading components ${componentPath}`);

    await connectDB();

    // Create or get library based on config
    let library = await LibraryModel.findOne({
      name: config.databaseOptions.libraryName,
    }).exec();
    if (!library) {
      // Maybe use create instead
      library = await LibraryModel.create({
        name: config.databaseOptions.libraryName,
        desc: "",
        rootPath: config.envOptions.basePath,
      });
    }

    // Analyse script and create it
    const scriptSize = (await fs.stat(componentPath)).size;
    const scriptContent = (await fs.readFile(componentPath)).toString();
    const scriptCodeblockName = basename(componentPath);
    const scriptCodeblock = new CodeblockModel({
      content: scriptContent,
      name: scriptCodeblockName,
      size: scriptSize,
    });

    // Create a component
    const componentName = basename(componentPath, extname(componentPath));

    const componentDependencies = await getDependencies(
      componentPath,
      undefined,
      config.envOptions.basePath
    );
    const component = new ComponentModel({
      name: componentName,
      outPath: componentPath,
      desc: "This is an awesome component",
      deps: componentDependencies,
      lib: library._id,
      script: scriptCodeblock._id,
    });

    console.log("final component:", component.toJSON());

    await ComponentModel.bulkSave([component]);
    await CodeblockModel.bulkSave([scriptCodeblock]);

    console.log(`completed uploading components ${componentPath}`);
    await disconnectDB();
  } catch (error) {
    console.error(error);
    await disconnectDB();
    process.exit(1);
  }
}
