"use client";

import {
  List,
  ListItem,
  Rolodex,
  type ListItemProps,
} from "@cubicsui/components";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PkgSelectorCard } from "../../Display/PkgSelectorCard";
import { getSiteMap } from "@/app/docs/meta";
import type { Route } from "next";

export function SidebarList({ tree }: { tree: ListItemProps<Route>[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const curr = pathname.split("/")[2];
  const siteMap = getSiteMap(tree);
  if (!curr) router.replace("/");

  return (
    <>
      <Rolodex
        blurMultiplier={0}
        showButtons
        defaultValue={curr}
        items={Object.entries(siteMap).map(([k, v]) => {
          return {
            node: <PkgSelectorCard {...v} />,
            id: k,
          };
        })}
        onClose={(v) => {
          if (v !== curr) router.push(`/docs/${v}` as Route);
        }}
      />
      <List
        id="MAIN"
        size="lg"
        renderGlider
        LinkComponent={Link}
        selectedWhen={(i) => {
          if (i.type && (i.type == "separator" || i.type == "header"))
            return false;
          return pathname === i.href;
        }}
      >
        {siteMap[curr].meta.map((cm, i) => {
          return <ListItem key={i} {...cm} />;
        })}
      </List>
    </>
  );
}
