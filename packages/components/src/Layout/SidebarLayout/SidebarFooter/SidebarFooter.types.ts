import type { ComponentProps } from "react";

export interface SidebarFooterProps extends ComponentProps<"div"> {
  /** Shows the content of the sidebarBody when the sidebar is closed too
   * @default false
   */
  showOnClose?: boolean;
}
