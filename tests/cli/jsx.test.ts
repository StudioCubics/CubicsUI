import { join } from "path";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { execa } from "execa";
import { jsxFixturePath } from "../utils/paths.js";
import getTempDir from "../utils/getTempDir.js";
import {
  afterAllOnFixture,
  beforeAllOnFixture,
} from "../utils/fixtureSetup.js";

let tempDir = "";

beforeAll(async () => {
  tempDir = getTempDir("cui-test-fixure-jsx-");
  await beforeAllOnFixture(tempDir, jsxFixturePath);
});

afterAll(async () => {
  await afterAllOnFixture(tempDir);
});

describe("CLI tests on fixture: jsx", () => {
  it("initialises project", async () => {
    const result = await execa("pnpm", ["cui", "init"], {
      cwd: tempDir,
    });
    expect(result.exitCode).toBe(0);
    // TODO expect cwd to have a .env file, and the .env file should contain the CUI_DB_URI env variable.
  });
  it("uploads component", async () => {
    const componentToUpload = join(tempDir, "/components/Line/Line.jsx");
    const result = await execa("pnpm", ["cui", "upload", componentToUpload], {
      cwd: tempDir,
    });
    expect(result.exitCode).toBe(0);
  });
});
