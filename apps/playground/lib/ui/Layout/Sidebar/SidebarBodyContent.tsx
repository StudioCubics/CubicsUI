"use client";

import { List, ListItem, Rolodex } from "@cubicsui/components";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteMap } from "@/app/meta";
import { PkgSelectorCard } from "../../Display/PkgSelectorCard";

export function SidebarBodyContent() {
  const pathname = usePathname();
  const router = useRouter();
  const slug = pathname.split("/")[1];
  const curr = Object.keys(siteMap).includes(slug) ? slug : "components";

  return (
    <div>
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
          if (i.type && i.type !== "item" && i.type !== "collapsible")
            return false;
          return pathname === i.href;
        }}
      >
        {siteMap[curr].meta.map((cm, i) => (
          <ListItem key={cm.id ?? i} {...cm} />
        ))}
      </List>
    </div>
  );
}
