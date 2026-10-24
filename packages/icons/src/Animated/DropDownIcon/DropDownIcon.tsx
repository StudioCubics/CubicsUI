import type { ComponentProps, ReactElement } from "react";
import { cn } from "@cubicsui/utils";
import styles from "./DropDownIcon.module.css";

export function DropDownIcon(props: ComponentProps<"svg">): ReactElement {
  const { width = 24, height = width, style, ...rest } = props;
  return (
    <svg
      fill="none"
      stroke="currentColor"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn("lucide", styles.root)}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
