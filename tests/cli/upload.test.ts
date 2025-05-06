import path, { join } from "path";
import { execa } from "execa";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import getTempDir from "../utils/getTempDir";
import fs from "fs-extra";
import { cliPath, fixturesDir } from "../utils/paths";

const fixtures = [
  { name: "tsx", componentToUpload: "./components/Line/Line.tsx" },
  { name: "jsx", componentToUpload: "./components/Line/Line.jsx" },
];

describe.each(fixtures)(
  "Testing upload command (Fixture: $name)",
  ({ name, componentToUpload }) => {
    let tempDir = "";

    beforeAll(async () => {
      let fixturePath = path.join(fixturesDir, name);
      tempDir = getTempDir(`cui-test-fixture_${name}-upload-`);
      await fs.copy(fixturePath, tempDir);
      await execa("pnpm", ["link", cliPath], {
        cwd: tempDir,
      });
      await execa("pnpm", ["cui", "init", "--lib", `@cubicsui/${name}`], {
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
