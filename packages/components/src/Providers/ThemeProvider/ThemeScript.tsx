import { memo, type NamedExoticComponent } from "react";
import { script } from "./script";
import type { ThemeScriptProps } from "./ThemeProvider.types";

export const ThemeScript: NamedExoticComponent<ThemeScriptProps> =
  memo<ThemeScriptProps>((props) => {
    const {
      attribute,
      storageKey,
      defaultTheme,
      enableSystem,
      enableColorScheme,
      nonce,
      scriptProps,
    } = props;
    const scriptId = `theme-script-${storageKey}`;
    const scriptArgs = {
      attribute,
      storageKey,
      defaultTheme,
      enableSystem,
      enableColorScheme,
    };
    const shouldRenderScript =
      typeof document === "undefined" ||
      document.getElementById(scriptId) !== null;

    if (!shouldRenderScript) return null;
    return (
      <script
        {...scriptProps}
        suppressHydrationWarning
        nonce={typeof window === "undefined" ? nonce : ""}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: this has to be passed in a script tag
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${JSON.stringify(scriptArgs)})`,
        }}
      />
    );
  });
