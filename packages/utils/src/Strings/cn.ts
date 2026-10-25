export function cn(
  ...classNames: (string | undefined | null | false)[]
): string | undefined {
  const filtered = classNames.filter(Boolean);
  if (!filtered.length) return undefined;
  return filtered.join(" ");
}
