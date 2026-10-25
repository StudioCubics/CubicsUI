/**
 * Returns a human-readable relative time string vs Date.now().
 * Accepts Date | number (ms) | date-string.
 * Fast, allocation-light, no Intl.
 */
export function relativeTime(input: Date | number | string): string {
  const t: number =
    input instanceof Date
      ? input.getTime()
      : typeof input === "number"
        ? input
        : Date.parse(input);

  if (!Number.isFinite(t)) return "invalid date";

  const now = Date.now();
  const diffMs = t - now;
  const absMs = Math.abs(diffMs);
  const isFuture = diffMs > 0;

  // time constants (ms)
  const MIN = 60_000;
  const HOUR = 3_600_000;
  const DAY = 86_400_000;
  const WEEK = 604_800_000;
  const YEAR = 31_536_000_000;

  // very far away → coarse wording
  if (absMs > 5 * YEAR) {
    return isFuture ? "a long time from now" : "a long time ago";
  }

  if (absMs < MIN) {
    return "just now";
  }

  let value: number;
  let unit: "minute" | "hour" | "day" | "week" | "year";

  if (absMs < HOUR) {
    value = Math.round(absMs / MIN);
    unit = "minute";
  } else if (absMs < DAY) {
    value = Math.round(absMs / HOUR);
    unit = "hour";
  } else if (absMs < WEEK) {
    value = Math.round(absMs / DAY);
    unit = "day";
  } else if (absMs < YEAR) {
    value = Math.round(absMs / WEEK);
    unit = "week";
  } else {
    value = Math.round(absMs / YEAR);
    unit = "year";
  }

  if (value !== 1) unit += "s";

  return isFuture ? `in ${value} ${unit}` : `${value} ${unit} ago`;
}
