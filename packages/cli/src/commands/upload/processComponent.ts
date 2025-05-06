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

const MAX_DEPTH = 10;

/**
 * Recursively processes a component and its dependencies.
 * Handles circular imports and depth limits.
 */
export async function processComponent(
  componentAbsPath: string,
  config: CUIConfig,
  library: LibraryDocument,
  processedFiles: Map<string, ComponentDocument["_id"]>,
  componentsToSave: ComponentDocument[],
  codeblocksToSave: CodeblockDocument[],
  depth = 0,
  importStack: Set<string> = new Set()
): Promise<ComponentDocument["_id"]> {
  if (depth > MAX_DEPTH) {
    throw new Error(`Max depth of ${MAX_DEPTH} reached at ${componentAbsPath}`);
  }

  const cachedId = processedFiles.get(componentAbsPath);
  if (cachedId) return cachedId;

  if (!fs.existsSync(componentAbsPath)) {
    throw new Error(`⚠ Dependency file not found: ${componentAbsPath}`);
  }

  if (importStack.has(componentAbsPath)) {
    console.warn(`⚠ Circular import detected: ${componentAbsPath}`);
    return undefined as any;
  }

  importStack.add(componentAbsPath);

  const componentName = basename(componentAbsPath, extname(componentAbsPath));
  const baseDir = dirname(componentAbsPath);

  const scriptCodeblockId = await createCodeblock(
    componentAbsPath,
    codeblocksToSave
  );

  // Detect and add styles and docs,
  // and remove from componentDependencies if these are imported in the component,
  // based on pattern from config
  const stylePattern = config.envOptions.stylePattern ?? "*.module.css";
  const docPattern = config.envOptions.documentationPattern ?? "*.md";

  const styleFile = join(baseDir, stylePattern.replace("*", componentName));
  const docFile = join(baseDir, docPattern.replace("*", componentName));

  const stylesCodeblockId = await createCodeblock(styleFile, codeblocksToSave);
  const docsCodeblockId = await createCodeblock(docFile, codeblocksToSave);

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

  const component = new ComponentModel({
    name: componentName,
    // Converting absolute path to relative path to save instead of absolute path
    outPath: convertAbsToRelPath(
      componentAbsPath,
      config.libraryOptions.baseUrl
    ),
    desc: "This is an awesome component",
    deps: componentDependencies,
    lib: library._id,
    script: scriptCodeblockId,
    styles: stylesCodeblockId ?? undefined,
    doc: docsCodeblockId ?? undefined,
  });

  processedFiles.set(componentAbsPath, component._id);
  componentsToSave.push(component);

  console.log(`Staged component: ${componentAbsPath}`);

  return component._id;
}
