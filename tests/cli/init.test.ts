import path, { join } from "path";
import { execa } from "execa";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import getTempDir from "../utils/getTempDir";
import fs from "fs-extra";
import { cliPath, fixturesDir } from "../utils/paths";
import { Fixture, jsxFixtures, tsxFixtures } from "../utils/fixtures";

const fixtures: Fixture[] = [
  {
    ...tsxFixtures("init_tsx"),
    configFileName: "cui.config.ts",
  },
  {
    ...jsxFixtures("init_jsx"),
    configFileName: "cui.config.mjs",
  },
];

describe.each(fixtures)(
  "Testing init command (Fixture: $name)",
  ({ name, initCommand, configFileName }) => {
    let tempDir = "";

    beforeAll(async () => {
      let fixturePath = path.join(fixturesDir, name);
      tempDir = getTempDir(`cui-test-fixture_${name}-init-`);
      await fs.copy(fixturePath, tempDir);
      await execa("pnpm", ["link", cliPath], {
        cwd: tempDir,
      });

      // Execute the command but pipe input for the prompts
      const subProcess = execa("pnpm", initCommand.args, {
        cwd: tempDir,
        stdin: "pipe",
        // stdio: ["pipe", "inherit", "inherit"], // Make stdin piped so we can write to it
      });

      // Wait for a moment to ensure the process has started
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Feed responses to the prompts
      if (subProcess.stdin) {
        for (const response of initCommand.responses) {
          subProcess.stdin.write(response);
        }
        subProcess.stdin.end();
      }

      // Wait for the process to complete
      await subProcess;
    }, 30000); // Increase timeout if needed

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
      expect(envContents).toContain("CUI_DB_URL=");
    });

    it("Creates a cui.config file in cwd", async () => {
      const configPath = join(tempDir, configFileName);
      const configExists = fs.existsSync(configPath);
      expect(configExists).toBe(true);
    });
  }
);
