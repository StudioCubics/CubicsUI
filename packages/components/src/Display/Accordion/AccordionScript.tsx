import { memo, type NamedExoticComponent } from "react";
import type { AccordionScriptProps } from "./Accordion.types";
import { script } from "./script";

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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: this has to be passed in a script tag
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${JSON.stringify(storageKey)})`,
        }}
      />
    );
  });
