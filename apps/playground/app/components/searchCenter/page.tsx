"use client";

import {
  Kbd,
  ListItem,
  PageLayout,
  SearchCenter,
  TextInput,
  type TextInputProps,
} from "@cubicsui/components";
import { SearchIcon } from "@cubicsui/icons";
import { useState } from "react";

interface DocItem {
  id: string;
  title: string;
  category: string;
  summary?: string;
  url: string;
  thumbnail?: string;
}

const MOCK_DOCS: DocItem[] = [
  {
    id: "1",
    title: "Getting Started",
    category: "Guide",
    summary: "Install @cubicsui/components and configure your theme provider.",
    url: "#getting-started",
    thumbnail: "/images/landscapeSample.jpg",
  },
  {
    id: "2",
    title: "SearchCenter",
    category: "Component • Inputs",
    summary:
      "Modal search dialog with keyboard shortcut trigger and custom hit rendering.",
    url: "#search-center",
    thumbnail: "/images/potraitSample.jpg",
  },
  {
    id: "3",
    title: "Dialog",
    category: "Component • Layout",
    summary:
      "Accessible modal overlay built on the native HTML dialog element.",
    url: "#dialog",
  },
  {
    id: "4",
    title: "useDisclosure",
    category: "Hook",
    url: "#use-disclosure",
    thumbnail: "/images/landscapeSample.jpg",
  },
];
function Trigger(props: TextInputProps) {
  return (
    <TextInput
      size="sm"
      placeholder="Search documentation"
      startAdornment={<SearchIcon />}
      {...props}
    />
  );
}
export default function Page() {
  const [query, setQuery] = useState("");

  const filteredDocs = MOCK_DOCS.filter(
    (doc) =>
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.category.toLowerCase().includes(query.toLowerCase()) ||
      doc.summary?.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <PageLayout title={<code>{"<SearchCenter/>"}</code>}>
      <h2>Interactive Usage (Object Mapping)</h2>
      <p>
        Filters live results and returns a <code>SearchHitProps</code> object
        from <code>renderHit</code>. Includes items with and without images.
      </p>
      <SearchCenter
        trigger={
          <Trigger
            endAdornment={
              <Kbd
                size="sm"
                fitContent
                realistic
                grouped
                keys={["Control", "m"]}
              />
            }
          />
        }
        hits={filteredDocs}
        shortcutKey={["Control", "m"]}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search components, hooks, guides..."
        renderHit={(hit) => ({
          id: hit.id,
          href: hit.url,
          title: hit.title,
          subtitle: hit.category,
          desc: hit.summary,
          img: hit.thumbnail,
        })}
      />

      <h2>
        <code>expandableHits</code>
      </h2>
      <SearchCenter
        trigger={<Trigger />}
        hits={filteredDocs}
        value={query}
        expandableHits
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search components, hooks, guides..."
        renderHit={(hit) => ({
          id: hit.id,
          href: hit.url,
          title: hit.title,
          subtitle: hit.category,
          desc: hit.summary,
          img: hit.thumbnail,
        })}
      />
      <h2>Custom Hit Element</h2>
      <p>
        Returns a custom <code>ReactElement</code> directly from{" "}
        <code>renderHit</code> instead of using the default{" "}
        <code>SearchHit</code> layout.
      </p>
      <SearchCenter
        trigger={<Trigger />}
        hits={MOCK_DOCS}
        placeholder="Custom hit layout..."
        renderHit={(hit) => (
          <ListItem key={hit.id} href={hit.url}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <strong>{hit.title}</strong>
              <code>{hit.category}</code>
            </div>
          </ListItem>
        )}
      />

      <h2>Input Variants & Adornments</h2>
      <p>
        Tests forwarded <code>TextInputProps</code> like <code>size="md"</code>,{" "}
        <code>fullWidth</code>, and custom adornments.
      </p>
      <SearchCenter
        trigger={<Trigger />}
        hits={MOCK_DOCS}
        size="md"
        fullWidth
        placeholder="Full width medium input..."
        startAdornment={<span>Docs</span>}
        endAdornment={<span>v1.0</span>}
        renderHit={(hit) => ({
          id: hit.id,
          href: hit.url,
          title: hit.title,
          subtitle: hit.category,
        })}
      />
    </PageLayout>
  );
}
