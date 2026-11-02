import { cn } from "@cubicsui/utils";
import type { ComponentProps, ReactElement } from "react";

export function EllipsisIcon(props: ComponentProps<"svg">): ReactElement {
  const { width = 24, height = width, className, ...rest } = props;
  return (
    <svg
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label="EllipsisIcon"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn(className, "lucide")}
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
