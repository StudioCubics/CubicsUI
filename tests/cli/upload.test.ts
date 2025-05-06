import path, { join } from "path";
import { execa } from "execa";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import getTempDir from "../utils/getTempDir";
import fs from "fs-extra";
import { cliPath, fixturesDir } from "../utils/paths";
import { Fixture, jsxFixtures, tsxFixtures } from "../utils/fixtures";

const fixtures: Fixture[] = [
  {
    ...tsxFixtures("upload_tsx"),
    componentToUpload: "./components/Line/Line.tsx",
  },
  {
    ...jsxFixtures("upload_jsx"),
    componentToUpload: "./components/Line/Line.jsx",
  },
];

describe.each(fixtures)(
  "Testing upload command (Fixture: $name)",
  ({ name, componentToUpload, initCommand }) => {
    let tempDir = "";

    beforeAll(async () => {
      let fixturePath = path.join(fixturesDir, name);
      tempDir = getTempDir(`cui-test-fixture_${name}-upload-`);
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
    }, 30000);

    afterAll(async () => {
      if (process.env.KEEP_FIXTURE === "true") {
        console.log("Check tempDir contents here:", tempDir);
        return;
      }
      await fs.remove(tempDir);
    });

    it("Uploads a component", async () => {
      const componentPath = join(tempDir, componentToUpload);
      const result = await execa("pnpm", ["cui", "upload", componentPath], {
        cwd: tempDir,
        stdio: "inherit",
      });
      expect(result.exitCode).toBe(0);
    });
  }
);
