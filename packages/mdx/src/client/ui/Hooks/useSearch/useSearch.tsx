"use client";

import { load, type SearchParamsFullText, search } from "@orama/orama";
import { useCallback, useEffect, useRef, useState } from "react";
import { createSearch } from "../../../../shared/search/search";
import type {
  SearchDB,
  SearchDocument,
  SearchResult,
} from "../../../../shared/search/search.types";
import type { UseSearchProps } from "./useSearch.types";

export function useSearch(props: UseSearchProps) {
  const {
    indexUrl = "/api/search",
    embedQuery,
    enabled = true,
    limit = 10,
  } = props;

  const dbRef = useRef<SearchDB | null>(null);
  const hasVectors = useRef(false); // true only if the built index contains embeddings
  const requestId = useRef(0); // drops results of outdated queries
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);

  // Fetch + load the index once
  useEffect(() => {
    if (!enabled || dbRef.current) return;
    let cancelled = false;
    (async () => {
      const data = await (await fetch(indexUrl)).json();
      // Decide from the index itself, not from embedQuery
      const v = "embedding" in (data.index?.vectorIndexes ?? {});
      const db = createSearch(v);
      load(db, data);
      if (cancelled) return;
      hasVectors.current = v;
      dbRef.current = db;
      setReady(true);
    })().catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [enabled, indexUrl]);

  const query = useCallback(
    async (term: string) => {
      const db = dbRef.current;
      const id = ++requestId.current;
      if (!db || !term.trim()) {
        setResults(null);
        setLoading(false);
        return;
      }
      setLoading(true);

      let vector: number[] | undefined;
      if (embedQuery) {
        try {
          vector = await embedQuery(term);
        } catch {
          // Fall back to full-text below
        }
      }

      const baseOptions: SearchParamsFullText<SearchDB, SearchDocument> = {
        properties: ["title", "heading", "content"],
        boost: { title: 3, heading: 2 },
        limit,
      };
      let res: SearchResult;
      try {
        res = vector
          ? await search(db, {
              term,
              ...baseOptions,
              mode: "hybrid",
              vector: { value: vector, property: "embedding" },
              similarity: 0.6,
            })
          : await search(db, { term, ...baseOptions });
      } catch (error) {
        console.error(error);
        res = await search(db, baseOptions); // full-text fallback
      }
      if (id !== requestId.current) return;
      setResults(res);
      setLoading(false);
    },
    [embedQuery, limit],
  );

  return { query, results, ready, loading };
}
