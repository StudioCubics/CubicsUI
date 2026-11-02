/**
 * Generates a unique string of a fixed length, optionally from a seed.
 */
export function generateString(
  options: { length?: number; seed?: string | number } = {},
): string {
  const { length, seed } = {
    length: options?.length ?? 16,
    seed: options?.seed,
  };

  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Seeded PRNG (mulberry32)
  const seededRandom = (s: string | number): (() => number) => {
    // Hash the seed if it's a string
    let n: number =
      typeof s === "string"
        ? [...s].reduce((h, c) => (Math.imul(31, h) + c.charCodeAt(0)) | 0, 0)
        : s;

    return () => {
      n |= 0;
      n = (n + 0x6d2b79f5) | 0;
      let t = Math.imul(n ^ (n >>> 15), 1 | n);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  // Use seeded PRNG or Math.random
  const random: () => number =
    seed !== undefined ? seededRandom(seed) : Math.random;

  return Array.from(
    { length },
    () => CHARS[Math.floor(random() * CHARS.length)],
  ).join("");
}
