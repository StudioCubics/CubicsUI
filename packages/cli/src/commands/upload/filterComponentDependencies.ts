import { CUIConfig } from "@/types/cuiConfig.js";
import { Dependencies } from "@cubicsui/db";

/**
 * Filters out style and doc module files from the local dependencies list.
 * This prevents duplicate component creation for those files.
 *
 * @param deps - The dependencies result returned from `getDependencies`.
 * @param config - The current CUI configuration object.
 * @returns A new DependencyResult object with filtered local dependencies.
 */
export function filterComponentDependencies(
  deps: Dependencies,
  config: CUIConfig
): Dependencies {
  const stylePattern = config.envOptions.styleModulePattern ?? "*.module.css";
  const docPattern = config.envOptions.documentationPattern ?? "*.md";

  const styleRegex = new RegExp(
    stylePattern.replace(".", "\\.").replace("*", ".*") + "$"
  );
  const docRegex = new RegExp(
    docPattern.replace(".", "\\.").replace("*", ".*") + "$"
  );

  return {
    ...deps,
    lcl: deps.lcl.filter(
      (dep) => !styleRegex.test(dep.value) && !docRegex.test(dep.value)
    ),
  };
}
