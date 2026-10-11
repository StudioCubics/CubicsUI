"use client";

import type { ReactElement } from "react";
import type { TableOfContentsProps } from "./TableOfContents.types";
import { cn, mergeRefs } from "@cubicsui/utils";
import { Card } from "../Card/Card";
import { CardContent } from "../Card/CardContent/CardContent";
import styles from "./TableOfContents.module.css";
import { useTableOfContentsMarker } from "./TableOfContentsMarker/useTableOfContentsMarker";
import { TableOfContentsMarker } from "./TableOfContentsMarker/TableOfContentsMarker";
import { CardHeader } from "../Card/CardHeader/CardHeader";

// TODO add slotProps for the slots
export function TableOfContents(props: TableOfContentsProps): ReactElement {
  const {
    tree = [],
    title = "Table of Contents",
    ListComponent = "ol",
    LinkComponent = "a",
    withNumbering = false,
    scrollContainerRef,
  } = props;
  const contentsMarker = useTableOfContentsMarker(
    tree,
    scrollContainerRef ?? { current: null },
  );
  return (
    <Card as="nav" removeBg ref={mergeRefs(contentsMarker.navRef)}>
      {title && <CardHeader as="h5" title={title} />}
      <CardContent className={cn(styles.content)}>
        <TableOfContentsMarker {...contentsMarker} />
        <ListComponent ref={contentsMarker.listRef} className={cn(styles.root)}>
          {tree?.map((t) => (
            <li
              key={t.numbering.join("")}
              style={{ "--depth": t.depth } as React.CSSProperties}
              className={cn(styles.item, withNumbering && styles.withNumbering)}
              data-numbering={t.numbering.filter((_, i) => i != 0).join(".")}
              data-active={contentsMarker.activeIds.has(t.href.slice(1))}
            >
              <LinkComponent href={t.href}>{t.value}</LinkComponent>
            </li>
          ))}
        </ListComponent>
      </CardContent>
    </Card>
  );
}
