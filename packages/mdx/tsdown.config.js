import { dirname } from "node:path/posix";
import { glob } from "glob";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/mdxConfig.ts"],
  format: ["esm"],
  sourcemap: true,
  clean: false,
  dts: true,
  minify: false,
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
      "@monaco-editor/react",
      "gray-matter",
      "next-mdx-remote-client",
      "raw-loader",
      "react-live",
      "rehype-mdx-code-props",
      "rehype-slug",
      "remark-flexible-toc",
      "remark-gfm",
      "sucrase",
      "next",
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
