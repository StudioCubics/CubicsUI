import { memo, type NamedExoticComponent } from "react";
import type { ListScriptProps } from "./List.types";
import { script } from "./script";

export const ListScript: NamedExoticComponent<ListScriptProps> =
  memo<ListScriptProps>((props) => {
    const {
      nonce,
      storageKey,
      id: scriptId = `list-script-${storageKey}`,
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
