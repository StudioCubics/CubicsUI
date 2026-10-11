"use client";

import {
  List,
  ListItem,
  useSidebarLayout,
  type ListItemProps,
} from "@cubicsui/components";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarList({ tree }: { tree: ListItemProps[] }) {
  const { sidebarOpen } = useSidebarLayout();
  const pathname = usePathname();

  return (
    <List
      id="MAIN"
      size="lg"
      renderGlider
      LinkComponent={Link}
      selectedWhen={(i) => {
        if (i.type && i.type !== "item") return false;
        return pathname === i.href;
      }}
    >
      {tree.map((cm, i) => {
        return <ListItem key={i} {...cm} />;
      })}
    </List>
  );
}
