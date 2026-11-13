/** Generates a smooth non-turbulent Red/Green bevel displacement map
 * encoded as an SVG data URI so edge pixels refract inward like a polished lens. */
export function buildBevelDisplacementDataUri(
  width: number,
  height: number,
  bevelWidth: number,
  br: number,
): string {
  const w = Math.max(64, Math.round(width));
  const h = Math.max(64, Math.round(height));
  const b = Math.max(2, Math.min(bevelWidth, Math.min(w, h) / 2));
  const r = Math.max(0, Math.min(br, Math.min(w, h) / 2));

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <linearGradient id="gx" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgb(255,128,0)" />
          <stop offset="${((b / w) * 100).toFixed(2)}%" stop-color="rgb(128,128,0)" />
          <stop offset="${(100 - (b / w) * 100).toFixed(2)}%" stop-color="rgb(128,128,0)" />
          <stop offset="100%" stop-color="rgb(0,128,0)" />
        </linearGradient>
        <linearGradient id="gy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgb(128,255,0)" />
          <stop offset="${((b / h) * 100).toFixed(2)}%" stop-color="rgb(128,128,0)" />
          <stop offset="${(100 - (b / h) * 100).toFixed(2)}%" stop-color="rgb(128,128,0)" />
          <stop offset="100%" stop-color="rgb(128,0,0)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="rgb(128,128,0)" />
      <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#gx)" style="mix-blend-mode: hard-light;" />
      <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#gy)" style="mix-blend-mode: hard-light;" />
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
