"use client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Popover,
  TextInput,
} from "@cubicsui/components";
import { useDisclosure } from "@cubicsui/hooks";
import { SearchIcon } from "@cubicsui/icons";
import { useSearch } from "@cubicsui/mdx/client";
import { getFirstLines } from "@cubicsui/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { embedQuery, isModelReady, warmupModel } from "@/lib/utils/embedQuery";

export function SearchPopover() {
  const { open, handleToggle, handleClose } = useDisclosure();
  const { query, results, loading } = useSearch({
    indexUrl: "/api/search",
    embedQuery,
    enabled: open,
  });
  const [modelReady, setModelReady] = useState(isModelReady());

  useEffect(() => {
    if (!open) return;
    // warmupModel must return the promise (return extractor at its end)
    warmupModel()
      .then(() => setModelReady(true))
      .catch(() => {});
  }, [open]);
  return (
    <>
      <Button
        icon
        type="button"
        popoverTarget="search_popover"
        onClick={handleToggle}
      >
        <SearchIcon />
      </Button>
      {open && (
        <Popover id={"search_popover"} onClose={handleClose}>
          <Card fixedWidth="300px" fixedHeight="500px">
            <CardHeader
              title={
                <TextInput
                  placeholder="What are you looking for?"
                  onChange={(e) => query(e.target.value)}
                />
              }
            />
            <CardContent>
              {!modelReady && <p>Improving results…</p>}
              {loading && <p>Searching…</p>}
              <List LinkComponent={Link}>
                {results?.hits.map((h) => (
                  <ListItem key={h.id} href={h.document.url}>
                    {h.document.title}
                    {h.document.heading && ` > ${h.document.heading}`}
                    <br />
                    <pre>{getFirstLines(h.document.content)}</pre>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Popover>
      )}
    </>
  );
}
