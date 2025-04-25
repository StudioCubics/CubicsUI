import { join } from "path";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { execa } from "execa";
import { tsxFixturePath } from "../utils/paths.js";
import getTempDir from "../utils/getTempDir.js";
import {
  afterAllOnFixture,
  beforeAllOnFixture,
} from "../utils/fixtureSetup.js";

let tempDir = "";

beforeAll(async () => {
  tempDir = getTempDir("cui-test-fixure-tsx-");
  await beforeAllOnFixture(tempDir, tsxFixturePath);
});

afterAll(async () => {
  await afterAllOnFixture(tempDir);
});

describe("CLI tests on fixture: tsx", () => {
  it("initialises project", async () => {
    const result = await execa("pnpm", ["cui", "init"], {
      cwd: tempDir,
    });
    expect(result.exitCode).toBe(0);
  });
  it("uploads component", async () => {
    const componentToUpload = join(tempDir, "/components/Line/Line.tsx");
    const result = await execa("pnpm", ["cui", "upload", componentToUpload], {
      cwd: tempDir,
    });
    expect(result.exitCode).toBe(0);
  });
});
