"use client";

import {
  componentsMeta,
  hooksMeta,
  iconsMeta,
  utilsMeta,
} from "@/app/components/meta";
import {
  Card,
  CardHeader,
  List,
  ListItem,
  Rolodex,
  useSidebarLayout,
} from "@cubicsui/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const metaMap = {
  components: componentsMeta,
  hooks: hooksMeta,
  utils: utilsMeta,
  icons: iconsMeta,
};

export function SidebarBodyContent() {
  const { sidebarOpen } = useSidebarLayout();
  const [curr, setCurr] = useState<keyof typeof metaMap>("components");
  const pathname = usePathname();

  return (
    <>
      <Rolodex
        blurMultiplier={0}
        showButtons
        items={[
          {
            node: (
              <Card size="sm">
                <CardHeader
                  as="h6"
                  title="Components"
                  desc="@cubicsui/components"
                />
              </Card>
            ),
            id: "components",
          },
          {
            node: (
              <Card size="sm">
                <CardHeader as="h6" title="Hooks" desc="@cubicsui/hooks" />
              </Card>
            ),
            id: "hooks",
          },
          {
            node: (
              <Card size="sm">
                <CardHeader as="h6" title="Utilities" desc="@cubicsui/utils" />
              </Card>
            ),
            id: "utils",
          },
          {
            node: (
              <Card size="sm">
                <CardHeader as="h6" title="Icons" desc="@cubicsui/icons" />
              </Card>
            ),
            id: "icons",
          },
        ]}
        onChange={(v) => setCurr(v as keyof typeof metaMap)}
      />
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
        {metaMap[curr].map((cm, i) => (
          <ListItem key={i} {...cm} />
        ))}
      </List>
    </>
  );
}
