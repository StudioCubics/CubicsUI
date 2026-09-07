import { cn } from "@cubicsui/utils";
import type { ComponentProps, ReactElement } from "react";
import styles from "./CardFooter.module.css";

export function CardFooter(props: ComponentProps<"div">): ReactElement {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      data-slot={"card_footer"}
      className={cn(className, styles.root)}
    />
  );
}
