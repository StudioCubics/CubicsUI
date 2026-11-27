import type { KeyboardEventKeyValue, KeyboardInput } from "@cubicsui/types";
import type { ComponentProps } from "react";

export type KbdKeyProps = {
  content: string;
  sizeX?: number;
  sizeY?: number;
};

export type KbdKeyList = Partial<Record<KeyboardEventKeyValue, KbdKeyProps>>;

export type KbdKey = KeyboardEventKeyValue | (string & {}) | KbdKeyProps;
export type KbdKeyArray = KbdKey[];
export type KbdKeyNestedArray = KbdKey[][];
export type KbdKeys = KeyboardInput<KbdKey>;

export interface KbdProps extends Omit<ComponentProps<"div">, "children"> {
  /** The keys to render based on {@link KeyboardEventKeyValue} */
  keys: KbdKeys;
  /** The size of the font and overall spacing */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Color theme of the Kbd. */
  color?: "primary" | "secondary" | "tertiary" | "error" | "warn" | "success";
  /** Renders a realistic keyboard key designed after one of my favourite logitech keyboard */
  realistic?: boolean;
  /** When true the key grows to fit its text, otherwise the text shrinks to fit the key */
  fitContent?: boolean;
  /** Renders each key combination inside a single kbd element. */
  grouped?: boolean;
}
