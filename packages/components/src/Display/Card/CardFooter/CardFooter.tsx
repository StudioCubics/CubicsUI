import { cn } from "@cubicsui/utils";
import type { ReactElement } from "react";
import type { CardFooterProps } from "../Card.types";
import styles from "./CardFooter.module.css";

export function CardFooter(props: CardFooterProps): ReactElement {
  const { className, overflowMargin = false, ...rest } = props;
  return (
    <div
      {...rest}
      data-slot={"card_footer"}
      className={cn(
        className,
        styles.root,
        overflowMargin && styles.overflowMargin,
      )}
    />
  );
}
