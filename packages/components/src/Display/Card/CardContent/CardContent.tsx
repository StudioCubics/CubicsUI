import type { ReactElement } from "react";
import type { CardContentProps } from "./CardContent.types";
import { cn } from "@cubicsui/utils";
import styles from "./CardContent.module.css";

/** Optional to use if the content needs to overflow the padding set by card */
export function CardContent(props: CardContentProps): ReactElement {
  const { overflowMargin, className, ...rest } = props;
  return (
    <div
      {...rest}
      data-slot={"card_content"}
      className={cn(
        className,
        styles.root,
        overflowMargin && styles.overflowMargin,
      )}
    />
  );
}
