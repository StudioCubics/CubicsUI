export interface UseSearchProps {
  /** Route that serves the index built by `getSearchIndex` */
  indexUrl: string;
  /**
   * Embeds the query with the SAME model used at build time.
   * Providing it means the index was built with vectors and enables hybrid search.
   * If it throws (e.g. model still loading), search falls back to full-text.
   */
  embedQuery?: (text: string) => Promise<number[]>;
  /** Only fetch the index when true, e.g. while the dialog is open */
  enabled?: boolean;
  limit?: number;
}
