import {
  type FeatureExtractionPipeline,
  pipeline,
} from "@huggingface/transformers";

let extractor: Promise<FeatureExtractionPipeline> | undefined;

/** Runs on the embed field in source.ts for all the docs */
export async function embedDocs(texts: string[]): Promise<number[][]> {
  extractor =
    extractor ??
    (pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
      dtype: "fp32", // must match embedQuery
    }) as unknown as Promise<FeatureExtractionPipeline>);
  const out = await (
    await extractor
  )(texts, {
    pooling: "mean",
    normalize: true,
  });
  return out.tolist() as number[][];
}
