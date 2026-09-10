// m6 9 6-6 6 6

import type { ComponentProps, ReactElement } from "react";
import styles from "./ListDropDownIcon.module.css";
import { cn } from "@cubicsui/utils";

export function ListDropDownIcon(
  props: ComponentProps<"svg"> & { collapsed: boolean },
): ReactElement {
  const { width = 24, height = width, collapsed, ...rest } = props;
  return (
    <svg
      fill="none"
      stroke="currentColor"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn("lucide", styles.root, collapsed && styles.collapsed)}
    >
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}
