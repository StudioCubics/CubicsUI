import type { ComponentProps } from "react";

export interface SidebarBodyProps extends ComponentProps<"div"> {
  /** Shows the content of the sidebarBody only when the sidebar is open
   * @default false
   */
  showOnClose?: boolean;
}
