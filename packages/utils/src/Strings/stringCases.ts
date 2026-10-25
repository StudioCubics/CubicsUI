// Wrap segments that should be preserved as-is in double curly braces: {{iOS}}
// Escape a separator to keep it literally: hello\_world, hello\-world
const PRESERVED_RE = /\{\{(.+?)\}\}/g;
const ESCAPED_SEP_RE = /\\([_\-\s])/g;

/** Extract preserved segments, replace with placeholders, restore after transform */
function withPreserved(str: string, transform: (s: string) => string): string {
  const preserved: string[] = [];

  // Stash {{...}} segments
  const stashed = str.replace(PRESERVED_RE, (_, inner: string) => {
    preserved.push(inner);
    return `\x00PRESERVED_${preserved.length - 1}\x00`;
  });

  // Stash escaped separators (\_  \-  \ )
  const escaped: string[] = [];
  const stashedEsc = stashed.replace(ESCAPED_SEP_RE, (_, char: string) => {
    escaped.push(char);
    return `\x00ESCAPED_${escaped.length - 1}\x00`;
  });

  let result = transform(stashedEsc);

  result = result.replace(
    // biome-ignore lint/suspicious/noControlCharactersInRegex: This is escaping null, so intentional
    /\x00ESCAPED_(\d+)\x00/g,
    (_, i: string) => escaped[parseInt(i, 10)],
  );

  result = result.replace(
    // biome-ignore lint/suspicious/noControlCharactersInRegex: This is escaping null, so intentional
    /\x00PRESERVED_(\d+)\x00/g,
    (_, i: string) => preserved[parseInt(i, 10)],
  );

  return result;
}

function toWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase → camel Case
    .replace(/[_-]+/g, " ") // snake_case, kebab-case → spaces
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

export function toCapitalCase(str: string | undefined): string {
  if (!str) return "";
  return withPreserved(str, (s) => {
    const words = toWords(s);
    return words.map((w) => w[0].toUpperCase() + w.slice(1)).join("");
  });
}

export function toCamelCase(str: string | undefined): string {
  if (!str) return "";
  return withPreserved(str, (s) => {
    const words = toWords(s);
    return words
      .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
      .join("");
  });
}

export function toKebabCase(str: string | undefined): string {
  if (!str) return "";
  return withPreserved(str, (s) => toWords(s).join("-"));
}

export function toSnakeCase(str: string | undefined): string {
  if (!str) return "";
  return withPreserved(str, (s) => toWords(s).join("_"));
}

export function toConstantCase(str: string | undefined): string {
  if (!str) return "";
  return withPreserved(str, (s) => toWords(s).join("_").toUpperCase());
}

export function toCapitalised(str: string | undefined): string {
  if (!str) return "";
  return withPreserved(str, (s) => {
    const words = toWords(s);
    if (words.length === 0) return "";
    return words.map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
  });
}
