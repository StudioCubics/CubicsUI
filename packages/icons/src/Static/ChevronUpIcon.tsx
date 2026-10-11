export function ChevronUpIcon(
  props: React.ComponentProps<"svg">,
): React.ReactElement {
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
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}
