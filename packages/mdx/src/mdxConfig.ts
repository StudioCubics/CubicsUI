import { createRequire } from "node:module";
import type { NextConfig } from "next";

const require = createRequire(import.meta.url);

export function mdxConfig(next: NextConfig): NextConfig {
  return {
    ...next,
    turbopack: {
      ...next.turbopack,
      rules: {
        ...next.turbopack?.rules,
        "*.mdx": {
          loaders: [require.resolve("raw-loader")],
          as: "*.js",
        },
      },
    },
  };
}
