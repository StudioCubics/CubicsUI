import type {
  ReactNode,
  ComponentProps,
  ToggleEvent,
  ElementType,
} from "react";
import type { GlassCardProps } from "../GlassCard/GlassCard";
import type { PolymorphicComponentProps } from "@cubicsui/types";
import type {
  UseDisclosureGroupProps,
  UseDisclosureGroupReturn,
} from "@cubicsui/hooks";

export type AccordionContextProps = UseDisclosureGroupReturn;

type GliderOnlyOnExclusive =
  | {
      /** Only allow one accordion to stay open */
      exclusive: true;
      /** Toggles rendering of indicator */
      renderGlider?: true;
    }
  | { exclusive?: false; renderGlider?: false };

export type AccordionBaseProps = {
  id?: string;
  children?: ReactNode;
  /** Component to use for the glider not yet implemented */
  GliderComponent?: ElementType;
  /** Pass nonce to save yourself from CORS issues */
  nonce?: string;
  /** Props of the script tag */
  scriptProps?: ComponentProps<"script">;
  slotProps?: {
    glider?: GlassCardProps;
  };
} & Omit<UseDisclosureGroupProps, "fallbackCollapsed" | "save-only"> &
  GliderOnlyOnExclusive;

export type AccordionProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, AccordionBaseProps>;

export interface AccordionScriptProps extends ComponentProps<"script"> {
  storageKey: string;
}

export type AccordionItemProps = {
  /** Different style variants */
  variant?: "contained" | "outlined";
  /** Color theme of the accordion item. */
  color?: "primary" | "secondary" | "tertiary" | "error" | "warn" | "success";
  /** Accordion item size.
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Required `<summary/>` of the accordion */
  summary: ReactNode;
  /** Runs when accordion item is toggled */
  onToggle?: (e: ToggleEvent<HTMLDetailsElement>, current: boolean) => void;
  /** If the item should be collapsed initially. Falls back to the Accordion's
   * `defaultCollapsedIds`, then to collapsed */
  defaultCollapsed?: boolean;
  /** Custom drop down icon */
  dropdownIcon?: ReactNode;
  /** Highlights the `<summary/>` of open `<details/>`*/
  highlightOpen?: boolean;
  /** Styles for a disabled accordion item and makes the item not openable */
  disabled?: boolean;
  /** When true, only the dropdown toggle expands/collapses the item; clicking the summary does nothing */
  toggleOnlyOnIcon?: boolean;
  slotProps?: {
    dropdownToggle?: ComponentProps<"button">;
    summary?: ComponentProps<"summary">;
    summaryContent?: ComponentProps<"div">;
    content?: ComponentProps<"div">;
  };
} & Omit<ComponentProps<"details">, "open">;
