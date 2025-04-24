import { resolve } from "path";
import { describe, it, expect } from "vitest";
import { execa } from "execa";
import { cliPath, tsxFixturePath } from "../utils/paths";

describe("CLI tests on fixture: tsx", () => {
  it("initialises project", async () => {
    const result = await execa("node", [cliPath, "init"], {
      cwd: tsxFixturePath,
    });
    expect(result.exitCode).toBe(0);
  });
  it("uploads component", async () => {
    const componentToUpload = resolve(tsxFixturePath, "/components/Line.tsx");
    const result = await execa("node", [cliPath, "upload", componentToUpload], {
      cwd: tsxFixturePath,
    });
    expect(result.exitCode).toBe(0);
  });
});
