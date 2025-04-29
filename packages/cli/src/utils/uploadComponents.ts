import {
  CodeblockModel,
  ComponentDocument,
  ComponentModel,
  connectDB,
  disconnectDB,
  LibraryModel,
} from "@cubicsui/db";
import fs from "fs-extra";
import { basename, extname, join, dirname } from "path";
import loadConfig from "./configFile/loadConfig.js";
import { getDependencies } from "@cubicsui/helpers";

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

    // Track processed files: path -> component._id
    const processedFiles = new Map<string, ComponentDocument["_id"]>();

    // Collect components and codeblocks before saving
    const componentsToSave: ComponentDocument[] = [];
    const codeblocksToSave: InstanceType<typeof CodeblockModel>[] = [];

    async function maybeCreateCodeblock(filePath: string) {
      if (!fs.existsSync(filePath)) return null;

      const size = (await fs.stat(filePath)).size;
      const content = (await fs.readFile(filePath)).toString();

      const codeblock = new CodeblockModel({
        name: basename(filePath),
        size,
        content,
      });

      codeblocksToSave.push(codeblock);
      return codeblock._id;
    }

    async function processComponent(
      filePath: string
    ): Promise<ComponentDocument["_id"]> {
      if (!library) throw new Error("Library is missing!");

      const cachedId = processedFiles.get(filePath);
      if (cachedId) return cachedId;

      if (!fs.existsSync(filePath)) {
        throw new Error(`Dependency file not found: ${filePath}`);
      }

      const componentName = basename(filePath, extname(filePath));
      const baseDir = dirname(filePath);

      // Load script content
      const scriptSize = (await fs.stat(filePath)).size;
      const scriptContent = (await fs.readFile(filePath)).toString();
      const scriptCodeblock = new CodeblockModel({
        name: basename(filePath),
        size: scriptSize,
        content: scriptContent,
      });

      codeblocksToSave.push(scriptCodeblock);

      // Detect and add styles and docs,
      // also remove from componentDependencies if these are imported in the component,
      // based on pattern
      const stylePattern = config.envOptions.stylePattern ?? "*.module.css";
      const docPattern = config.envOptions.documentationPattern ?? "*.md";

      const styleFile = join(baseDir, stylePattern.replace("*", componentName));
      const docFile = join(baseDir, docPattern.replace("*", componentName));

      const stylesCodeblockId = await maybeCreateCodeblock(styleFile);
      const docsCodeblockId = await maybeCreateCodeblock(docFile);

      const componentDependencies = await getDependencies(
        filePath,
        undefined,
        config.envOptions.baseUrl
      );

      // Convert patterns to regex for matching
      const styleRegex = new RegExp(
        stylePattern.replace(".", "\\.").replace("*", ".*") + "$"
      );
      const docRegex = new RegExp(
        docPattern.replace(".", "\\.").replace("*", ".*") + "$"
      );

      // Filter out style and doc files from local dependencies
      componentDependencies.lcl = componentDependencies.lcl.filter(
        (dep) => !styleRegex.test(dep.value) && !docRegex.test(dep.value)
      );

      // Recursively process local dependencies and assign cmp
      for (const localDep of componentDependencies.lcl) {
        const dependencyId = await processComponent(localDep.path);
        localDep.cmp =
          dependencyId as unknown as ComponentDocument["deps"]["lcl"][number]["cmp"];
      }

      const component = new ComponentModel({
        name: componentName,
        outPath: filePath,
        desc: "This is an awesome component",
        deps: componentDependencies,
        lib: library._id,
        script: scriptCodeblock._id,
        styles: stylesCodeblockId ?? undefined,
        doc: docsCodeblockId ?? undefined,
      });

      processedFiles.set(filePath, component._id);
      componentsToSave.push(component);

      console.log(`Staged component: ${filePath}`);

      return component._id;
    }

    await processComponent(componentPath);

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
