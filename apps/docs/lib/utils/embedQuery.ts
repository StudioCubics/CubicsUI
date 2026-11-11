"use client";

import type { FeatureExtractionPipeline } from "@huggingface/transformers";

let extractor: Promise<FeatureExtractionPipeline> | undefined;
let loaded: FeatureExtractionPipeline | undefined; // set once the model is ready

/** Starts the model download without waiting for it */
export function warmupModel() {
  extractor =
    extractor ??
    import("@huggingface/transformers")
      .then(({ pipeline }) =>
        pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
          dtype: "fp32", // must match embedDocs
        }),
      )
      .then((p) => {
        loaded = p as unknown as FeatureExtractionPipeline;
        return loaded;
      })
      .catch((e) => {
        extractor = undefined; // allow a retry later
        throw e;
      });
  extractor.catch(() => {}); // avoid unhandled rejection from the fire-and-forget call
  return extractor;
}

/** True once the model has finished downloading */
export const isModelReady = () => !!loaded;

/** Only embeds if the model is ready, otherwise returns undefined instantly */
export async function embedQuery(text: string): Promise<number[] | undefined> {
  if (!loaded) return undefined;
  const out = await loaded(text, { pooling: "mean", normalize: true });
  return out.tolist()[0] as number[];
}
