/**
 * Extracts the content inside the first <script> tag from .vue or .svelte files.
 * @param code - Full file content.
 * @returns Extracted JavaScript/TypeScript code or empty string if no script tag is found.
 */
export default function extractScriptTag(code: string): string {
  const match = code.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  return match ? match[1] : "";
}
