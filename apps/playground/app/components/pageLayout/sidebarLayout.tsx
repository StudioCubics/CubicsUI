"use client";

import {
  Button,
  Card,
  PageLayout,
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarLayout,
  SidebarViewport,
} from "@cubicsui/components";
import { FormIcon } from "@cubicsui/icons";
import { useState } from "react";
import { lorem } from "./utils";

export function SidebarLayoutExample() {
  const [open, setOpen] = useState(true);
  return (
    <Card disablePadding removeBg fixedHeight="700px" variant="outlined">
      <PageLayout
        title={
          <>
            Using with <code>{"<SidebarLayout/>"}</code>
          </>
        }
        actions={
          <Button onClick={() => setOpen((o) => !o)} icon>
            <FormIcon />
          </Button>
        }
        disableBodyContentFlow
        disableBodyPadding
      >
        <SidebarLayout
          side="right"
          closesTo="full"
          open={open}
          onOpenChange={setOpen}
        >
          <SidebarViewport removeBg>
            <PageLayout>
              <p>{Array.from({ length: lorem.length }).map(() => lorem)}</p>
            </PageLayout>
          </SidebarViewport>
          <Sidebar removeBg>
            <SidebarHeader sidebarToggle={""} />
            <SidebarBody>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </SidebarBody>
            <SidebarFooter>Footer content</SidebarFooter>
          </Sidebar>
        </SidebarLayout>
      </PageLayout>
    </Card>
  );
}
