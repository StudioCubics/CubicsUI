export type CssTime = `${"" | "+" | "-"}${number}${"s" | "ms"}`;

export type CssAbsoluteSize =
  | `${"x-" | "xx-" | "xxx-" | ""}${"small" | "large"}`
  | "medium";

export type CssBlendMode =
  | "normal"
  | "darken"
  | "multiply"
  | "color-burn"
  | "lighten"
  | "screen"
  | "color-dodge"
  | "overlay"
  | "soft-light"
  | "hard-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

export type CssRelativeSize = "smaller" | "larger";

export type CssUrl = `url(${string})`;

export type CssFontRelativeLengthUnits =
  | "cap"
  | "ch"
  | "em"
  | "ex"
  | "ic"
  | "lh";

export type CssRootFontRelativeLengthUnits = `r${CssFontRelativeLengthUnits}`;

export type CssViewportRelativeLengthUnits =
  | "vh"
  | "vw"
  | "vmax"
  | "vmin"
  | "vb"
  | "vi";

export type CssSmallViewportRelativeLengthUnits =
  `s${CssViewportRelativeLengthUnits}`;

export type CssLargeViewportRelativeLengthUnits =
  `l${CssViewportRelativeLengthUnits}`;

export type CssDynamicViewportRelativeLengthUnits =
  `d${CssViewportRelativeLengthUnits}`;

export type CssContainerQueryRelativeLengthUnits =
  | "cqw"
  | "cqh"
  | "cqi"
  | "cqb"
  | "cqmin"
  | "cqmax";

export type CssRelativeLengthUnits =
  | CssFontRelativeLengthUnits
  | CssRootFontRelativeLengthUnits
  | CssViewportRelativeLengthUnits
  | CssSmallViewportRelativeLengthUnits
  | CssLargeViewportRelativeLengthUnits
  | CssDynamicViewportRelativeLengthUnits
  | CssContainerQueryRelativeLengthUnits;

export type CssAbsoluteLengthUnits =
  | "px"
  | "cm"
  | "mm"
  | "Q"
  | "in"
  | "pc"
  | "pt";

export type CssLength =
  | `${number}${CssRelativeLengthUnits}`
  | `${number}${CssAbsoluteLengthUnits}`
  | `${number}%`;

export type CssPercentage = `${number}%`;

export type CssLinearEasingFunction =
  | "linear"
  | `linear(${number} ${CssPercentage | ""}, ${number} ${CssPercentage | ""})`;

export type CssCubicBezierEasingFunction =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | `cubic-bezier(${number}, ${number}, ${number}, ${number})`;

export type CssStepEasingFunctionStepPosition =
  | "jump-start"
  | "jump-end"
  | "jump-none"
  | "jump-both"
  | "start"
  | "end";

export type CssStepEasingFunction =
  | "step-start"
  | "step-end"
  | `step(${number}, ${CssStepEasingFunctionStepPosition})`;

export type CssEasingFunction =
  | CssLinearEasingFunction
  | CssCubicBezierEasingFunction
  | CssStepEasingFunction;

// TODO CSSColor
