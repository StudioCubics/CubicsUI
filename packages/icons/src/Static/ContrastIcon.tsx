import { cn } from "@cubicsui/utils";
import type { ComponentProps, ReactElement } from "react";

export function ContrastIcon(props: ComponentProps<"svg">): ReactElement {
  const { width = 24, height = width, className, ...rest } = props;
  return (
    <svg
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label="ContrastIcon"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn(className, "lucide")}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 18a6 6 0 0 0 0-12v12z" />
    </svg>
  );
}
