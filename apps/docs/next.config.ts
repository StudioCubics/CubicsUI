import { mdxConfig } from "@cubicsui/mdx/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = mdxConfig({
  reactCompiler: true,
  typedRoutes: true,
});

export default nextConfig;
