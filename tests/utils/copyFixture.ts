import path from "path";
import fs from "fs-extra";

const ignored = ["node_modules"];

export default async function copyFixture(srcDir: string, destDir: string) {
  const entries = await fs.readdir(srcDir);
  await fs.ensureDir(destDir);

  for (const entry of entries) {
    if (ignored.includes(entry)) continue;

    const srcPath = path.join(srcDir, entry);
    const destPath = path.join(destDir, entry);

    const stats = await fs.stat(srcPath);
    if (stats.isDirectory()) {
      await copyFixture(srcPath, destPath);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }
}
