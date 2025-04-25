import { execa } from "execa";
import fs from "fs-extra";
import { cliPath } from "./paths.js";

export async function beforeAllOnFixture(tempDir: string, fixturePath: string) {
  await fs.copy(fixturePath, tempDir);
  await execa("pnpm", ["link", cliPath], {
    cwd: tempDir,
  });
}

export async function afterAllOnFixture(tempDir: string) {
  if (process.env.KEEP_FIXTURE === "true") {
    console.log("Check tempDir contents here:", tempDir);
    return;
  }
  await fs.remove(tempDir);
}
