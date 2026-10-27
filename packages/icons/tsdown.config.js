import { dirname } from "node:path/posix";
import { glob } from "glob";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/registry.ts"],
  format: ["esm"],
  sourcemap: true,
  clean: false,
  dts: true,
  minify: true,
  treeshake: true,
  unbundle: true,
  deps: {
    neverBundle: [
      "react/jsx-runtime",
      "react",
      "react-dom",
      "@types/react",
      "@types/react-dom",
      /\.module\.css$/,
    ],
  },
  copy: async () => {
    const cssFiles = await glob("src/**/*.module.css");
    return cssFiles.map((rawFrom) => {
      const from = rawFrom.replace(/\\/g, "/");
      return { from, to: dirname(from.replace("src/", "dist/")) };
    });
  },
});
