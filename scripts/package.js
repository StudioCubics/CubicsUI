const fs = require("fs-extra");
const cp = require("child_process");
const updateStats = require("./utils.js");

(async function main() {
  try {
    const pkgPath = process.argv[2];
    if (!pkgPath) throw new Error("Missing package path");

    const output = cp.execSync("pnpm pack --json", { encoding: "utf-8" });

    const parsedOutput = JSON.parse(output);

    let unpackedSize = 0;
    let totalFiles = 0;
    let largestFile = { path: "", size: 0 };

    parsedOutput.files.forEach(({ path }) => {
      const size = fs.statSync(path).size;
      unpackedSize = unpackedSize + size;
      totalFiles++;
      if (size > largestFile.size) largestFile = { path, size };
    });

    const stats = {
      Name: parsedOutput.name,
      Version: parsedOutput.version,
      "Package Size": convertTokB(fs.statSync(parsedOutput.filename).size),
      "Unpacked Size": convertTokB(unpackedSize),
      "Total Files": totalFiles,
      "Largest File": `${largestFile.path} (${convertTokB(largestFile.size)} kB)`,
    };
    await updateStats(pkgPath, "packageStats", stats);

    await fs.remove(parsedOutput.filename);

    console.log(`📦 Package ${stats.Name}-${stats.Version} statistics`);
    for (const stat in stats) {
      console.log(stat, ":", stats[stat]);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    process.exit(1);
  }
})();
function convertTokB(bytes) {
  return `${(bytes / 1000).toFixed(3)} kB`;
}
