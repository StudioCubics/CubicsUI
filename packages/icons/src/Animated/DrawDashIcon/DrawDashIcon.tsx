import { cn } from "@cubicsui/utils";
import type { ComponentProps, ReactElement } from "react";
import styles from "./DrawDashIcon.module.css";

export function DrawDashIcon(props: ComponentProps<"svg">): ReactElement {
  const { width = 24, height = width, className, ...rest } = props;
  return (
    <svg
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label="DashIcon"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn("lucide", styles.root, className)}
    >
      <path d="M5 12h14" pathLength={1} />
    </svg>
  );
}
