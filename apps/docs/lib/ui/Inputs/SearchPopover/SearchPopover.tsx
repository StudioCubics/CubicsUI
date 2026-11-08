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
import { embedQuery } from "@/lib/utils/embedQuery";

export function SearchPopover() {
  const { open, handleToggle, handleClose } = useDisclosure();
  const { query, results, loading } = useSearch({
    indexUrl: "/api/search",
    embedQuery,
    enabled: open,
  });

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
