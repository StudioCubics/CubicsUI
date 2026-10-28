import path from "node:path";
import { glob } from "glob";
import type { Context } from "./types.js";
import { createContext } from "./utils/createContext.js";
import { processCategoryMdx } from "./utils/processCategoryMDX.js";
import { processComponentMdx } from "./utils/processComponentMDX.js";
import { processPkgMDX } from "./utils/processPkgMDX.js";

async function main() {
  const pkgs: string[] = [
    "components",
    "hooks",
    "icons",
    "mdx",
    "types",
    "utils",
  ];
  for (let i = 0; i < pkgs.length; i++) {
    const pkg = pkgs[i];
    if (!pkg) continue;

    const context: Context = createContext(pkg);
    const { pkgDetails, docBaseUrl } = context;
    console.log(`\nSyncing the following docs -> ${docBaseUrl}\n`);

    const mdxFiles = await glob("**/*.mdx", {
      cwd: pkgDetails.docSrcPath,
      absolute: true,
    });

    for (const mdxPath of mdxFiles) {
      const basename = path.basename(mdxPath);
      switch (basename) {
        case "_pkg.mdx":
          console.log(`(pkg)`);
          processPkgMDX(mdxPath, context);
          break;
        case "_category.mdx":
          console.log(`(category)`);
          processCategoryMdx(mdxPath, context);
          break;
        default:
          console.log(`(component)`);
          processComponentMdx(mdxPath, context);
          break;
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
