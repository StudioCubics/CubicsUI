export type BrowserName =
  | "ie"
  | "edge"
  | "opera"
  | "samsung"
  | "firefox"
  | "chrome"
  | "safari"
  | "unknown";

// Rendering engine, which is what decides CSS/SVG feature behavior
export type BrowserEngine =
  | "blink"
  | "gecko"
  | "webkit"
  | "trident"
  | "unknown";

export type BrowserInfo = {
  name: BrowserName;
  engine: BrowserEngine;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  isOpera: boolean;
  isSamsung: boolean;
  isIE: boolean;
  isBlink: boolean; // Chrome, Edge, Opera, Samsung Internet (not iOS)
  isGecko: boolean; // Firefox (not iOS)
  isWebKit: boolean; // Safari and every browser on iOS
  isIOS: boolean;
};
