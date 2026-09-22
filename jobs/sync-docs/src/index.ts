import path from "path";
import { glob } from "glob";
import { getPackageDetails } from "./utils/getPackageDetails.js";
import { repoRoot } from "./constants/global.js";
import ts from "typescript";
import type { Context } from "./types.js";
import { processCategoryMdx } from "./utils/processCategoryMDX.js";
import { processComponentMdx } from "./utils/processComponentMDX.js";
import { getDocDetails } from "./utils/getDocDetails.js";
import { writeFileSync } from "fs";

async function main() {
  console.log("Initialising!\n");
  const t0 = performance.now();

  const pkg = "components";
  const pkgDir = path.resolve(repoRoot, "packages");
  const pkgDetails = getPackageDetails(pkg, pkgDir);
  const docDetails = getDocDetails(pkg);

  const t1 = performance.now();
  console.log(`Initialised Details in ${t1 - t0} ms`);

  const configFile = ts.readConfigFile(
    pkgDetails.tsConfigPath,
    ts.sys.readFile,
  );

  const t2 = performance.now();
  console.log(`Read config files in ${t2 - t1} ms`);

  const { options, fileNames } = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(pkgDetails.tsConfigPath),
  );

  const t3 = performance.now();
  console.log(`Parsed json config in ${t3 - t2} ms`);

  const program = ts.createProgram(fileNames, {
    ...options,
    skipLibCheck: true,
    noEmit: true,
    skipDefaultLibCheck: true,
    noLib: true,
  });

  const t4 = performance.now();
  console.log(`Created program in ${t4 - t3} ms`);

  const checker = program.getTypeChecker();

  const t5 = performance.now();
  console.log(`Got type checker in ${t5 - t4} ms`);

  console.log(`Initialised in ${t5 - t0} ms`);

  const context: Context = {
    pkg,
    pkgDir,
    pkgDetails,
    docDetails,
    program,
    checker,
    componentsMeta: [],
  };

  console.log(`\nSyncing docs -> ${docDetails.docRoot}\n`);

  const mdxFiles = await glob("**/*.mdx", {
    cwd: pkgDetails.docSrcPath,
    absolute: true,
  });

  for (const mdxPath of mdxFiles) {
    const basename = path.basename(mdxPath);

    if (basename === "_category.mdx") {
      processCategoryMdx(mdxPath, context);
    } else {
      processComponentMdx(mdxPath, context);
    }
  }
  const metaOutPath = path.join(docDetails.docRoot, "meta.tsx");
  const metaContent = `import type { ListItemProps } from "@cubicsui/components";

export const ${pkg}Meta: ListItemProps[] = ${JSON.stringify(context.componentsMeta, null, 2)};
`;
  writeFileSync(metaOutPath, metaContent);
  console.log(`\nDone in ${performance.now() - t0} ms\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
