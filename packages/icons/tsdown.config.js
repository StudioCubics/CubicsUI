import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: true,
  clean: false,
  // TODO remove all use of ComponentProps as that is making build slow
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
    ],
  },
});
