import { join } from "path";
import {
  describe,
  it,
  expect,
  //  afterAll, beforeAll
} from "vitest";
import { execa } from "execa";
import { cliBinPath, tsxFixturePath } from "../utils/paths.js";
// import getTempDir from "../utils/getTempDir";
// import fs from "fs-extra";
// import copyFixture from "../utils/copyFixture.js";

// const backupDir = path.resolve(__dirname, "../fixtures-backup/jsx");

// // TODO Fix Error: EPERM: operation not permitted, symlink created in node_modules cannot be copied to temp directory
// beforeAll(async () => {
//   await fs.remove(backupDir);
//   await fs.ensureDir(backupDir);
//   await copyFixture(tsxFixturePath, backupDir);
// });

// afterAll(async () => {
//   await fs.remove(tsxFixturePath);
//   await copyFixture(backupDir, tsxFixturePath);
//   await fs.remove(backupDir);
// });

// let tempDir = "";

// TODO Fix Error: EPERM: operation not permitted, symlink created in node_modules cannot be copied to temp directory
// beforeAll(async () => {
//   tempDir = getTempDir("tmp-tsx-");
//   await fs.copy(tsxFixturePath, tempDir);
// });

// afterAll(async () => {
//   await fs.remove(tempDir);
// });

describe("CLI tests on fixture: tsx", () => {
  const cwd = tsxFixturePath;

  it("initialises project", async () => {
    const result = await execa("node", [cliBinPath, "init"], {
      cwd,
      stdio: "inherit",
    });
    expect(result.exitCode).toBe(0);
  });
  it("uploads component", async () => {
    const componentToUpload = join(cwd, "/components/Line/Line.tsx");
    const result = await execa("node", [cliBinPath, "upload", componentToUpload], {
      cwd,
    });
    expect(result.exitCode).toBe(0);
  });
});
