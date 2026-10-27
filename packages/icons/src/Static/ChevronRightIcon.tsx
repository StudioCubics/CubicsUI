import { cn } from "@cubicsui/utils";
import type { ComponentProps, ReactElement } from "react";

export function ChevronRightIcon(props: ComponentProps<"svg">): ReactElement {
  const { width = 24, height = width, className, ...rest } = props;
  return (
    <svg
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label="ChevronRightIcon"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn(className, "lucide")}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
