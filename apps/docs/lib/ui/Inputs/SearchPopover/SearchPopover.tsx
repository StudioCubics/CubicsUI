"use client";
import {
  Button,
  Kbd,
  SearchCenter,
  TextInput,
  useSidebarLayout,
} from "@cubicsui/components";
import { SearchIcon } from "@cubicsui/icons";
import { useSearch } from "@cubicsui/mdx/client";
import Link from "next/link";
import { useState } from "react";
import { embedQuery, isModelReady, warmupModel } from "@/lib/utils/embedQuery";

export function SearchPopover() {
  const [enabled, setEnabled] = useState(false);
  const { sidebarOpen } = useSidebarLayout();
  const { query, results, loading } = useSearch({
    indexUrl: "/api/search",
    embedQuery,
    enabled,
  });
  const [modelReady, setModelReady] = useState(isModelReady());
  return (
    <SearchCenter
      expandableHits
      placeholder="Search documentation"
      shortcutKey={[
        ["Control", "k"],
        ["Meta", "k"],
      ]}
      trigger={
        sidebarOpen ? (
          <TextInput
            size="sm"
            placeholder="Search documentation"
            startAdornment={<SearchIcon />}
            endAdornment={
              <Kbd
                size="sm"
                fitContent
                realistic
                grouped
                keys={["Control", "k"]}
              />
            }
          />
        ) : (
          <Button icon>
            <SearchIcon />
          </Button>
        )
      }
      hits={results?.hits ?? []}
      loading={loading || !modelReady}
      renderHit={(hit) => {
        return {
          id: hit.id,
          title: hit.document.heading,
          subtitle: hit.document.title,
          href: hit.document.url,
          desc: hit.document.content && <pre>{hit.document.content}</pre>,
        };
      }}
      LinkComponent={Link}
      onChange={(e) => query(e.target.value)}
      onDialogOpen={() => {
        setEnabled((p) => !p);
        if (modelReady) return;
        warmupModel()
          .then(() => setModelReady(true))
          .catch(() => {});
      }}
    />
  );
}
