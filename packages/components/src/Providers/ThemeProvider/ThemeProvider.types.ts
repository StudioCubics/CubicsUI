import type { ReactNode, ComponentProps } from "react";

export type ResolvedTheme = "light" | "dark";
export type Theme = ResolvedTheme | "system";
export interface ThemeContextProps {
  /** Currently selected theme, will contain `"system"` if `enableSystem` is set to true */
  theme: Theme;
  /** Sets the current theme to the name */
  setTheme: (name: Theme) => void;
  /** When `enableSystem` is true it will resolve to either `light` or `dark` */
  resolvedTheme: ResolvedTheme;
  /** This is so that components inside `<ThemeProvider/>` is aware if `enableSystem` is set to true */
  systemEnabled?: boolean;
}
export interface ThemeScriptProps {
  /** The data attribute of the container that will be modified
   * @default "data-theme"
   */
  attribute?: `data-${string}`;
  /** The key that is used to store the theme in localStorage
   * @default "themePreference"
   */
  storageKey?: string;
  /** Default theme when all else fails
   * @default "light"
   */
  defaultTheme?: Theme;
  /** Enables system theme along with dark and light
   * @default false
   */
  enableSystem?: boolean;
  /** Enabling this will add a color scheme of either dark or light to the container
   * @default false
   */
  enableColorScheme?: boolean;
}
export interface ThemeProviderProps extends ThemeScriptProps {
  children: ReactNode;
  /** Disables transitions for all components when changing themes */
  disableTransitionOnChange?: boolean;
  /** Pass nonce to save yourself from CORS issues */
  nonce?: string;
  /** Props of the script tag */
  scriptProps?: ComponentProps<"script">;
}
