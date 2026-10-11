import type { Position, SafePositionOptions } from "@cubicsui/utils";
import type { ReactNode, ReactElement, Ref } from "react";

export interface TooltipProps extends SafePositionOptions {
  /** The content of the tooltip */
  title?: ReactNode;
  /** Renders an arrow towards the anchor element from the tooltip */
  renderArrow?: boolean;
  children: ReactElement<{ ref?: Ref<HTMLElement | null> }>;
}

export type UseTooltipReturnType = {
  showTooltip: boolean;
  position: Position;
  anchorRef: Ref<HTMLElement | null>;
  tooltipRef: Ref<HTMLDivElement | null>;
  updatePosition: () => void;
};

export type GetArrowDirectionReturnType =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | null;
