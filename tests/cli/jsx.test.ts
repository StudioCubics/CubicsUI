import { join } from "path";
import {
  describe,
  it,
  expect,
  //  beforeAll, afterAll
} from "vitest";
import { execa } from "execa";
import { cliPath, jsxFixturePath } from "../utils/paths.js";
// import getTempDir from "../utils/getTempDir";
// import fs from "fs-extra";

// let tempDir = "";

// TODO Fix Error: EPERM: operation not permitted, symlink created in node_modules cannot be copied to temp directory
// beforeAll(async () => {
//   tempDir = getTempDir("tmp-jsx-");
//   await fs.copy(jsxFixturePath, tempDir);
// });

// afterAll(async () => {
//   await fs.remove(tempDir);
// });

describe("CLI tests on fixture: jsx", () => {
  const cwd = jsxFixturePath;

  it("initialises project", async () => {
    const result = await execa("node", [cliPath, "init"], {
      cwd,
      stdio: "inherit",
    });
    expect(result.exitCode).toBe(0);
    // TODO expect cwd to have a .env file, and the .env file should contain the CUI_DB_URI env variable.
  });
  it("uploads component", async () => {
    const componentToUpload = join(cwd, "/components/Line/Line.jsx");
    const result = await execa("node", [cliPath, "upload", componentToUpload], {
      cwd,
    });
    expect(result.exitCode).toBe(0);
  });
});
