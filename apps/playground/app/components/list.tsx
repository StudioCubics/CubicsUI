"use client";

import { List, ListItem, useSidebarLayout } from "@cubicsui/components";
import { componentsMeta } from "./meta";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarList() {
  const { sidebarOpen } = useSidebarLayout();
  const pathname = usePathname();

  return (
    <List
      id="MainSidebar"
      size="lg"
      renderGlider
      LinkComponent={Link}
      selectedWhen={(i) => {
        if (i.type && i.type !== "item") return false;
        return pathname === i.href;
      }}
    >
      {componentsMeta.map((cm, i) => {
        switch (cm.type) {
          case "header":
            if (sidebarOpen) return <ListItem key={i} {...cm} />;
            break;

          case "separator":
            if (sidebarOpen) return <ListItem key={i} {...cm} />;
            break;

          default:
            return <ListItem key={i} {...cm} />;
        }
      })}
    </List>
  );
}
