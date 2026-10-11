import path from "path";
import { fileURLToPath } from "url";

export const filename = fileURLToPath(import.meta.url);
export const dirname = path.dirname(filename);
export const tsConfigPath = path.resolve(dirname, "../tsconfig.json");
// scripts/sync-docs/src/configs/ -> up 4 levels -> monorepo root
export const repoRoot = path.resolve(dirname, "../../../../");
export const dfName = "page";
export const banner=`
{/* 
-----------------------------IMPORTANT:-----------------------------
This was automatically generated, dont modify any code here, as this
will be replaced whenever sync-docs job runs.
*/}\n
`