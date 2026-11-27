import { cn } from "@cubicsui/utils";
import type { ReactElement } from "react";
import type { ListItemTypeHeaderProps } from "../List.types";
import styles from "./ListItem.module.css";

export function ListItemTypeHeader(
  props: ListItemTypeHeaderProps,
): ReactElement {
  const { children, renderLine = false } = props;
  return (
    <span className={cn(styles.header, renderLine && styles.renderLine)}>
      {children}
    </span>
  );
}
