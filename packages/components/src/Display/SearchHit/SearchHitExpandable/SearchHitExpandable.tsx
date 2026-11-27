"use client";

import { useScrollIntoView } from "@cubicsui/hooks";
import { ChevronDownIcon } from "@cubicsui/icons";
import { cn, mergeRefs } from "@cubicsui/utils";
import { isValidElement, type ReactElement, useRef, useState } from "react";
import { Button } from "../../../Inputs/Button/Button";
import { SearchHit } from "../SearchHit";
import type {
  SearchHitExpandableProps,
  SearchHitProps,
} from "../SearchHit.types";
import styles from "./SearchHitExpandable.module.css";

/** Makes the desc of the SearchHit be toggleable */
export function SearchHitExpandable<
  T extends object = object,
  H extends string = string,
>(props: SearchHitExpandableProps<T, H>): ReactElement | null {
  const {
    active,
    renderHit,
    ImgComponent: _ImgComponent,
    LinkComponent: _LinkComponent,
    hit,
    expandableHits = false,
  } = props;
  const [expanded, setExpanded] = useState(false);
  const listItemRef = useRef<HTMLLIElement>(null);
  const scrollOnNextRender = useScrollIntoView(listItemRef, [expanded]);
  const obj = renderHit?.(hit, expanded);
  if (!obj) return null;
  if (isValidElement(obj)) return obj;
  const { slotProps, desc, ref, ImgComponent, LinkComponent, ...rest } = obj;
  const commonProps: SearchHitProps<H> = {
    ref: mergeRefs(ref, listItemRef),
    ImgComponent: ImgComponent || _ImgComponent,
    LinkComponent: LinkComponent || _LinkComponent,
    selected: active,
    ...rest,
  };
  function handleToggle() {
    console.log("hello");
    setExpanded(!expanded);
    scrollOnNextRender();
  }
  if (!expandableHits || !desc) return <SearchHit {...commonProps} />;
  return (
    <div className={cn(styles.root, expanded && styles.expanded)}>
      <SearchHit
        {...commonProps}
        desc={desc}
        slotProps={{
          ...slotProps,
          surface: {
            ...slotProps?.surface,
            className: cn(slotProps?.surface?.className, styles.surface),
          },
          content: {
            ...slotProps?.content,
            className: cn(slotProps?.content?.className, styles.content),
          },
          desc: {
            ...slotProps?.desc,
            className: cn(slotProps?.desc?.className, styles.desc),
          },
        }}
      />
      <Button
        fullWidth
        size="xs"
        type="button"
        className={cn(styles.toggle)}
        aria-label="Expand"
        onClick={handleToggle}
        tabIndex={-1}
      >
        <ChevronDownIcon />
      </Button>
    </div>
  );
}
