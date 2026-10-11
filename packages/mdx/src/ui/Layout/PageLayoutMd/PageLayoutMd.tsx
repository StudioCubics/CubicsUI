import { cn } from "@cubicsui/utils";
import type { ReactNode } from "react";
import styles from "./PageLayoutMd.module.css";

export function PageLayoutMd({ children }: { children: ReactNode }) {
  return <main className={cn(styles.root)}>{children}</main>;
}
