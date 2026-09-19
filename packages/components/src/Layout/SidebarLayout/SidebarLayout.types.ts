import type { ComponentProps, ReactNode } from "react";

export interface SidebarLayoutSharedProps {
  /** If it should be closed by default
   * @default false
   */
  defaultClosed?: boolean;
  /** Id of the SidebarLayout, use when nesting sidebars
   *  @default "MAIN"
   */
  id?: string;
  /** When full the sidebar closes to 0 width and when shortened the sidebar closes to shortened width
   * @default "shortened"
   */
  closesTo?: "full" | "shortened";
  /** contained is only bg and outlined is bg and border
   * @default "contained"
   */
  variant?: "contained" | "outlined";
  /** The size of the gaps and paddings
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Makes the sidebar float or stay inside the flexbox which shrinks viewport when sidebarOpen is true
   * @default "flex"
   */
  type?: "float" | "flex";
  /** TODO add sidebarPosition functionality */
  sidebarPosition?: "left" | "right";
}
export interface SidebarLayoutContextProps extends Required<SidebarLayoutSharedProps> {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}
export interface SidebarLayoutProps extends SidebarLayoutSharedProps {
  children: ReactNode;
  /** Props of the script tag */
  scriptProps?: ComponentProps<"script">;
  /** Pass nonce to save yourself from CORS issues */
  nonce?: string;
}

export interface SidebarScriptProps extends ComponentProps<"script"> {
  storageKey: string;
  /** If it should be closed by default
   * @default false
   */
  defaultClosed?: boolean;
  /** id of the container element */
  containerId?: string;
}
