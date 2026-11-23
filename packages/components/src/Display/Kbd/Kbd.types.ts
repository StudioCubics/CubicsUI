import type { ComponentProps } from "react";
import type { KBD_BUTTON_LIST } from "./Kbd.utils";

export interface KbdProps extends Omit<ComponentProps<"div">, "children"> {
  buttons: KeyCombo;
  /** The size of the font and overall spacing */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Renders a realistic keyboard key designed after one of my favourite logitech keyboard */
  realistic?: boolean;
  /** When true the key grows to fit its text, otherwise the text shrinks to fit the key */
  fitContent?: boolean;
}

export type ButtonSpec = {
  content: string;
  sizeX?: number;
  sizeY?: number;
};

export type ButtonList = typeof KBD_BUTTON_LIST;

export type KeyboardKey = keyof ButtonList;

// `string & {}` keeps the literals visible in autocomplete while still accepting any string
export type KeyInput = KeyboardKey | (string & {}) | ButtonSpec;
export type KeyCombo = KeyInput[];
