"use client";

import {
  List,
  ListItem,
  type ListItemProps,
  Rolodex,
} from "@cubicsui/components";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSiteMap } from "@/app/docs/meta";
import { PkgSelectorCard } from "../../Display/PkgSelectorCard";

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
            node: (
              <PkgSelectorCard
                id={k}
                icon={v.icon}
                title={v.label}
                desc={v.pkg}
              />
            ),
            id: k,
          };
        })}
        onClose={(v) => {
          if (v !== curr) router.push(`/${v}` as Route);
        }}
      />
      <List
        id="MAIN"
        size="lg"
        renderGlider
        LinkComponent={Link}
        selectedWhen={(i) => {
          if (i.type && (i.type === "separator" || i.type === "header"))
            return false;
          return pathname === i.href;
        }}
      >
        {siteMap[curr].meta.map((cm, i) => {
          return <ListItem key={cm.id ?? i} {...cm} />;
        })}
      </List>
    </>
  );
}
