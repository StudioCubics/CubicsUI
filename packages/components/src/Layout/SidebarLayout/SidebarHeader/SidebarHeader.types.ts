import type { ComponentProps, ReactNode } from "react";

export interface SidebarHeaderProps extends ComponentProps<"div"> {
  children?: ReactNode;
  disablePadding?: boolean;
  logo?: ReactNode;
  sidebarToggle?: ReactNode;
}
