import { components } from "@/lib/mdx/components";
import { mdxLoader } from "@cubicsui/mdx";

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
