import { mdxLoader } from "@cubicsui/mdx";

export const mdxSource = mdxLoader({
  contentRoot: "content/docs",
  readSource: async (relPath) => {
    const mod = await import(`@/content/docs/${relPath}`);
    return mod.default as string;
  },
  readMeta: async (metaPath) => {
    const mod = await import(`@/content/docs/${metaPath}`);
    return mod.default;
  },
});
