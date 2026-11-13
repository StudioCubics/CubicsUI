"use client";

import { FormIcon } from "@cubicsui/icons";
import { cn, mergeRefs } from "@cubicsui/utils";
import { type ReactElement, useRef, useState } from "react";
import { Button } from "../../Inputs/Button/Button";
import { TableOfContents } from "../../Navigation/TableOfContents/TableOfContents";
import { PageBody } from "../PageBody/PageBody";
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
    id,
    children,
    actions,
    size = "md",
    disableViewportContentFlow,
    persistScrollPosition,
    LinkComponent,
    slotProps = {},
    ...rest
  } = props;
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
                setSidebarOpen((o) => !o);
              }}
              icon
            >
              <FormIcon />
            </Button>
          )}
        </>
      }
      disableBodyWrapper
      size={size}
    >
      <SidebarLayout
        {...slotProps.sidebarLayout}
        id={`SidebarLayoutTOC-${id}`}
        className={cn(slotProps.sidebarLayout?.className, styles.sidebarLayout)}
        side="right"
        closesTo="full"
        size={size}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      >
        <SidebarViewport
          {...slotProps.sidebarViewport}
          as={PageBody}
          id={`PageBody-${id}`}
          persistScrollPosition={persistScrollPosition}
          disableContentFlow={disableViewportContentFlow}
          removeBg
          className={cn(
            slotProps.sidebarViewport?.className,
            styles.sidebarViewport,
            styles.scrollTimeline,
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
