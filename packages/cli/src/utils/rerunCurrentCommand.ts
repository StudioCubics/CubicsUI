import { logger } from "@/main.js";
import { spawn } from "child_process";

/**
 * Reruns the current command in a new process
 *
 * @return void
 */
export default function rerunCurrentCommand() {
  const nodeBinary = process.argv0; // Usually "node"
  const args = process.argv.slice(1); // Remove the Node binary path, keep script + args

  const child = spawn(`"${nodeBinary}"`, args, {
    stdio: "inherit",
    shell: process.platform == "win32",
  });

  child.on("error", (e) => {
    console.error(e);
  });

  child.on("exit", (code) => {
    if (code !== 0) {
      logger.failure(`Re-running init failed with exit code ${code}`);
      process.exit(code || 1);
    }
  });
}
