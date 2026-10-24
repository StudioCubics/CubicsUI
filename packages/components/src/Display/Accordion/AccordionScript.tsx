import { memo, type NamedExoticComponent } from "react";
import { script } from "./script";
import type { AccordionScriptProps } from "./Accordion.types";

export const AccordionScript: NamedExoticComponent<AccordionScriptProps> =
  memo<AccordionScriptProps>((props) => {
    const {
      nonce,
      storageKey,
      id: scriptId = `accordion-script-${storageKey}`,
      ...rest
    } = props;
    const shouldRenderScript =
      typeof document === "undefined" ||
      document.getElementById(scriptId) !== null;

    if (!shouldRenderScript) return null;
    return (
      <script
        {...rest}
        id={scriptId}
        suppressHydrationWarning
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${JSON.stringify(storageKey)})`,
        }}
      />
    );
  });
