import {
  CodeblockDocument,
  ComponentDocument,
  ComponentModel,
  LibraryDocument,
} from "@cubicsui/db";
import fs from "fs-extra";
import { basename, dirname, extname, join } from "path";
import { getDependencies } from "@cubicsui/helpers";
import { CUIConfig } from "@/types/cuiConfig.js";
import { filterComponentDependencies } from "./filterComponentDependencies.js";
import createCodeblock from "./createCodeblock.js";

const MAX_DEPTH = 10;

/**
 * Recursively processes a component and its dependencies.
 * Handles circular imports and depth limits.
 */
export async function processComponent(
  filePath: string,
  config: CUIConfig,
  library: LibraryDocument,
  processedFiles: Map<string, ComponentDocument["_id"]>,
  componentsToSave: ComponentDocument[],
  codeblocksToSave: CodeblockDocument[],
  depth = 0,
  importStack: Set<string> = new Set()
): Promise<ComponentDocument["_id"]> {
  if (depth > MAX_DEPTH) {
    throw new Error(`Max depth of ${MAX_DEPTH} reached at ${filePath}`);
  }

  const cachedId = processedFiles.get(filePath);
  if (cachedId) return cachedId;

  if (!fs.existsSync(filePath)) {
    throw new Error(`Dependency file not found: ${filePath}`);
  }

  if (importStack.has(filePath)) {
    console.warn(`⚠️ Circular import detected: ${filePath}`);
    return undefined as any;
  }

  importStack.add(filePath);

  const componentName = basename(filePath, extname(filePath));
  const baseDir = dirname(filePath);

  const scriptCodeblockId = await createCodeblock(filePath, codeblocksToSave);

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
    filePath,
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
      localDep.path,
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
    outPath: filePath,
    desc: "This is an awesome component",
    deps: componentDependencies,
    lib: library._id,
    script: scriptCodeblockId,
    styles: stylesCodeblockId ?? undefined,
    doc: docsCodeblockId ?? undefined,
  });

  processedFiles.set(filePath, component._id);
  componentsToSave.push(component);

  console.log(`Staged component: ${filePath}`);

  return component._id;
}
