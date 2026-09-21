import type { ComponentProps, ElementType, ReactNode } from "react";
import type { GlassCardProps } from "../GlassCard/GlassCard";
import type { PolymorphicComponentProps, SetState } from "@cubicsui/types";

export interface TabsContextProps {
  /** Value of the active tab */
  activeTab: string | null;
  /** To set active tab to another tab */
  setActiveTab: SetState<string | null>;
}

export interface TabsProps {
  children: ReactNode;
  defaultTab?: string;
}

export interface TabsBarProps extends ComponentProps<"nav"> {
  /** Color of the Tabs */
  color?: "primary" | "secondary" | "tertiary" | "error";
  /** Size of the Tabs */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Removes the TabsBar background */
  removeBg?: boolean;
  /** Makes the TabsBar 100% of the container's width and removes the margin-inline auto */
  fullWidth?: boolean;
  /** Toggles rendering of indicator not yet implemented */
  renderGlider?: boolean;
  /** Component to use for the glider not yet implemented */
  GliderComponent?: ElementType;
  slotProps?: {
    glider?: GlassCardProps;
  };
}

export interface TabBaseProps {
  /** Value of the tab in string will be used to make the tab active when selected unless its disabled */
  value: string;
  /** Renders a node at the start of the tab. */
  startAdornment?: ReactNode;
  /** Renders a node at the end of the tab. */
  endAdornment?: ReactNode;
  /** If a tab should be disabled */
  disabled?: boolean;
  /** If a tab has href it is automatically an `<a/>` or `LinkComponent` or else it will be whatever is passed to `as` or "div" by default */
  href?: ComponentProps<"a">["href"];
  /** Component like `Link` from next/link can be passed to use that instead of `<a/>` */
  LinkComponent?: ElementType;
  slotProps?: {
    startAdornment?: ComponentProps<"span">;
    endAdornment?: ComponentProps<"span">;
  };
}

export type TabProps<C extends ElementType = "button"> =
  PolymorphicComponentProps<C, TabBaseProps>;
