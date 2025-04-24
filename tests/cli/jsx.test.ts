import { resolve } from "path";
import { describe, it, expect } from "vitest";
import { execa } from "execa";
import { cliPath, jsxFixturePath } from "../utils/paths";

describe("CLI tests on fixture: jsx", () => {
  it("initialises project", async () => {
    const result = await execa("node", [cliPath, "init"], {
      cwd: jsxFixturePath,
    });
    expect(result.exitCode).toBe(0);
  });
  it("uploads component", async () => {
    const componentToUpload = resolve(jsxFixturePath, "/components/Line.jsx");
    const result = await execa("node", [cliPath, "upload", componentToUpload], {
      cwd: jsxFixturePath,
    });
    expect(result.exitCode).toBe(0);
  });
});
