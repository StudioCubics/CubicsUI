"use client";

import { cn, mergeRefs } from "@cubicsui/utils";
import type { ReactElement } from "react";
import { Card } from "../../Display/Card/Card";
import { CardContent } from "../../Display/Card/CardContent/CardContent";
import { CardHeader } from "../../Display/Card/CardHeader/CardHeader";
import styles from "./TableOfContents.module.css";
import type { TableOfContentsProps } from "./TableOfContents.types";
import { TableOfContentsMarker } from "./TableOfContentsMarker/TableOfContentsMarker";
import { useTableOfContentsMarker } from "./TableOfContentsMarker/useTableOfContentsMarker";

export function TableOfContents(props: TableOfContentsProps): ReactElement {
  const {
    tree = [],
    title = "On this Page",
    ListComponent = "ol",
    LinkComponent = "a",
    withNumbering = false,
    scrollContainerRef,
    slotProps = {},
  } = props;
  const contentsMarker = useTableOfContentsMarker(tree, scrollContainerRef);
  const { navRef, listRef, activeIds } = contentsMarker;
  return (
    <Card
      {...slotProps.root}
      as={slotProps.root?.as || "nav"}
      removeBg={slotProps.root?.removeBg || true}
      ref={mergeRefs(navRef, slotProps.root?.ref)}
    >
      {title && (
        <CardHeader
          {...slotProps.title}
          as={slotProps.title?.as || "h5"}
          title={slotProps.title?.title || title}
        />
      )}
      <CardContent
        {...slotProps.content}
        className={cn(slotProps.content?.className, styles.content)}
      >
        <TableOfContentsMarker {...contentsMarker} />
        <ListComponent
          {...slotProps.list}
          ref={mergeRefs(slotProps.list?.ref, listRef)}
          className={cn(slotProps.list?.className, styles.root)}
        >
          {tree?.map((t) => (
            <li
              {...slotProps.listItem}
              key={t.numbering.join("")}
              style={
                {
                  ...slotProps.listItem?.style,
                  "--depth": t.depth,
                } as React.CSSProperties
              }
              className={cn(
                slotProps.listItem?.className,
                styles.item,
                withNumbering && styles.withNumbering,
              )}
              data-numbering={t.numbering.filter((_, i) => i !== 0).join(".")}
              data-active={activeIds.has(t.href.slice(1))}
            >
              <LinkComponent {...slotProps.link} href={t.href}>
                {t.value}
              </LinkComponent>
            </li>
          ))}
        </ListComponent>
      </CardContent>
    </Card>
  );
}
