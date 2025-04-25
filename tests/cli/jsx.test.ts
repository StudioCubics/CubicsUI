import { join } from "path";
import {
  describe,
  it,
  expect,
  //  beforeAll, afterAll
} from "vitest";
import { execa } from "execa";
import { cliBinPath, jsxFixturePath } from "../utils/paths.js";
// import getTempDir from "../utils/getTempDir";
// import fs from "fs-extra";
// import copyFixture from "../utils/copyFixture.js";

// const backupDir = path.resolve(__dirname, "../fixtures-backup/jsx");

// TODO Fix Error: EPERM: operation not permitted, symlink created in node_modules cannot be copied to temp directory
// beforeAll(async () => {
//   await fs.remove(backupDir);
//   await fs.ensureDir(backupDir);
//   await copyFixture(jsxFixturePath, backupDir);
// });

// afterAll(async () => {
//   await fs.remove(jsxFixturePath);
//   await copyFixture(backupDir, jsxFixturePath);
//   await fs.remove(backupDir);
// });

describe("CLI tests on fixture: jsx", () => {
  const cwd = jsxFixturePath;

  it("initialises project", async () => {
    const result = await execa("node", [cliBinPath, "init"], {
      cwd,
      stdio: "inherit",
    });
    expect(result.exitCode).toBe(0);
    // TODO expect cwd to have a .env file, and the .env file should contain the CUI_DB_URI env variable.
  });
  it("uploads component", async () => {
    const componentToUpload = join(cwd, "/components/Line/Line.jsx");
    const result = await execa("node", [cliBinPath, "upload", componentToUpload], {
      cwd,
    });
    expect(result.exitCode).toBe(0);
  });
});
