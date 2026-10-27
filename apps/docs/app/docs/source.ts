import { mdxLoader } from "@cubicsui/mdx";
import { components } from "@/components";

export const mdxSource = mdxLoader({
  components,
  contentRoot: "content/docs",
  readSource: async (relPath) => {
    const mod = await import(`@/content/docs/${relPath}`);
    return mod.default;
  },
  readMeta: async (metaPath) => {
    const mod = await import(`@/content/docs/${metaPath}`);
    return mod.default;
  },
});
