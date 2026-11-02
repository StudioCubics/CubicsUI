import type { UnionElementComponentType } from "@cubicsui/types";
import type { ElementType } from "react";
import type {
  TextOrListBaseProps,
  TextOrListDefaultElements,
  TextOrListProps,
} from "./TextOrList.types";

function TextOrListBase<C extends ElementType = TextOrListDefaultElements>(
  props: TextOrListProps<C>,
) {
  const { text, ...rest } = props as TextOrListProps<TextOrListDefaultElements>;
  const t = text?.length === 1 ? text[0] : text;
  if (!t?.length) return null;
  const isString = typeof t === "string";
  const Component = (isString ? "p" : "ul") as ElementType;
  return (
    <Component {...rest}>
      {isString
        ? t
        : t.map((c, i) => {
            // biome-ignore lint/suspicious/noArrayIndexKey: c can be not unique
            return <li key={i}>{c}</li>;
          })}
    </Component>
  );
}

TextOrListBase.displayName = "TextOrList";

/**
 * Use this when you want to render text that is of string or array of string type.
 * By default it renders a `<p>`, when a list is provided it will render a `<ul>` with each error inside an `<li>`.
 * ```tsx
 * <TextOrList text={["text1","text2"]}>...</TextOrList> // Renders `<ul>`
 * <TextOrList text={["text1"]}>...</TextOrList> // Renders <p>
 * <TextOrList text={"text1"}>...</TextOrList> // Renders <p>
 * ```
 */
export const TextOrList = TextOrListBase as UnionElementComponentType<
  TextOrListDefaultElements,
  TextOrListBaseProps
>;
