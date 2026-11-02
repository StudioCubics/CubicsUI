import { memo, type NamedExoticComponent } from "react";
import type { ContrastScriptProps } from "./ContrastProvider.types";
import { script } from "./script";

export const ContrastScript: NamedExoticComponent<ContrastScriptProps> =
  memo<ContrastScriptProps>((props) => {
    const {
      nonce,
      attribute,
      storageKey,
      defaultContrast,
      id: scriptId = `contrast-script-${storageKey}`,
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
          __html: `(${script.toString()})(${JSON.stringify({ attribute, storageKey, defaultContrast })})`,
        }}
      />
    );
  });
