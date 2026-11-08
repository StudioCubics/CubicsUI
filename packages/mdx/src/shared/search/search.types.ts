import type { Orama, Results, TypedDocument } from "@orama/orama";
import type { searchSchemaFullText } from "./search";

// Text-only is a subset of the full schema, so one type covers both
export type SearchDB = Orama<typeof searchSchemaFullText>;

export type SearchResult = Results<SearchDocument>;

export type SearchDocument = TypedDocument<SearchDB>;
