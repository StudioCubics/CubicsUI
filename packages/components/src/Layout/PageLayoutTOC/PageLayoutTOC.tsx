"use client";

import { useId } from "@cubicsui/hooks";
import { FormIcon } from "@cubicsui/icons";
import { cn, mergeRefs } from "@cubicsui/utils";
import { type ReactElement, useRef, useState } from "react";
import { Button } from "../../Inputs/Button/Button";
import { TableOfContents } from "../../Navigation/TableOfContents/TableOfContents";
import { PageLayout } from "../PageLayout/PageLayout";
import { Sidebar } from "../SidebarLayout/Sidebar/Sidebar";
import { SidebarBody } from "../SidebarLayout/SidebarBody/SidebarBody";
import { SidebarHeader } from "../SidebarLayout/SidebarHeader/SidebarHeader";
import { SidebarLayout } from "../SidebarLayout/SidebarLayout";
import { SidebarViewport } from "../SidebarLayout/SidebarViewport/SidebarViewport";
import styles from "./PageLayoutTOC.module.css";
import type { PageLayoutTOCProps } from "./PageLayoutTOC.types";

export function PageLayoutTOC(props: PageLayoutTOCProps): ReactElement {
  const {
    tree = [],
    id: _id,
    children,
    actions,
    size = "md",
    disableViewportContentFlow,
    disableBodyContentFlow = true,
    disableBodyPadding = true,
    LinkComponent,
    slotProps = {},
    ...rest
  } = props;
  const id = useId(_id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <PageLayout
      {...rest}
      actions={
        <>
          {actions}
          {!!tree.length && (
            <Button
              onClick={() => {
                setSidebarOpen((o) => {
                  console.log(o, "sidebarOpen");

                  return !o;
                });
              }}
              icon
            >
              <FormIcon />
            </Button>
          )}
        </>
      }
      disableBodyContentFlow={disableBodyContentFlow}
      disableBodyPadding={disableBodyPadding}
      size={size}
    >
      <SidebarLayout
        {...slotProps.sidebarLayout}
        id={`SidebarLayoutTOC-${id}`}
        side="right"
        closesTo="full"
        size={size}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      >
        <SidebarViewport
          {...slotProps.sidebarViewport}
          removeBg
          className={cn(
            slotProps.sidebarViewport?.className,
            styles.sidebarViewport,
            !disableViewportContentFlow && styles.contentFlow,
          )}
          ref={mergeRefs(slotProps.sidebarViewport?.ref, scrollContainerRef)}
        >
          {children}
        </SidebarViewport>
        {!!tree.length && (
          <Sidebar removeBg>
            <SidebarHeader sidebarToggle={""} {...slotProps.sidebarHeader} />
            <SidebarBody>
              <TableOfContents
                {...slotProps.tableOfContents}
                scrollContainerRef={scrollContainerRef}
                tree={tree}
                LinkComponent={LinkComponent}
              />
            </SidebarBody>
          </Sidebar>
        )}
      </SidebarLayout>
    </PageLayout>
  );
}
