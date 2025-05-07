const fs = require("fs-extra");
const path = require("path");
const cp = require("child_process");
const perf = require("perf_hooks");
const updateStats = require("./utils.js");

(async function main() {
  try {
    const pkgPath = process.argv[2];
    if (!pkgPath) throw new Error("Missing package path");

    const config = await fs.readJson(path.join("build.config.json"));

    const results = [];
    const start = perf.performance.now();

    for (const { label, command } of config.build) {
      try {
        const t0 = perf.performance.now();
        cp.execSync(command, { stdio: "inherit" });
        const t1 = (perf.performance.now() - t0) / 1000;
        results.push({
          step: label,
          timeMs: +t1.toFixed(3),
        });
        console.log(`✔ ${label} completed in ${t1.toFixed(3)} s`);
      } catch (error) {
        console.error(`✖ ${label} failed: ${error.message}`);
        process.exit(1);
      }
    }

    const totalTime = (perf.performance.now() - start) / 1000;

    await updateStats(pkgPath, "buildStats", {
      "Build Steps": results,
      "Total time (s)": +totalTime.toFixed(3),
    });

    console.log("\n📦 Build Summary:");
    console.log(`🕒 Total time: ${totalTime.toFixed(3)} s`);
    console.log("✅ Successfully built package!\n");
  } catch (err) {
    console.error("Unexpected error:", err);
    process.exit(1);
  }
})();
