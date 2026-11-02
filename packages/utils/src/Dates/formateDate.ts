type DateToken =
  | "Day"
  | "day"
  | "DD"
  | "D"
  | "MMMM"
  | "MMM"
  | "MM"
  | "YYYY"
  | "YY"
  | "HH"
  | "H"
  | "hh"
  | "h"
  | "mm"
  | "m"
  | "ss"
  | "s"
  | "A"
  | "a";

/**
 * Formats a date according to the provided format string.
 *
 * @param dateInput - The date to format (as Date object, timestamp, or date string)
 * @param format - The format string using tokens (default: "day D MMM, YYYY")
 *
 * @returns The formatted date string
 *
 * @example
 * formatDate(new Date(), "Day, DD MMMM YYYY")
 * // => "Thursday, 02 January 2026"
 *
 * @example
 * formatDate(new Date(), "DD/MM/YYYY HH:mm:ss")
 * // => "02/01/2026 14:30:45"
 *
 * @example
 * formatDate(new Date(), "h:mm A")
 * // => "2:30 PM"
 *
 * Available tokens:
 * - Day: Full day name (e.g., "Monday")
 * - day: Short day name (e.g., "Mon")
 * - DD: Day of month, zero-padded (e.g., "05")
 * - D: Day of month (e.g., "5")
 * - MMMM: Full month name (e.g., "January")
 * - MMM: Short month name (e.g., "Jan")
 * - MM: Month number, zero-padded (e.g., "01")
 * - YYYY: Full year (e.g., "2026")
 * - YY: Two-digit year (e.g., "26")
 * - HH: Hours (24-hour), zero-padded (e.g., "14")
 * - H: Hours (24-hour) (e.g., "14")
 * - hh: Hours (12-hour), zero-padded (e.g., "02")
 * - h: Hours (12-hour) (e.g., "2")
 * - mm: Minutes, zero-padded (e.g., "05")
 * - m: Minutes (e.g., "5")
 * - ss: Seconds, zero-padded (e.g., "09")
 * - s: Seconds (e.g., "9")
 * - A: AM/PM uppercase (e.g., "PM")
 * - a: am/pm lowercase (e.g., "pm")
 */
export function formatDate(
  dateInput: number | string | Date,
  format: string = "HH:mm:ss day D MMM, YYYY",
): string {
  const date = new Date(dateInput);

  const pad = (n: number) => String(n).padStart(2, "0");

  const daysFull = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsFull = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthsShort = monthsFull.map((m) => m.slice(0, 3));

  // Extract all values once
  const dayIndex = date.getDay();
  const dateNum = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours24 = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hours12 = hours24 % 12 || 12;
  const isPM = hours24 >= 12;
  const yearStr = String(year);

  const replacements: Record<DateToken, string> = {
    Day: daysFull[dayIndex],
    day: daysShort[dayIndex],
    DD: pad(dateNum),
    D: String(dateNum),
    MMMM: monthsFull[monthIndex],
    MMM: monthsShort[monthIndex],
    MM: pad(monthIndex + 1),
    YYYY: yearStr,
    YY: yearStr.slice(-2),
    HH: pad(hours24),
    H: String(hours24),
    hh: pad(hours12),
    h: String(hours12),
    mm: pad(minutes),
    m: String(minutes),
    ss: pad(seconds),
    s: String(seconds),
    A: isPM ? "PM" : "AM",
    a: isPM ? "pm" : "am",
  };

  // Sort tokens by length (longest first) to avoid partial replacements
  const tokens = (Object.keys(replacements) as DateToken[]).sort(
    (a, b) => b.length - a.length,
  );

  // Use a single regex replacement to avoid overlapping matches
  const pattern = new RegExp(tokens.join("|"), "g");
  return format.replace(pattern, (match) => replacements[match as DateToken]);
}
