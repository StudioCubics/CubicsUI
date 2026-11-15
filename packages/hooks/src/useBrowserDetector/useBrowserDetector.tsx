"use client";

import { useEffect, useState } from "react";
import type {
  BrowserEngine,
  BrowserInfo,
  BrowserName,
} from "./useBrowserDetector.types";

// Order matters: many browsers include "Chrome" or "Safari" in their UA string
const detectBrowser = (ua: string): BrowserName => {
  if (/MSIE|Trident/i.test(ua)) return "ie";
  if (/Edg(e|A|iOS)?\//i.test(ua)) return "edge";
  if (/OPR\/|Opera|OPiOS/i.test(ua)) return "opera";
  if (/SamsungBrowser/i.test(ua)) return "samsung";
  if (/Firefox|FxiOS/i.test(ua)) return "firefox";
  if (/Chrome|CriOS/i.test(ua)) return "chrome";
  if (/Safari/i.test(ua)) return "safari";
  return "unknown";
};

// Every browser on iOS is forced to use WebKit, whatever its name says
const detectIOS = (ua: string): boolean => /iPhone|iPad|iPod/i.test(ua);

// Order matters: iOS first, then Chromium ("Chrome/" is also in Edge, Opera and Samsung UAs)
const detectEngine = (ua: string, isIOS: boolean): BrowserEngine => {
  if (isIOS) return "webkit";
  if (/MSIE|Trident/i.test(ua)) return "trident";
  if (/Chrome\//.test(ua)) return "blink";
  if (/Firefox\//.test(ua)) return "gecko";
  if (/Safari\//.test(ua)) return "webkit";
  return "unknown";
};

const toInfo = (ua: string): BrowserInfo => {
  const name = detectBrowser(ua);
  const isIOS = detectIOS(ua);
  const engine = detectEngine(ua, isIOS);

  return {
    name,
    engine,
    isChrome: name === "chrome",
    isFirefox: name === "firefox",
    isSafari: name === "safari",
    isEdge: name === "edge",
    isOpera: name === "opera",
    isSamsung: name === "samsung",
    isIE: name === "ie",
    isBlink: engine === "blink",
    isGecko: engine === "gecko",
    isWebKit: engine === "webkit",
    isIOS,
  };
};

export const useBrowserDetector = (): BrowserInfo => {
  // Empty UA gives "unknown" on the server and on the first client render so hydration matches
  const [info, setInfo] = useState<BrowserInfo>(() => toInfo(""));

  useEffect(() => {
    setInfo(toInfo(navigator.userAgent));
  }, []);

  return info;
};
