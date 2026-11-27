"use client";

import { cn } from "@cubicsui/utils";
import { type ReactElement } from "react";
import { ListItem } from "../List/ListItem/ListItem";
import styles from "./SearchHit.module.css";
import type { SearchHitProps } from "./SearchHit.types";

export function SearchHit<H extends string = string>(
  props: SearchHitProps<H>,
): ReactElement {
  const {
    img,
    title,
    subtitle,
    desc,
    className,
    ImgComponent = "img",
    slotProps = {},
    ...rest
  } = props;

  return (
    <ListItem
      {...rest}
      className={cn(className, styles.root)}
      slotProps={{
        ...slotProps,
        content: {
          ...slotProps.content,
          className: cn(slotProps.content?.className, styles.content),
        },
        surface: {
          ...slotProps.surface,
          className: cn(slotProps.surface?.className, styles.surface),
        },
      }}
    >
      {img && (
        <ImgComponent
          {...slotProps.img}
          className={cn(slotProps.img?.className, styles.img)}
          src={img}
          alt={title}
        />
      )}
      {title && (
        <h5
          {...slotProps.title}
          className={cn(slotProps.title?.className, styles.title)}
        >
          {title}
        </h5>
      )}
      {subtitle && (
        <p
          {...slotProps.subtitle}
          className={cn(slotProps.subtitle?.className, styles.subtitle)}
        >
          {subtitle}
        </p>
      )}
      {desc && (
        <div
          {...slotProps.desc}
          className={cn(slotProps.desc?.className, styles.desc)}
        >
          {desc}
        </div>
      )}
    </ListItem>
  );
}
