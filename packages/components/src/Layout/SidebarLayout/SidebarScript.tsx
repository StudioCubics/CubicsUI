import { memo, type NamedExoticComponent } from "react";
import type { SidebarScriptProps } from "./SidebarLayout.types";
import { script } from "./script";

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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: this has to be passed in a script tag
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${JSON.stringify({ storageKey, defaultClosed, containerId })})`,
        }}
      />
    );
  });
