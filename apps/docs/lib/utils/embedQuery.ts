"use client";

import type { FeatureExtractionPipeline } from "@huggingface/transformers";

let extractor: Promise<FeatureExtractionPipeline> | undefined;

/** Runs on the query made by the client */
export async function embedQuery(text: string): Promise<number[]> {
  extractor =
    extractor ??
    (import("@huggingface/transformers").then(({ pipeline }) =>
      pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
        dtype: "fp32", // browser defaults to quantized, which would mismatch the index
      }),
    ) as unknown as Promise<FeatureExtractionPipeline>);
  const out = await (
    await extractor
  )(text, {
    pooling: "mean",
    normalize: true,
  });
  return out.tolist()[0] as number[];
}
