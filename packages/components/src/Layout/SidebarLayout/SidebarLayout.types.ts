import type { PersistScrollPositionWithId } from "@cubicsui/hooks";
import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ComponentProps, ElementType, ReactNode } from "react";

export interface SidebarLayoutSharedProps {
  /** If it should be closed by default
   * @default false */
  defaultClosed?: boolean;
  /** Id of the SidebarLayout, use when nesting sidebars
   *  @default "MAIN" */
  id?: string;
  /** When full the sidebar closes to 0 width and when shortened the sidebar closes to shortened width
   * @default "shortened" */
  closesTo?: "full" | "shortened";
  /** contained is only bg and outlined is bg and border
   * @default "contained" */
  variant?: "contained" | "outlined";
  /** The size of the gaps and paddings
   * @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Makes the sidebar float or stay inside the flexbox which shrinks viewport when sidebarOpen is true
   * @default "flex" */
  type?: "float" | "flex";
  /** Side of the sidebar, when using `type="flex"` make sure to place the sidebar after the viewport if you want the sidebar to be at the right side.
   * @default "left" */
  side?: "left" | "right";
  /** Controlled open state. When provided, the parent owns the state */
  open?: boolean;
  /** Called when the sidebar wants to change its open state */
  onOpenChange?: (open: boolean) => void;
}
export interface SidebarLayoutContextProps extends SidebarLayoutSharedProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}
export interface SidebarLayoutBaseProps extends SidebarLayoutSharedProps {
  children: ReactNode;
  /** Pass nonce to save yourself from CORS issues */
  nonce?: string;
  slotProps?: {
    /** Props of the script tag */
    script?: ComponentProps<"script">;
  };
}
export type SidebarLayoutProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, SidebarLayoutBaseProps>;

export interface SidebarScriptProps extends ComponentProps<"script"> {
  storageKey: string;
  /** If it should be closed by default
   * @default false
   */
  defaultClosed?: boolean;
  /** id of the container element */
  containerId?: string;
}

export interface SidebarBgProps {
  /** Removes the background surface */
  removeBg?: boolean;
}
export interface SidebarShowProps {
  /** Shows the content of the sidebarBody only when the sidebar is open
   * @default false
   */
  showOnClose?: boolean;
}

export type SidebarProps = ComponentProps<"aside"> & {
  children: ReactNode;
} & SidebarBgProps;

export interface SidebarHeaderProps extends Omit<
  ComponentProps<"div">,
  "title"
> {
  children?: ReactNode;
  /** Brand logo or title of the sidebar */
  title?: ReactNode;
  /** Custom sidebar toggle */
  sidebarToggle?: ReactNode;
}

export type SidebarBodyProps = ComponentProps<"div"> &
  SidebarShowProps &
  PersistScrollPositionWithId;

export type SidebarViewportBaseProps = PersistScrollPositionWithId &
  SidebarBgProps;
export type SidebarViewportProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, SidebarViewportBaseProps>;
