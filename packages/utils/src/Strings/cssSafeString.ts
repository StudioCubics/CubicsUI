/**
 * Converts a given string to a css safe version of the string
 */
export function cssSafeString(str?: string): string | undefined {
  if (!str) return;
  const encoded = encodeURIComponent(str)
    .toLowerCase()
    .replace(/\.|%[0-9a-z]{2}/gi, "");

  const firstChar = encoded.charAt(0);
  if (firstChar.match(/^[0-9-]/)) {
    // Check if the first character is a number or hyphen
    return `_${encoded}`;
  }

  return encoded;
}
