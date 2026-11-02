import { cn } from "@cubicsui/utils";
import type { ComponentProps, ReactElement } from "react";
import styles from "./Table.module.css";
export function Table(props: ComponentProps<"table">): ReactElement {
  const { className, ...rest } = props;
  return (
    <div className={styles.root}>
      <table className={cn(styles.table, className)} {...rest} />
    </div>
  );
}
