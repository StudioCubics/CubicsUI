import { cn } from "@cubicsui/utils";
import type { ComponentProps, ReactElement } from "react";
import styles from "./SpinnerIcon.module.css";

export function SpinnerIcon(props: ComponentProps<"svg">): ReactElement {
  const { width = 24, height = width, className, ...rest } = props;

  return (
    <svg
      role="img"
      aria-label="PasswordVisibilityIcon"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn("lucide", className)}
    >
      <rect
        className={styles.main}
        x="1"
        y="1"
        rx="2"
        width="10"
        height="10"
        fill="currentColor"
      />
      <rect
        className={cn(styles.main, styles.trailing)}
        x="1"
        y="1"
        rx="2"
        width="10"
        height="10"
        fill="currentColor"
      />
    </svg>
  );
}
