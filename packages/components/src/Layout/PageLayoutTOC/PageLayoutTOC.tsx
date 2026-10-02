"use client";

import { useRef, type ReactElement } from "react";
import { cn, mergeRefs } from "@cubicsui/utils";
import { TableOfContents } from "../../Display/TableOfContents/TableOfContents";
import styles from "./PageLayoutTOC.module.css";
import type { PageLayoutTOCProps } from "./PageLayoutTOC.types";
import { FormIcon } from "@cubicsui/icons";
import { SidebarLayout } from "../SidebarLayout/SidebarLayout";
import { Sidebar } from "../SidebarLayout/Sidebar/Sidebar";
import { SidebarBody } from "../SidebarLayout/SidebarBody/SidebarBody";
import { SidebarHeader } from "../SidebarLayout/SidebarHeader/SidebarHeader";
import { SidebarToggle } from "../SidebarLayout/SidebarHeader/SidebarToggle";
import { SidebarViewport } from "../SidebarLayout/SidebarViewport/SidebarViewport";
import { PageHeader } from "../../Typography/PageHeader/PageHeader";

export function PageLayoutTOC(props: PageLayoutTOCProps): ReactElement {
  const {
    tree = [],
    title,
    desc,
    actions,
    size = "lg",
    children,
    className,
    slotProps = {},
    LinkComponent,
    ...rest
  } = props;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
    <SidebarLayout
      id="PageLayoutTOC"
      side="right"
      closesTo="full"
      slotProps={slotProps}
      {...rest}
    >
      <SidebarViewport
        {...slotProps.sidebarViewport}
        className={cn(slotProps.sidebarViewport?.className, styles.content)}
        ref={mergeRefs(slotProps.sidebarViewport?.ref, scrollContainerRef)}
      >
        <PageHeader
          {...slotProps.title}
          title={title}
          desc={desc}
          actions={actions}
        />
        <div
          {...slotProps.body}
          className={cn(styles.body, slotProps.body?.className)}
        >
          {children}
        </div>
      </SidebarViewport>
      {!!tree.length && (
        <Sidebar>
          <SidebarHeader
            sidebarToggle={
              <SidebarToggle>
                <FormIcon />
              </SidebarToggle>
            }
          />
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
  );
}
