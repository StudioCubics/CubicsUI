import { create } from "@orama/orama";
import type { SearchDB } from "./search.types";

export const EMBEDDING_DIMS = 384;

export const searchSchemaFullText = {
  title: "string",
  heading: "string",
  content: "string",
  url: "string",
} as const;

export const searchSchema = {
  ...searchSchemaFullText,
  embedding: `vector[${EMBEDDING_DIMS}]`,
} as const;

export function createSearch(hasVectors?: boolean): SearchDB {
  const createOptions = {
    schema: hasVectors ? searchSchema : searchSchemaFullText,
    sort: { enabled: false },
  };
  return create(createOptions);
}
