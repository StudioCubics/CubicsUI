import type { ComponentProps, ReactElement } from "react";

export function CircleXIcon(props: ComponentProps<"svg">): ReactElement {
  const { width = 24, height = width, ...rest } = props;

  return (
    <svg
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label="CircleXIcon"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className="lucide"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
