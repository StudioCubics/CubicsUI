import type { UnionElementProps } from "@cubicsui/types";
import type { ElementType } from "react";

export type TextOrListDefaultElements = "p" | "ul";

export type TextOrListProps<C extends ElementType = TextOrListDefaultElements> =
  UnionElementProps<C, TextOrListBaseProps>;

export type TextOrListBaseProps = {
  /** String or array of strings, will render a `<ul/>` with the strings in `<li/>` if text is array of strings*/
  text?: string | string[];
  /** Children are not allowed */
  children?: null;
};
