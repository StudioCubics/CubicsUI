import {
  CodeblockDocument,
  ComponentDocument,
  ComponentModel,
  LibraryDocument,
} from "@cubicsui/db";
import fs from "fs-extra";
import { basename, dirname, extname, join, resolve } from "path";
import { convertAbsToRelPath, getDependencies } from "@cubicsui/helpers";
import { CUIConfig } from "@/types/cuiConfig.js";
import { filterComponentDependencies } from "./filterComponentDependencies.js";
import createCodeblock from "./createCodeblock.js";
import printTree from "@/utils/printTree.js";

const MAX_DEPTH = 10;

/**
 * Recursively processes a component and its dependencies.
 * Handles circular imports and depth limits.
 * @param {string} componentAbsPath absolute path of the component.
 * @param {CUIConfig} config the config object.
 * @param {LibraryDocument} library the library where the component should be uploaded.
 * @param {Map<string,ComponentDocument["_id"]>} processedFiles Map containing the components that have been processed this is to prevent reprocessing the same component multiple times.
 * @param {ComponentDocument[]} componentsToSave Array containing all the component documents that will be saved at the end of the process.
 * @param {CodeblockDocument[]} codeblocksToSave Array containing all the codeblock documents that will be saved at the end of the process.
 * @param {number} [depth=0] Depth prevents the recursive nature of this function from running forever.
 * @param {Set<string>} [importStack=new Set()] importStack is required to check for circular imports.
 */
export async function processComponent(
  componentAbsPath: string,
  config: CUIConfig,
  library: LibraryDocument,
  processedFiles: Map<string, ComponentDocument["_id"]>,
  componentsToSave: ComponentDocument[],
  codeblocksToSave: CodeblockDocument[],
  depth: number = 0,
  importStack: Set<string> = new Set()
): Promise<ComponentDocument["_id"]> {
  if (depth > MAX_DEPTH) {
    throw new Error(
      `⛔ Max depth of ${MAX_DEPTH} reached at ${componentAbsPath}`
    );
  }

  const cachedId = processedFiles.get(componentAbsPath);
  if (cachedId) return cachedId;

  if (!fs.existsSync(componentAbsPath)) {
    throw new Error(`⛔ Dependency file not found: ${componentAbsPath}`);
  }

  if (importStack.has(componentAbsPath)) {
    throw new Error(`⛔ Circular import detected: ${componentAbsPath}`);
  }

  importStack.add(componentAbsPath);

  const componentName = basename(componentAbsPath, extname(componentAbsPath));
  const baseDir = dirname(componentAbsPath);
  const componentRelPath = convertAbsToRelPath(
    componentAbsPath,
    config.libraryOptions.baseUrl
  );

  const component = new ComponentModel({
    name: componentName,
    // Converting absolute path to relative path to save instead of absolute path
    outPath: componentRelPath,
    desc: "This is an awesome component",
    lib: library._id,
  });

  printTree(depth, {
    ID: component.id,
    OutPath: component.outPath,
    Name: component.name,
  });

  const scriptCbId = await createCodeblock(componentAbsPath, codeblocksToSave);
  if (scriptCbId) component.script = scriptCbId;
  // Detect and add styles and docs,

  const stylePattern = config.envOptions.styleModulePattern ?? "*.module.css";
  const docPattern = config.envOptions.documentationPattern ?? "*.md";

  const styleFile = join(baseDir, stylePattern.replace("*", componentName));
  const docFile = join(baseDir, docPattern.replace("*", componentName));

  component.styles = await createCodeblock(styleFile, codeblocksToSave);
  component.doc = await createCodeblock(docFile, codeblocksToSave);

  // Get the dependencies for the filePath
  const rawDependencies = await getDependencies(
    componentAbsPath,
    undefined,
    config.libraryOptions.baseUrl
  );

  // Filter out style module imports from dependencies
  const componentDependencies = filterComponentDependencies(
    rawDependencies,
    config
  );
  component.deps = componentDependencies;

  for (const localDep of componentDependencies.lcl) {
    const dependencyId = await processComponent(
      // Convert relative path to absolute path
      resolve(config.libraryOptions.baseUrl, localDep.path),
      config,
      library,
      processedFiles,
      componentsToSave,
      codeblocksToSave,
      depth + 1,
      new Set(importStack)
    );
    localDep.cmp =
      dependencyId as unknown as ComponentDocument["deps"]["lcl"][number]["cmp"];
  }

  processedFiles.set(componentAbsPath, component._id);
  componentsToSave.push(component);

  return component._id;
}
