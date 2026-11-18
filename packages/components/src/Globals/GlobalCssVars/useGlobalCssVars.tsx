"use client";

import { useEffect, useState } from "react";
import { GLOBAL_CSS_VARS } from "./GlobalCssVars";
import type {
  GlobalCssVars,
  UseGlobalStylesOptions,
} from "./GlobalCssVars.types";
import { buildGlobalStyles, THEME_ATTRS } from "./GlobalCssVars.utils";

/**
 * Returns the global CSS variables in a {@link GlobalCssVars} object.
 *
 * By default it returns the static `GLOBAL_CSS_VARS` (the `var(--...)`
 * references), which is safe for SSR and needs no subscription. With
 * `compute: true` it resolves the variables to their actual computed values
 * from `document.documentElement` and re-computes whenever any attribute in
 * `THEME_ATTRS` changes on it (e.g. a theme/mode switch).
 *
 * `GLOBAL_CSS_VARS` is also used as the initial state, so the first render with
 * `compute` on matches the server output until the effect runs.
 *
 * In Server Components, import `GLOBAL_CSS_VARS` directly from
 * `useGlobalStyles.utils` instead of calling this hook.
 */
export const useGlobalCssVars = (
  props: UseGlobalStylesOptions = {},
): GlobalCssVars => {
  const { compute } = props;
  const [styles, setStyles] = useState<GlobalCssVars>(GLOBAL_CSS_VARS);

  useEffect(() => {
    if (!compute) return;

    const update = () =>
      setStyles(buildGlobalStyles(getComputedStyle(document.documentElement)));

    update();

    const observer = new MutationObserver(update);
    const options = { attributes: true, attributeFilter: THEME_ATTRS };
    observer.observe(document.documentElement, options);
    return () => observer.disconnect();
  }, [compute]);

  // Derived instead of stored so switching mode never returns stale computed values
  return compute ? styles : GLOBAL_CSS_VARS;
};
