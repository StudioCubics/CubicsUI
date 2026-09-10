import type { ComponentProps } from "react";

export function PointerLightIcon(props: ComponentProps<"svg">) {
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
      className="lucide"
    >
      {/* <path d="m12 14 4-4" /> */}
      <path d="M6 13a5 5 0 116.5-7" />
      {/* <circle pathLength="1" cx="10" cy="10" r="6" /> */}
      <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
    </svg>
  );
}
