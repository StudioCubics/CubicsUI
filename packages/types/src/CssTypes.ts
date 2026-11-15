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

export type CssNamedColor =
  | "black"
  | "silver"
  | "gray"
  | "white"
  | "maroon"
  | "red"
  | "purple"
  | "fuchsia"
  | "green"
  | "lime"
  | "olive"
  | "yellow"
  | "navy"
  | "blue"
  | "teal"
  | "aqua"
  | "orange"
  | "aliceblue"
  | "antiquewhite"
  | "aquamarine"
  | "azure"
  | "beige"
  | "bisque"
  | "blanchedalmond"
  | "blueviolet"
  | "brown"
  | "burlywood"
  | "cadetblue"
  | "chartreuse"
  | "chocolate"
  | "coral"
  | "cornflowerblue"
  | "cornsilk"
  | "crimson"
  | "cyan"
  | "darkblue"
  | "darkcyan"
  | "darkgoldenrod"
  | "darkgray"
  | "darkgreen"
  | "darkgrey"
  | "darkkhaki"
  | "darkmagenta"
  | "darkolivegreen"
  | "darkorange"
  | "darkorchid"
  | "darkred"
  | "darksalmon"
  | "darkseagreen"
  | "darkslateblue"
  | "darkslategray"
  | "darkslategrey"
  | "darkturquoise"
  | "darkviolet"
  | "deeppink"
  | "deepskyblue"
  | "dimgray"
  | "dimgrey"
  | "dodgerblue"
  | "firebrick"
  | "floralwhite"
  | "forestgreen"
  | "gainsboro"
  | "ghostwhite"
  | "gold"
  | "goldenrod"
  | "greenyellow"
  | "grey"
  | "honeydew"
  | "hotpink"
  | "indianred"
  | "indigo"
  | "ivory"
  | "khaki"
  | "lavender"
  | "lavenderblush"
  | "lawngreen"
  | "lemonchiffon"
  | "lightblue"
  | "lightcoral"
  | "lightcyan"
  | "lightgoldenrodyellow"
  | "lightgray"
  | "lightgreen"
  | "lightgrey"
  | "lightpink"
  | "lightsalmon"
  | "lightseagreen"
  | "lightskyblue"
  | "lightslategray"
  | "lightslategrey"
  | "lightsteelblue"
  | "lightyellow"
  | "limegreen"
  | "linen"
  | "magenta"
  | "mediumaquamarine"
  | "mediumblue"
  | "mediumorchid"
  | "mediumpurple"
  | "mediumseagreen"
  | "mediumslateblue"
  | "mediumspringgreen"
  | "mediumturquoise"
  | "mediumvioletred"
  | "midnightblue"
  | "mintcream"
  | "mistyrose"
  | "moccasin"
  | "navajowhite"
  | "oldlace"
  | "olivedrab"
  | "orangered"
  | "orchid"
  | "palegoldenrod"
  | "palegreen"
  | "paleturquoise"
  | "palevioletred"
  | "papayawhip"
  | "peachpuff"
  | "peru"
  | "pink"
  | "plum"
  | "powderblue"
  | "rebeccapurple"
  | "rosybrown"
  | "royalblue"
  | "saddlebrown"
  | "salmon"
  | "sandybrown"
  | "seagreen"
  | "seashell"
  | "sienna"
  | "skyblue"
  | "slateblue"
  | "slategray"
  | "slategrey"
  | "snow"
  | "springgreen"
  | "steelblue"
  | "tan"
  | "thistle"
  | "tomato"
  | "turquoise"
  | "violet"
  | "wheat"
  | "whitesmoke"
  | "yellowgreen";

export type CssSystemColor = "currentcolor" | "transparent";

// Hex: #rgb, #rgba, #rrggbb, #rrggbbaa (shape only; hex digits aren't validated)
export type CssHexColor = `#${string}`;

// Legacy comma syntax and modern space/slash syntax
type CssAlpha = CssPercentage | number;
type CssChannel = number | CssPercentage;

export type CssRgbColor =
  | `rgb(${CssChannel}, ${CssChannel}, ${CssChannel})`
  | `rgba(${CssChannel}, ${CssChannel}, ${CssChannel}, ${CssAlpha})`
  | `rgb(${CssChannel} ${CssChannel} ${CssChannel})`
  | `rgb(${CssChannel} ${CssChannel} ${CssChannel} / ${CssAlpha})`;

type CssAngle = `${number}${"deg" | "grad" | "rad" | "turn" | ""}`;

export type CssHslColor =
  | `hsl(${CssAngle}, ${CssPercentage}, ${CssPercentage})`
  | `hsla(${CssAngle}, ${CssPercentage}, ${CssPercentage}, ${CssAlpha})`
  | `hsl(${CssAngle} ${CssPercentage} ${CssPercentage})`
  | `hsl(${CssAngle} ${CssPercentage} ${CssPercentage} / ${CssAlpha})`;

export type CssHwbColor =
  | `hwb(${CssAngle} ${CssPercentage} ${CssPercentage})`
  | `hwb(${CssAngle} ${CssPercentage} ${CssPercentage} / ${CssAlpha})`;

export type CssLabColor =
  | `lab(${CssPercentage | number} ${number} ${number})`
  | `lab(${CssPercentage | number} ${number} ${number} / ${CssAlpha})`
  | `oklab(${CssPercentage | number} ${number} ${number})`
  | `oklab(${CssPercentage | number} ${number} ${number} / ${CssAlpha})`;

export type CssLchColor =
  | `lch(${CssPercentage | number} ${number} ${CssAngle})`
  | `lch(${CssPercentage | number} ${number} ${CssAngle} / ${CssAlpha})`
  | `oklch(${CssPercentage | number} ${number} ${CssAngle})`
  | `oklch(${CssPercentage | number} ${number} ${CssAngle} / ${CssAlpha})`;

export type CssColorFunction =
  | `color(${string})`
  | `color-mix(${string})`
  | `light-dark(${string})`;

export type CssVariableColor = `var(--${string})`;

export type CssColor =
  | CssNamedColor
  | CssSystemColor
  | CssHexColor
  | CssRgbColor
  | CssHslColor
  | CssHwbColor
  | CssLabColor
  | CssLchColor
  | CssColorFunction
  | CssVariableColor;
