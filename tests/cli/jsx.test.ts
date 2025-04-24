import { resolve } from "path";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { execa } from "execa";
import { cliPath, jsxFixturePath } from "../utils/paths";
import getTempDir from "../utils/getTempDir";
import fs from "fs-extra";

let tempDir = "";

beforeAll(async () => {
  tempDir = getTempDir("tmp-jsx-");
  await fs.copy(jsxFixturePath, tempDir);
});

afterAll(async () => {
  await fs.remove(tempDir);
});

describe("CLI tests on fixture: jsx", () => {
  it("initialises project", async () => {
    const result = await execa("node", [cliPath, "init"], {
      cwd: tempDir,
    });
    expect(result.exitCode).toBe(0);
  });
  it("uploads component", async () => {
    const componentToUpload = resolve(tempDir, "/components/Line.jsx");
    const result = await execa("node", [cliPath, "upload", componentToUpload], {
      cwd: tempDir,
    });
    expect(result.exitCode).toBe(0);
  });
});
