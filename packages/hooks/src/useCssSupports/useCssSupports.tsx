"use client";

import { useEffect, useState } from "react";

/**
 * Checks CSS support. Accepts either:
 *  - a full condition: "(display: grid)" or "selector(:has(a))"
 *  - a property + value pair: useCssSupports("display", "grid")
 *
 * Returns `false` on the server and on the first client render so hydration matches,
 * then updates after mount.
 */
export const useCssSupports = (
  propertyOrCondition: string,
  value?: string,
): boolean => {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // Guard for very old browsers without CSS.supports
    if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
      setSupported(false);
      return;
    }

    setSupported(
      value !== undefined
        ? CSS.supports(propertyOrCondition, value)
        : CSS.supports(propertyOrCondition),
    );
  }, [propertyOrCondition, value]);

  return supported;
};
