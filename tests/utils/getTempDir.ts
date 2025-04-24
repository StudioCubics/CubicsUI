import path from "path";
import fs from "fs-extra";
import os from "os";

export default function getTempDir(dirName: string) {
  return fs.mkdtempSync(path.join(os.tmpdir(), dirName));
}
