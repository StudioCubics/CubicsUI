import type { ComponentProps } from "react";

const IS_SERVER = typeof window === "undefined";

export function withDisabledTransitions(
  apply: () => void,
  props: ComponentProps<"style"> = {},
): void {
  if (IS_SERVER) {
    apply();
    return;
  }
  const { nonce } = props;
  const css = document.createElement("style");
  if (nonce) css.setAttribute("nonce", nonce);
  css.appendChild(
    document.createTextNode("*,*::before,*::after{transition:none!important}"),
  );
  document.head.appendChild(css);

  apply();

  // Force a reflow so the "no transition" rule applies before removal.
  window.getComputedStyle(document.body);

  setTimeout(() => {
    document.head.removeChild(css);
  }, 1);
}
