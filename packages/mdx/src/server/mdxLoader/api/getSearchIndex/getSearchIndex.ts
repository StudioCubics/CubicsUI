import { insertMultiple, type RawData, save } from "@orama/orama";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { createSearch } from "../../../../shared/search/search";
import type { MDXFrontmatter, MDXLoaderContext } from "../../mdxLoader.types";
import { chunkBody } from "./getSearchIndex.utils";

export function createGetSearchIndex(ctx: MDXLoaderContext) {
  const { pageSlugs, readSource, basePath, embed } = ctx;
  let cached: Promise<RawData> | undefined; // build once per process

  async function build() {
    const docs: {
      title: string;
      heading: string;
      content: string;
      url: string;
      embedding?: number[];
    }[] = [];

    for (const slug of pageSlugs) {
      let source: string;
      try {
        source = await readSource(`${slug}/page.mdx`);
      } catch {
        continue;
      }
      const { frontmatter, strippedSource } =
        getFrontmatter<Partial<MDXFrontmatter>>(source);
      const title = frontmatter.title ?? slug;
      const page = `${basePath}/${slug}`;

      for (const c of chunkBody(strippedSource)) {
        docs.push({
          title,
          heading: c.heading,
          content: c.content,
          url: c.id ? `${page}#${c.id}` : page,
        });
      }
    }

    if (embed) {
      const BATCH = 32;
      for (let i = 0; i < docs.length; i += BATCH) {
        const batch = docs.slice(i, i + BATCH);
        const vectors = await embed(
          batch.map((d) => `${d.title} > ${d.heading}\n${d.content}`),
        );
        batch.forEach((d, j) => {
          d.embedding = vectors[j];
        });
      }
    }

    const db = createSearch(!!embed);
    await insertMultiple(db, docs);
    return save(db);
  }

  return function getSearchIndex() {
    cached = cached ?? build();
    return cached;
  };
}
