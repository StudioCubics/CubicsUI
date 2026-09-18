import { memo, type NamedExoticComponent } from "react";
import { script } from "./script";
import type { ListScriptProps } from "./List.types";

export const ListScript: NamedExoticComponent<ListScriptProps> =
  memo<ListScriptProps>((props) => {
    const { nonce, storageKey, id, ...rest } = props;
    const scriptId = id ?? `list-script-${storageKey}`;
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
