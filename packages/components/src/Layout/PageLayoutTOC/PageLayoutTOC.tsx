"use client";

import { FormIcon } from "@cubicsui/icons";
import { cn, mergeRefs } from "@cubicsui/utils";
import { type ReactElement, useRef } from "react";
import { TableOfContents } from "../../Display/TableOfContents/TableOfContents";
import { PageHeader } from "../../Typography/PageHeader/PageHeader";
import { Sidebar } from "../SidebarLayout/Sidebar/Sidebar";
import { SidebarBody } from "../SidebarLayout/SidebarBody/SidebarBody";
import { SidebarHeader } from "../SidebarLayout/SidebarHeader/SidebarHeader";
import { SidebarToggle } from "../SidebarLayout/SidebarHeader/SidebarToggle";
import { SidebarLayout } from "../SidebarLayout/SidebarLayout";
import { SidebarViewport } from "../SidebarLayout/SidebarViewport/SidebarViewport";
import styles from "./PageLayoutTOC.module.css";
import type { PageLayoutTOCProps } from "./PageLayoutTOC.types";

// TODO nuke this and make with PageLayout instead of SidebarLayout
export function PageLayoutTOC(props: PageLayoutTOCProps): ReactElement {
  const {
    tree = [],
    title,
    desc,
    actions,
    size = "md",
    children,
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
      size={size}
      {...rest}
    >
      <SidebarViewport
        {...slotProps.sidebarViewport}
        removeBg
        className={cn(slotProps.sidebarViewport?.className, styles.viewport)}
        ref={mergeRefs(slotProps.sidebarViewport?.ref, scrollContainerRef)}
      >
        <PageHeader
          {...slotProps.title}
          className={cn(styles.title, slotProps.title?.className)}
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
        <Sidebar removeBg>
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
