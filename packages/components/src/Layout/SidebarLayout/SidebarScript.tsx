import { memo, type NamedExoticComponent } from "react";
import { script } from "./script";
import type { SidebarScriptProps } from "./SidebarLayout.types";

export const SidebarScript: NamedExoticComponent<SidebarScriptProps> =
  memo<SidebarScriptProps>((props) => {
    const {
      nonce,
      storageKey,
      defaultClosed,
      containerId,
      id: scriptId = `sidebar-script-${storageKey}`,
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
          __html: `(${script.toString()})(${JSON.stringify({ storageKey, defaultClosed, containerId })})`,
        }}
      />
    );
  });
