export const KBD_BUTTON_LIST = {
  A: { content: "A" },
  B: { content: "B" },
  C: { content: "C" },
  D: { content: "D" },
  E: { content: "E" },
  F: { content: "F" },
  G: { content: "G" },
  H: { content: "H" },
  I: { content: "I" },
  J: { content: "J" },
  K: { content: "K" },
  L: { content: "L" },
  M: { content: "M" },
  N: { content: "N" },
  O: { content: "O" },
  P: { content: "P" },
  Q: { content: "Q" },
  R: { content: "R" },
  S: { content: "S" },
  T: { content: "T" },
  U: { content: "U" },
  V: { content: "V" },
  W: { content: "W" },
  X: { content: "X" },
  Y: { content: "Y" },
  Z: { content: "Z" },

  "0": { content: "0" },
  "1": { content: "1" },
  "2": { content: "2" },
  "3": { content: "3" },
  "4": { content: "4" },
  "5": { content: "5" },
  "6": { content: "6" },
  "7": { content: "7" },
  "8": { content: "8" },
  "9": { content: "9" },

  "`": { content: "`" },
  "-": { content: "-" },
  "=": { content: "=" },
  "[": { content: "[" },
  "]": { content: "]" },
  Backslash: {
    content: "\\",
  },
  ";": { content: ";" },
  "'": {
    content: "'",
  },
  ",": { content: "," },
  ".": { content: "." },
  Forwardslash: {
    content: "/",
  },

  "~": { content: "~" },
  "!": { content: "!" },
  "@": { content: "@" },
  "#": { content: "#" },
  $: { content: "$" },
  "%": { content: "%" },
  "^": { content: "^" },
  "&": { content: "&" },
  "*": { content: "*" },
  "(": { content: "(" },
  ")": { content: ")" },
  _: { content: "_" },
  "+": { content: "+" },

  "{": {
    content: "{",
  },
  "}": {
    content: "}",
  },
  "|": { content: "|" },
  ":": { content: ":" },
  '"': {
    content: '"',
  },
  "<": {
    content: "<",
  },
  ">": {
    content: ">",
  },
  "?": { content: "?" },

  Space: {
    content: "Space",
  },
  Enter: {
    content: "Enter",
  },
  Backspace: {
    content: "Backspace",
  },
  Esc: {
    content: "Esc",
  },
  Shift: {
    content: "Shift",
  },
  Ctrl: {
    content: "Ctrl",
  },
  Alt: {
    content: "Alt",
  },

  Tab: {
    content: "Tab\n↹",
  },

  CapsLock: {
    content: "Caps\nLock",
  },
  Fn: { content: "Fn" },
  UpArrow: {
    content: "↑",
  },
  DownArrow: {
    content: "↓",
  },
  LeftArrow: {
    content: "←",
  },
  RightArrow: {
    content: "→",
  },

  Insert: {
    content: "Insert",
  },
  Delete: {
    content: "Delete",
  },
  Home: {
    content: "Home",
  },
  End: {
    content: "End",
  },
  PageUp: {
    content: "Pg Up",
  },
  PageDown: {
    content: "Pg Dn",
  },

  PrintScreen: {
    content: "Print\nScr",
  },

  ScrollLock: {
    content: "Scrl\nLock",
  },

  Pause: {
    content: "Pause",
  },

  NumLock: {
    content: "Num\nLock",
  },

  "⌘": { content: "⌘" },

  "⏮": {
    content: "⏮",
  },
  "▶": {
    content: "▶",
  },
  "⏸": {
    content: "⏸",
  },
  "⏯": {
    content: "⏯",
  },
  "⏹": {
    content: "⏹",
  },
  "⏭": {
    content: "⏭",
  },
  "⏪": {
    content: "⏪",
  },
  "⏩": {
    content: "⏩",
  },
  "🕨": {
    content: "🕨",
  },
  "🕩": {
    content: "🕩",
  },
  "🕪": {
    content: "🕪",
  },
  "🔇": {
    content: "🔇",
  },
} as const;
export function getCornerStops(
  width: number,
  height: number,
): {
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  topLeft: number;
} {
  const cx = width / 2;
  const cy = height / 2;

  const angle = (x: number, y: number) => {
    const deg = Math.atan2(x - cx, cy - y) * (180 / Math.PI);

    return (((deg + 360) % 360) / 360) * 100;
  };

  return {
    topRight: angle(width, 0),
    bottomRight: angle(width, height) - 10,
    bottomLeft: angle(0, height),
    topLeft: angle(0, 0),
  };
}
