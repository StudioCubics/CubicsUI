import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactCompiler: true,
  typedRoutes: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-gfm",
      "remark-frontmatter", // must come before remark-mdx-frontmatter
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
    rehypePlugins: ["rehype-mdx-code-props"],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
