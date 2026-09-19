import { memo, type NamedExoticComponent } from "react";
import { script } from "./script";
import type { ContrastScriptProps } from "./ContrastProvider.types";

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
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${JSON.stringify({ attribute, storageKey, defaultContrast })})`,
        }}
      />
    );
  });
