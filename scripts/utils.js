const fs = require("fs-extra");
const prettier = require("prettier");

const STATS_PATH = "../../stats.json";

async function updateStats(pkgPath, key, data) {
  const id = pkgPath.replace(/^\.?\/?packages\//, "").replace(/\//g, ":");
  const existing = (await fs.pathExists(STATS_PATH))
    ? await fs.readJson(STATS_PATH)
    : {};

  existing[id] = { ...existing[id], [key]: data };
  const pretty = await prettier.format(JSON.stringify(existing), { parser: "json" });
  await fs.outputFile(STATS_PATH, pretty);
}
module.exports = updateStats;
