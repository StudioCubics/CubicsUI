import { cn } from "@cubicsui/utils";
import type { ReactElement } from "react";
import type { ListItemTypeSeparatorProps } from "../List.types";
import styles from "./ListItem.module.css";

export function ListItemTypeSeparator(
  props: ListItemTypeSeparatorProps,
): ReactElement {
  const { className, ...rest } = props;
  return <hr {...rest} className={cn(className, styles.separator)} />;
}
