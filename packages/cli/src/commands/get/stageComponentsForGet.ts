import { printTree } from "@/utils/print.js";
import { ComponentDocument, ComponentModel } from "@cubicsui/db";

const MAX_DEPTH = 10;

/**
 * Recursively stages components for download by traversing their local dependencies.
 *
 * @param component - The root component to stage.
 * @param componentsToDownload - An array to collect components that need to be downloaded.
 * @param depth - The current depth of the recursion (default is 0).
 * @param cache - A set to track already processed component IDs to avoid duplication (default is an empty set).
 */
export default async function stageComponents(
  component: ComponentDocument,
  componentsToDownload: ComponentDocument[],
  depth: number = 0,
  cache: Set<string> = new Set()
) {
  if (cache.has(component.id)) return;

  if (depth > MAX_DEPTH)
    throw new Error(`⛔ Max depth of ${MAX_DEPTH} reached!`);

  printTree(1, {
    ID: component.id,
    OutPath: component.outPath,
    Name: component.name,
  });
  for (const localDep of component.deps.lcl) {
    const localDepComponent = await ComponentModel.findById(
      localDep.cmp
    ).exec();
    if (localDepComponent) {
      await stageComponents(
        localDepComponent,
        componentsToDownload,
        depth++,
        cache
      );
    } else
      console.warn(
        `🔔 Component ${component.name}'s local dependency (${localDep.value}) is missing from the database `
      );
  }

  cache.add(component.id);
  componentsToDownload.push(component);
}
