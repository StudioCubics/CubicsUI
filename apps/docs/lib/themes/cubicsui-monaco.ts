import type { Monaco } from "@monaco-editor/react";

// Extract the theme type from Monaco's namespace
type ThemeData = Parameters<Monaco["editor"]["defineTheme"]>[1];

// ─── Palette (Light) ──────────────────────────────────────────────────────────
// Background  #e6dbde  main editor background
// CurrentLine #828288  current-line highlight / comments (shared)
// Selection   #e6dbde  text selection
// Foreground  #313133  default text
// Red         #b3261e  errors, warnings, deletions
// Orange      #A34D14  numbers, constants, booleans
// Yellow      #846E15  strings, text content
// Green       #4faa78  functions, methods
// Cyan        #514faa  classes, types, support
// Purple      #7a3bcb  instance reserved words (this/self/super) — italic
// Pink        #de599c  keywords, storage types
// ─────────────────────────────────────────────────────────────────────────────

export const cubicsuiLightTheme: ThemeData = {
  base: "vs",
  inherit: true,
  colors: {
    // ── Editor chrome ──────────────────────────────────────────────────────
    "editor.background": "#e6dbde",
    "editor.foreground": "#313133",
    "editor.selectionBackground": "#e6dbde",
    "editor.lineHighlightBackground": "#eedde2",
    "editorCursor.foreground": "#313133",
    "editorWhitespace.foreground": "#e6dbde",
    "editorLineNumber.foreground": "#828288",
    "editorLineNumber.activeForeground": "#313133",

    // ── Editor decorations ─────────────────────────────────────────────────
    "editor.findMatchBackground": "#e6dbde",
    "editor.findMatchHighlightBackground": "#eedde2",
    "editorBracketMatch.background": "#e6dbde",
    "editorBracketMatch.border": "#828288",
    "editorError.foreground": "#b3261e",
    "editorWarning.foreground": "#A34D14",

    // ── Widgets ───────────────────────────────────────────────────────────
    "editorSuggestWidget.background": "#e6dbde",
    "editorSuggestWidget.foreground": "#313133",
    "editorSuggestWidget.selectedBackground": "#e6dbde",
    "editorWidget.background": "#e6dbde",
    "editorHoverWidget.background": "#e6dbde",
    "editorHoverWidget.border": "#828288",

    // ── Diff editor ───────────────────────────────────────────────────────
    "diffEditor.insertedTextBackground": "#4faa7820",
    "diffEditor.removedTextBackground": "#b3261e20",

    // ── Misc ──────────────────────────────────────────────────────────────
    focusBorder: "#828288",
    foreground: "#313133",
    "selection.background": "#e6dbde",
    errorForeground: "#b3261e",

    // ── Input ─────────────────────────────────────────────────────────────
    "input.background": "#e6dbde",
    "input.border": "#828288",
    "input.foreground": "#313133",
    "input.placeholderForeground": "#828288",

    // ── Lists ─────────────────────────────────────────────────────────────
    "list.activeSelectionBackground": "#e6dbde",
    "list.activeSelectionForeground": "#313133",
    "list.hoverBackground": "#e6dbde",
    "list.highlightForeground": "#514faa",
    "list.errorForeground": "#b3261e",
    "list.warningForeground": "#A34D14",

    // ── Scrollbar ─────────────────────────────────────────────────────────
    "scrollbarSlider.background": "#82828840",
    "scrollbarSlider.hoverBackground": "#82828870",
    "scrollbarSlider.activeBackground": "#82828890",
  },

  rules: [
    // ── Base text ─────────────────────────────────────────────────────────
    { token: "", foreground: "313133" },

    // ── Comments → CurrentLine/Comment color, italic ───────────────────────
    { token: "comment", foreground: "828288", fontStyle: "italic" },
    { token: "comment.doc", foreground: "828288", fontStyle: "italic" },

    // ── Keywords / Storage → Pink ─────────────────────────────────────────
    { token: "keyword", foreground: "de599c" },
    { token: "keyword.control", foreground: "de599c" },
    { token: "keyword.operator", foreground: "de599c" },
    { token: "storage", foreground: "de599c" },
    { token: "storage.type", foreground: "de599c" },
    { token: "storage.modifier", foreground: "de599c" },

    // ── Functions / Methods → Green ───────────────────────────────────────
    { token: "entity.name.function", foreground: "4faa78" },
    { token: "support.function", foreground: "4faa78" },

    // ── Classes / Types / Support → Cyan ─────────────────────────────────
    { token: "entity.name.class", foreground: "514faa" },
    { token: "entity.name.type", foreground: "514faa" },
    { token: "support.class", foreground: "514faa" },
    { token: "support.type", foreground: "514faa" },

    // ── Strings → Yellow ──────────────────────────────────────────────────
    { token: "string", foreground: "846E15" },
    { token: "string.escape", foreground: "de599c" },

    // ── Numbers / Constants / Booleans → Orange ───────────────────────────
    { token: "number", foreground: "A34D14" },
    { token: "constant", foreground: "A34D14" },
    { token: "constant.language", foreground: "A34D14" },
    { token: "support.constant", foreground: "A34D14" },

    // ── Instance reserved words (this, self, super) → Purple italic ────────
    { token: "variable.language", foreground: "7a3bcb", fontStyle: "italic" },

    // ── Variables / Parameters → Foreground ──────────────────────────────
    { token: "variable", foreground: "313133" },
    { token: "variable.parameter", foreground: "313133" },

    // ── Operators / Punctuation → Foreground ─────────────────────────────
    { token: "delimiter", foreground: "313133" },
    { token: "delimiter.bracket", foreground: "313133" },
    { token: "keyword.operator", foreground: "313133" },

    // ── Regex → Cyan ─────────────────────────────────────────────────────
    { token: "regexp", foreground: "514faa" },

    // ── Invalid / Errors → Red ────────────────────────────────────────────
    { token: "invalid", foreground: "b3261e" },
    { token: "invalid.deprecated", foreground: "b3261e" },

    // ── Diff ─────────────────────────────────────────────────────────────
    { token: "added", foreground: "4faa78" },
    { token: "deleted", foreground: "b3261e" },
    { token: "changed", foreground: "A34D14" },

    // ── Markdown headings → Pink bold ─────────────────────────────────────
    { token: "keyword.md", foreground: "de599c", fontStyle: "bold" },
    { token: "strong", foreground: "A34D14", fontStyle: "bold" },
    { token: "emphasis", fontStyle: "italic", foreground: "313133" },

    // ── JSX text content → Foreground ────────────────────────────────────
    { token: "jsx-text", foreground: "313133" },
    { token: "jsx-text.tsx", foreground: "313133" },
    { token: "jsx-text.jsx", foreground: "313133" },

    // ── HTML/lowercase tags (<div>, <span>) → Pink ────────────────────────
    { token: "tag", foreground: "de599c" },
    { token: "tag.html", foreground: "de599c" },
    { token: "tag.tsx", foreground: "de599c" },
    { token: "tag.jsx", foreground: "de599c" },
    { token: "metatag", foreground: "de599c" },
    { token: "metatag.tsx", foreground: "de599c" },
    { token: "metatag.jsx", foreground: "de599c" },
    { token: "metatag.content.html", foreground: "de599c" },

    // ── TSX component tags (<Button>, <Provider>) → Cyan ──────────────────
    // Monaco's TSX tokenizer emits uppercase component names as "type.identifier"
    { token: "type.identifier", foreground: "514faa" },
    { token: "type.identifier.tsx", foreground: "514faa" },
    { token: "type.identifier.jsx", foreground: "514faa" },

    // ── Tag angle brackets → Foreground ───────────────────────────────────
    { token: "delimiter.html", foreground: "313133" },
    { token: "delimiter.tag", foreground: "313133" },
    { token: "delimiter.tag.html", foreground: "313133" },
    { token: "delimiter.tag.tsx", foreground: "313133" },
    { token: "delimiter.tag.jsx", foreground: "313133" },

    // ── Attribute names → Green italic ────────────────────────────────────
    { token: "attribute.name", foreground: "4faa78", fontStyle: "italic" },
    { token: "attribute.name.html", foreground: "4faa78", fontStyle: "italic" },
    { token: "tag.attribute.name", foreground: "4faa78", fontStyle: "italic" },
    {
      token: "tag.attribute.name.html",
      foreground: "4faa78",
      fontStyle: "italic",
    },

    // ── Attribute string values → Yellow ──────────────────────────────────
    { token: "attribute.value", foreground: "846E15" },
    { token: "attribute.value.html", foreground: "846E15" },
    { token: "attribute.value.number.html", foreground: "A34D14" },
    { token: "attribute.value.unit.html", foreground: "A34D14" },
    { token: "string.html", foreground: "846E15" },

    // ── JSX expression curly braces → Pink ───────────────────────────────
    { token: "delimiter.curly", foreground: "de599c" },
    { token: "delimiter.bracket.tsx", foreground: "de599c" },
    { token: "delimiter.bracket.jsx", foreground: "de599c" },
  ],
};

// ─── Palette (Dark) ───────────────────────────────────────────────────────────
// Background   #272731  main editor background
// CurrentLine  #19191d  current-line highlight
// Selection    #19191d  text selection
// Foreground   #d9d9da  default text
// Comment      #8c8c93  comments / line numbers
// Red          #e69490  errors, warnings, deletions
// Orange       #FFB86C  numbers, constants, parameters
// Yellow       #F1FA8C  strings, text content
// Green        #50FA7B  functions, methods, attributes
// Cyan         #9a97e6  classes, types, support
// Purple       #bc9de6  constants, instance reserved words (this/self)
// Pink         #e6a8c7  keywords, storage types
// ─────────────────────────────────────────────────────────────────────────────

export const cubicsuiDarkTheme: ThemeData = {
  base: "vs-dark",
  inherit: true,
  colors: {
    // ── Editor chrome ──────────────────────────────────────────────────────
    "editor.background": "#272731",
    "editor.foreground": "#d9d9da",
    "editor.selectionBackground": "#19191d",
    "editor.selectionHighlightBackground": "#272731",
    "editor.lineHighlightBorder": "#19191d",
    "editor.findMatchBackground": "#FFB86C80",
    "editor.findMatchHighlightBackground": "#FFFFFF40",
    "editor.hoverHighlightBackground": "#9a97e650",
    "editor.wordHighlightBackground": "#9a97e650",
    "editor.wordHighlightStrongBackground": "#50FA7B50",
    "editor.rangeHighlightBackground": "#bc9de615",

    // ── Editor decorations ─────────────────────────────────────────────────
    "editorLineNumber.foreground": "#8c8c93",
    "editorCursor.foreground": "#d9d9da",
    "editorWhitespace.foreground": "#FFFFFF1A",
    "editorIndentGuide.background": "#FFFFFF1A",
    "editorRuler.foreground": "#FFFFFF1A",
    "editorCodeLens.foreground": "#8c8c93",
    "editorLink.activeForeground": "#9a97e6",
    "editorError.foreground": "#e69490",
    "editorWarning.foreground": "#9a97e6",
    "editorBracketMatch.background": "#19191d",
    "editorBracketMatch.border": "#8c8c93",

    // ── Gutter ────────────────────────────────────────────────────────────
    "editorGutter.addedBackground": "#50FA7B80",
    "editorGutter.deletedBackground": "#e6949080",
    "editorGutter.modifiedBackground": "#9a97e680",
    "editorOverviewRuler.border": "#272731",
    "editorOverviewRuler.addedForeground": "#50FA7B80",
    "editorOverviewRuler.deletedForeground": "#e6949080",
    "editorOverviewRuler.modifiedForeground": "#9a97e680",
    "editorOverviewRuler.errorForeground": "#e6949080",
    "editorOverviewRuler.warningForeground": "#FFB86C80",

    // ── Widgets ───────────────────────────────────────────────────────────
    "editorHoverWidget.background": "#272731",
    "editorHoverWidget.border": "#8c8c93",
    "editorSuggestWidget.background": "#19191d",
    "editorSuggestWidget.foreground": "#d9d9da",
    "editorSuggestWidget.selectedBackground": "#19191d",
    "editorWidget.background": "#19191d",
    "editorGroup.border": "#bc9de6",
    "editorGroupHeader.tabsBackground": "#272731",

    // ── Diff editor ───────────────────────────────────────────────────────
    "diffEditor.insertedTextBackground": "#50FA7B20",
    "diffEditor.removedTextBackground": "#e6949050",

    // ── Misc ──────────────────────────────────────────────────────────────
    focusBorder: "#8c8c93",
    foreground: "#d9d9da",
    "selection.background": "#bc9de6",
    errorForeground: "#e69490",
    "progressBar.background": "#e6a8c7",

    // ── Input ─────────────────────────────────────────────────────────────
    "input.background": "#272731",
    "input.border": "#272731",
    "input.foreground": "#d9d9da",
    "input.placeholderForeground": "#8c8c93",

    // ── Lists ─────────────────────────────────────────────────────────────
    "list.activeSelectionBackground": "#19191d",
    "list.activeSelectionForeground": "#d9d9da",
    "list.hoverBackground": "#19191d75",
    "list.highlightForeground": "#9a97e6",
    "list.errorForeground": "#e69490",
    "list.warningForeground": "#FFB86C",

    // ── Scrollbar ─────────────────────────────────────────────────────────
    "scrollbarSlider.background": "#8c8c9340",
    "scrollbarSlider.hoverBackground": "#8c8c9370",
    "scrollbarSlider.activeBackground": "#8c8c9390",
  },

  rules: [
    // ── Base ──────────────────────────────────────────────────────────────
    { token: "", foreground: "d9d9da" },

    // ── Comments → Comment color (#8c8c93) ────────────────────────────────
    { token: "comment", foreground: "8c8c93" },
    { token: "comment.doc", foreground: "8c8c93" },

    // ── Keywords / Storage → Pink ─────────────────────────────────────────
    { token: "keyword", foreground: "e6a8c7" },
    { token: "keyword.control", foreground: "e6a8c7" },
    { token: "keyword.operator", foreground: "e6a8c7" },
    { token: "storage", foreground: "e6a8c7" },
    { token: "storage.type", foreground: "e6a8c7" },
    { token: "storage.modifier", foreground: "e6a8c7" },

    // ── Strings → Yellow ──────────────────────────────────────────────────
    { token: "string", foreground: "F1FA8C" },
    { token: "string.escape", foreground: "e6a8c7" }, // escape sequences → Pink

    // ── Numbers / Constants → Orange / Purple ─────────────────────────────
    { token: "number", foreground: "FFB86C" },
    { token: "constant", foreground: "bc9de6" }, // constants → Purple
    { token: "constant.language", foreground: "bc9de6" },

    // ── Functions / Methods → Green ───────────────────────────────────────
    { token: "entity.name.function", foreground: "50FA7B" },
    { token: "support.function", foreground: "50FA7B" },

    // ── Classes / Types → Cyan ────────────────────────────────────────────
    { token: "entity.name.class", foreground: "9a97e6" },
    { token: "entity.name.type", foreground: "9a97e6", fontStyle: "italic" },
    { token: "support.class", foreground: "9a97e6" },
    { token: "support.type", foreground: "9a97e6", fontStyle: "italic" },

    // ── Variables → Foreground ────────────────────────────────────────────
    { token: "variable", foreground: "d9d9da" },
    { token: "variable.parameter", foreground: "FFB86C", fontStyle: "italic" }, // Parameters → Orange italic

    // ── Instance reserved words (this, self) → Purple italic ──────────────
    { token: "variable.language", foreground: "bc9de6", fontStyle: "italic" },

    // ── Regex → Yellow ────────────────────────────────────────────────────
    { token: "regexp", foreground: "F1FA8C" },

    // ── Type parameters → Orange ──────────────────────────────────────────
    { token: "type.parameter", foreground: "FFB86C" },

    // ── Delimiters / Punctuation → Foreground ─────────────────────────────
    { token: "delimiter", foreground: "d9d9da" },
    { token: "delimiter.bracket", foreground: "d9d9da" },

    // ── Template interpolation / JSX expression curly braces → Pink ───────
    { token: "delimiter.curly", foreground: "e6a8c7" },

    // ── Invalid → Red ─────────────────────────────────────────────────────
    { token: "invalid", foreground: "e69490", fontStyle: "italic underline" },
    {
      token: "invalid.deprecated",
      foreground: "d9d9da",
      fontStyle: "italic underline",
    },

    // ── Decorators → Green ────────────────────────────────────────────────
    { token: "annotation", foreground: "50FA7B" },
    { token: "decorator", foreground: "50FA7B" },

    // ── Markdown ──────────────────────────────────────────────────────────
    { token: "emphasis", fontStyle: "italic", foreground: "d9d9da" },
    { token: "strong", fontStyle: "bold", foreground: "FFB86C" },
    { token: "keyword.md", foreground: "bc9de6", fontStyle: "bold" }, // headings

    // ── JSX text content ("Get Started" etc.) → Foreground ────────────────
    // Monaco emits "jsx-text" for raw text nodes between JSX tags
    { token: "jsx-text", foreground: "d9d9da" },
    { token: "jsx-text.tsx", foreground: "d9d9da" },
    { token: "jsx-text.jsx", foreground: "d9d9da" },

    // ── HTML/lowercase tags (<div>, <span>) → Pink ────────────────────────
    { token: "tag", foreground: "e6a8c7" },
    { token: "tag.html", foreground: "e6a8c7" },
    { token: "tag.tsx", foreground: "e6a8c7" },
    { token: "tag.jsx", foreground: "e6a8c7" },
    { token: "metatag", foreground: "e6a8c7" },
    { token: "metatag.tsx", foreground: "e6a8c7" },
    { token: "metatag.jsx", foreground: "e6a8c7" },
    { token: "metatag.content.html", foreground: "e6a8c7" },

    // ── TSX component tags (<Button>, <Provider>) → Cyan ──────────────────
    // Monaco's TSX tokenizer emits uppercase component names as "type.identifier"
    { token: "type.identifier", foreground: "9a97e6" },
    { token: "type.identifier.tsx", foreground: "9a97e6" },
    { token: "type.identifier.jsx", foreground: "9a97e6" },

    // ── Tag angle brackets → Foreground ───────────────────────────────────
    { token: "delimiter.html", foreground: "d9d9da" },
    { token: "delimiter.tag", foreground: "d9d9da" },
    { token: "delimiter.tag.html", foreground: "d9d9da" },
    { token: "delimiter.tag.tsx", foreground: "d9d9da" },
    { token: "delimiter.tag.jsx", foreground: "d9d9da" },

    // ── Attribute names → Green italic ────────────────────────────────────
    { token: "attribute.name", foreground: "50FA7B", fontStyle: "italic" },
    { token: "attribute.name.html", foreground: "50FA7B", fontStyle: "italic" },
    { token: "tag.attribute.name", foreground: "50FA7B", fontStyle: "italic" },
    {
      token: "tag.attribute.name.html",
      foreground: "50FA7B",
      fontStyle: "italic",
    },

    // ── Attribute string values → Yellow ──────────────────────────────────
    { token: "attribute.value", foreground: "F1FA8C" },
    { token: "attribute.value.html", foreground: "F1FA8C" },
    { token: "attribute.value.number.html", foreground: "FFB86C" },
    { token: "attribute.value.unit.html", foreground: "FFB86C" },
    { token: "string.html", foreground: "F1FA8C" },

    // ── JSX expression curly braces (more specific overrides) ─────────────
    { token: "delimiter.bracket.tsx", foreground: "e6a8c7" },
    { token: "delimiter.bracket.jsx", foreground: "e6a8c7" },
  ],
};
