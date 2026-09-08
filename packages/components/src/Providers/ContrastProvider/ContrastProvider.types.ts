import type { ComponentProps, ReactNode } from "react";

export interface ContrastScriptProps {
  /** The data attribute of the container that will be modified
   * @default "data-contrast"
   */
  attribute?: `data-${string}`;
  /** The key that is used to store the theme in localStorage
   * @default "contrastPreference"
   */
  storageKey?: string;

  /** Default value when all else fails
   * @default false
   */
  defaultContrast?: boolean;
}

export interface ContrastProviderProps extends ContrastScriptProps {
  children?: ReactNode;
  /** Disables transitions for all components when changing contrast value */
  disableTransitionOnChange?: boolean;
  /** Pass nonce to save yourself from CORS issues */
  nonce?: string;
  /** Props of the script tag */
  scriptProps?: ComponentProps<"script">;
}
export interface ContrastContextProps {
  /** Sets `[data-contrast="true"]` when true */
  contrast: boolean;
  /** Sets the current theme to the name */
  setContrast: (on: boolean) => void;
}
