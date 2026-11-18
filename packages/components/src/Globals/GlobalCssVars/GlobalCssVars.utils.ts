import type { DataAttributeName } from "@cubicsui/types";
import { toKebabCase } from "@cubicsui/utils";
import type { GlobalCssVars, GlobalCssVarsGroup } from "./GlobalCssVars.types";

/** Maps each GlobalStyles group to its CSS variable prefix */
export const GROUPS: GlobalCssVarsGroup = {
  gap: { prefix: "gap" },
  br: { prefix: "br" },
  font: { prefix: "font" },
  fs: { prefix: "fs" },
  lh: { prefix: "lh", numeric: true },
  transition: { prefix: "transition" },
  blur: { prefix: "blur" },
  zi: { prefix: "z", numeric: true },
  misc: { prefix: "" },
  color: { prefix: "color" },
};

/** Variables outside numeric groups that should still be parsed as numbers */
const NUMERIC_VARS = new Set(["--gr"]);

/** Attributes that change which theme variables apply */
export const THEME_ATTRS: DataAttributeName[] = [
  "data-theme",
  "data-contrast",
  "data-locale",
];

/** Resolves a CSS variable name from a group + key */
const toVarName = (prefix: string, key: string) => {
  // gap 1 is declared as --gap (the base unit), the rest as --gap-N
  if (prefix === "gap" && key === "1") return "--gap";
  const name = toKebabCase(key);
  return prefix ? `--${prefix}-${name}` : `--${name}`;
};

/**
 * Creates a lazy group.
 * With a style: returns the computed value.
 * Without one (server / first render / var mode): returns a `var(--x)` reference,
 * which resolves to the same value in CSS, so there is no flash.
 */
const createGroup = (
  style: CSSStyleDeclaration | null,
  prefix: string,
  numeric = false,
) =>
  new Proxy(
    {},
    {
      get(_, key) {
        if (typeof key !== "string") return undefined;
        const varName = toVarName(prefix, key);
        if (!style) return `var(${varName})`;
        const value = style.getPropertyValue(varName).trim();
        if (!value) return undefined; // e.g. optional font families
        return numeric || NUMERIC_VARS.has(varName) ? Number(value) : value;
      },
    },
  );

/** Builds the {@link GlobalCssVars} object. Pass null to get var() references */
export const buildGlobalStyles = (
  style: CSSStyleDeclaration | null,
): GlobalCssVars => {
  const entries = Object.entries(GROUPS).map(([group, { prefix, numeric }]) => [
    group,
    createGroup(style, prefix, numeric),
  ]);
  return Object.fromEntries(entries) as unknown as GlobalCssVars;
};


