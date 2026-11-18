import type { CssColor, CssLength } from "@cubicsui/types";
export interface BorderRadiusTokens {
  xs: CssLength;
  sm: CssLength;
  md: CssLength;
  lg: CssLength;
  xl: CssLength;
  pill: CssLength;
}
export interface GapTokens {
  1: CssLength;
  2: CssLength;
  3: CssLength;
  4: CssLength;
  5: CssLength;
  6: CssLength;
  7: CssLength;
  8: CssLength;
  10: CssLength;
  12: CssLength;
  14: CssLength;
  16: CssLength;
  20: CssLength;
  24: CssLength;
  32: CssLength;
}
export interface FontFamilyTokens {
  /** Font family for headers */
  h?: string;
  /** Font family for paragraphs */
  p?: string;
  /** Font family for code */
  c?: string;
}
export interface FontSizeResponsiveTokens {
  /** Responsive size meant to use for image captions and other minute texts */
  caption: CssLength;
  /** Responsive size meant for code blocks */
  code: CssLength;
  /** Responsive size smaller than body, meant for supporting body text */
  body2: CssLength;
  /** Responsive size meant for regular body text */
  body: CssLength;
  /** Responsive size meant for subtitles */
  subtitle: CssLength;
  /** Responsive size for h6 headings */
  h6: CssLength;
  /** Responsive size for h5 headings */
  h5: CssLength;
  /** Responsive size for h4 headings */
  h4: CssLength;
  /** Responsive size for h3 headings */
  h3: CssLength;
  /** Responsive size for h2 headings (20 → 30) */
  h2: CssLength;
  /** Responsive size for h1 headings (24 → 36) */
  h1: CssLength;
  /** Responsive size for display headings, larger than h1 */
  display: CssLength;
  /** Responsive size for the largest headline, larger than display */
  hero: CssLength;
}
export interface FontSizeStaticTokens {
  /** Fixed font size (0.75rem) */
  xs: CssLength;
  /** Fixed font size (0.875rem) */
  sm: CssLength;
  /** Fixed font size (1rem) */
  md: CssLength;
  /** Fixed font size (1.125rem) */
  lg: CssLength;
  /** Fixed font size (1.25rem) */
  xl: CssLength;
  /** Fixed font size (1.5rem) */
  xl2: CssLength;
  /** Fixed font size (1.875rem) */
  xl3: CssLength;
  /** Fixed font size (2.25rem) */
  xl4: CssLength;
  /** Fixed font size (3rem) */
  xl5: CssLength;
  /** Fixed font size (3.75rem) */
  xl6: CssLength;
  /** Fixed font size (4.5rem) */
  xl7: CssLength;
  /** Fixed font size (6rem) */
  xl8: CssLength;
  /** Fixed font size (8rem) */
  xl9: CssLength;
}
export interface LineHeightTokens {
  /** Line height of 1 */
  none: number;
  /** Line height of 1.25 */
  tight: number;
  /** Line height of 1.375 */
  snug: number;
  /** Line height of 1.5 */
  normal: number;
  /** Line height of 1.625 */
  relaxed: number;
  /** Line height of 2 */
  loose: number;
}
export interface TransitionTokens {
  /** Timing function (cubic-bezier) */
  tf: string;
  /** Default duration */
  time: string;
  /** Slow duration */
  timeSlow: string;
  /** Fast duration */
  timeFast: string;
}
export interface BlurTokens {
  /** Heavy blur radius */
  heavy: CssLength;
  /** Light blur radius */
  light: CssLength;
  /** Blur radius used for gradients */
  gradient: CssLength;
}
export interface ZIndexTokens {
  /** Z-index for the header */
  header: number;
  /** Z-index for drawers */
  drawer: number;
  /** Z-index for modals */
  modal: number;
}
export interface ColorTokens {
  /** Primary brand color */
  primary: CssColor;
  /** Content color on top of primary */
  onPrimary: CssColor;
  /** Container color for primary */
  primaryContainer: CssColor;
  /** Content color on top of primaryContainer */
  onPrimaryContainer: CssColor;
  /** Secondary brand color */
  secondary: CssColor;
  /** Content color on top of secondary */
  onSecondary: CssColor;
  /** Container color for secondary */
  secondaryContainer: CssColor;
  /** Content color on top of secondaryContainer */
  onSecondaryContainer: CssColor;
  /** Tertiary brand color */
  tertiary: CssColor;
  /** Content color on top of tertiary */
  onTertiary: CssColor;
  /** Container color for tertiary */
  tertiaryContainer: CssColor;
  /** Content color on top of tertiaryContainer */
  onTertiaryContainer: CssColor;
  /** Error state color */
  error: CssColor;
  /** Content color on top of error */
  onError: CssColor;
  /** Container color for error */
  errorContainer: CssColor;
  /** Content color on top of errorContainer */
  onErrorContainer: CssColor;
  /** Warning state color */
  warn: CssColor;
  /** Content color on top of warn */
  onWarn: CssColor;
  /** Container color for warn */
  warnContainer: CssColor;
  /** Content color on top of warnContainer */
  onWarnContainer: CssColor;
  /** Success state color */
  success: CssColor;
  /** Content color on top of success */
  onSuccess: CssColor;
  /** Container color for success */
  successContainer: CssColor;
  /** Content color on top of successContainer */
  onSuccessContainer: CssColor;
  /** Page background color */
  background: CssColor;
  /** Content color on top of background */
  onBackground: CssColor;
  /** Muted content color on top of background */
  onBackgroundLow: CssColor;
  /** Default surface color */
  surface: CssColor;
  /** Content color on top of surface */
  onSurface: CssColor;
  /** Surface color one step above surface */
  surfaceHigh: CssColor;
  /** Highest elevation surface color */
  surfaceHighest: CssColor;
  /** Dimmed surface color */
  surfaceDim: CssColor;
  /** Bright surface color */
  surfaceBright: CssColor;
  /** Semi-transparent surface color for inputs */
  inputSurface: CssColor;
  /** Primary at 20% opacity */
  primaryAlpha: CssColor;
  /** Secondary at 20% opacity */
  secondaryAlpha: CssColor;
  /** Tertiary at 20% opacity */
  tertiaryAlpha: CssColor;
  /** Error at 20% opacity */
  errorAlpha: CssColor;
  /** Warn at 20% opacity */
  warnAlpha: CssColor;
  /** Success at 20% opacity */
  successAlpha: CssColor;
  /** Color for outlines and borders */
  outline: CssColor;
  /** Color for shadows */
  shadow: CssColor;
  /** Color for modal/drawer scrims */
  scrim: CssColor;
  /** Color for focus rings */
  focus: CssColor;
}
export interface GlobalCssVars {
  /** Theme colors, values change with the active theme and contrast mode */
  color: ColorTokens;
  /** The different spacing values  */
  gap: GapTokens;
  /** The different Border Radii' available to use */
  br: BorderRadiusTokens;
  /** Font families */
  font: FontFamilyTokens;
  /** Font sizes */
  fs: FontSizeStaticTokens & FontSizeResponsiveTokens;
  /** Line heights (unitless multipliers) */
  lh: LineHeightTokens;
  /** Animation values */
  transition: TransitionTokens;
  /** Blur radii */
  blur: BlurTokens;
  /** Z-index layers */
  zi: ZIndexTokens;
  /** Miscellaneous values */
  misc: {
    /** Width of a single column in the 12 column grid */
    columnGridSize: CssLength;
    /** Default border width */
    borderWidth: CssLength;
    /** Stroke width applied to lucide icons */
    iconStrokeWidth: CssLength;
    /** Golden ratio */
    gr: 1.618;
    /** Focus ring shorthand (width, style and color) */
    focusRing: string;
    /** Size of the pointer light effect */
    pointerLightSize: CssLength;
    /** Height of the main Header in the page */
    headerHeight: CssLength;
    /** Height of any other secondary headers that is not the main header */
    headerSecondaryHeight: CssLength;
  };
}

export interface UseGlobalStylesOptions {
  /** When set to true the computed values are returned instead of the `var(--x)` string */
  compute?: boolean;
}

export type GlobalCssVarsGroup = Record<
  keyof GlobalCssVars,
  { prefix: string; numeric?: boolean }
>;
