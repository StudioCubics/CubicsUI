import path, { join } from "path";
import { execa } from "execa";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import getTempDir from "../utils/getTempDir";
import fs from "fs-extra";
import { cliPath, fixturesDir } from "../utils/paths";

const fixtures = [{ name: "tsx" }, { name: "jsx" }];

describe.each(fixtures)("Testing init command (Fixture: $name)", ({ name }) => {
  let tempDir = "";

  beforeAll(async () => {
    let fixturePath = path.join(fixturesDir, name);
    tempDir = getTempDir(`cui-test-fixture_${name}-init-`);
    await fs.copy(fixturePath, tempDir);
    await execa("pnpm", ["link", cliPath], {
      cwd: tempDir,
    });
    await execa("pnpm", ["cui", "init", "--lib", `@cubicsui/init`], {
      cwd: tempDir,
    });
  });

  afterAll(async () => {
    if (process.env.KEEP_FIXTURE === "true") {
      console.log("Check tempDir contents here:", tempDir);
      return;
    }
    await fs.remove(tempDir);
  });

  it("Creates a .env file with expected keys", async () => {
    const envFilePath = join(tempDir, ".env");
    const envFileExists = fs.existsSync(envFilePath);
    expect(envFileExists).toBe(true);
    const envContents = await fs.readFile(envFilePath, "utf-8");
    expect(envContents).toContain("CUI_DB_URI=");
  });

  it("Creates a cui.config file in cwd", async () => {
    const configPath = join(
      tempDir,
      name == "tsx" ? "cui.config.ts" : "cui.config.mjs"
    );
    const configExists = fs.existsSync(configPath);
    expect(configExists).toBe(true);
  });
});
