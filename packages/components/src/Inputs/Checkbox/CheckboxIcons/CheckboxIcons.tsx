import type { ComponentProps, ReactElement } from "react";
import { cn } from "@cubicsui/utils";
import styles from "./CheckboxIcons.module.css";

export function CheckIconAnimated(props: ComponentProps<"svg">): ReactElement {
  const { width = 24, height = width, ...rest } = props;
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
      <path d="M5 13 9 17l10 -9" pathLength={1} />
    </svg>
  );
}

export function DashIconAnimated(props: ComponentProps<"svg">): ReactElement {
  const { width = 24, height = width, ...rest } = props;
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
      <path d="M5 12h14" pathLength={1} />
    </svg>
  );
}
