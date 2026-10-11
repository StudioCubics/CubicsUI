import { defineConfig } from "tsdown";
import { glob } from "glob";
import { dirname } from "node:path/posix";

export default defineConfig({
  entry: ["src/index.ts"],
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
      "@cubicsui/components",
      "@cubicsui/hooks",
      "@cubicsui/icons",
      "@cubicsui/utils",
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
