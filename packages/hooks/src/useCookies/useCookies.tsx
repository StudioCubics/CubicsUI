"use client";

import { useState } from "react";

function parseCookies(): Map<string, string> {
  const map = new Map<string, string>();
  if (typeof document === "undefined") return map; // SSR guard
  document.cookie.split("; ").forEach((cookie) => {
    const [key, value] = cookie.split("=");
    map.set(key, value);
  });
  return map;
}

// TODO not complete
export function useCookies(): { cookies: Map<string, string> } {
  // Lazy initializer runs once on mount, no effect needed
  const [cookies] = useState<Map<string, string>>(parseCookies);

  return { cookies };
}
