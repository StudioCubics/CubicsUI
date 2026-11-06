import type { CssLength, PolymorphicComponentProps } from "@cubicsui/types";
import type { ComponentProps, ElementType, ReactElement } from "react";
import type { ResizeHandleProps } from "../../Misc/ResizeHandle/ResizeHandle.types";

export type PanelElement = ReactElement<{ id: string }>;
export type PanelResizeMode = "independent" | "linked";
export type PanelLayout = "row" | "column" | "grid";

export interface ResizablePanelsBaseProps extends Pick<
  ResizeHandleProps,
  "color" | "size"
> {
  /** Any valid CSS width value, e.g. "100%", "800px", "80vw" */
  width: CssLength;
  /** Any valid CSS height value, e.g. "100%", "600px", "70vh" */
  height: CssLength;
  /** Each child must have a unique `id` prop */
  children: PanelElement | PanelElement[];
  /** Initial arrangement of the panels. Defaults to "row" */
  layout?: PanelLayout;
  /** Gap between panels, any CSS size value, e.g. "8px", "1rem", "2%". Defaults to "0px" */
  panelGap?: CssLength;
  /** Column count, only used by "grid". Defaults to ceil(sqrt(panel count)) */
  columns?: number;
  /** The minimum size of a panel in px */
  minPanelSize?: number;
  /** The resize behaviour is controlled by this
   * "independent": resizing a panel does not affect the others.
   * "linked": panels touching the dragged edge are resized with it.
   * @default "linked" */
  resizeMode?: PanelResizeMode;
  /** Removes handles on the outer edges of the root.
   * @default false */
  disableEdgeHandles?: boolean;
  /** Max distance in px between two edges for them to count as touching
   * @default 1 */
  touchTolerance?: number;
  /** Distance in px within which a dragged edge snaps to the nearest panel edge or root boundary. 0 disables snapping
   * @default 0 */
  snapDistance?: number;
  slotProps?: {
    panel?: ComponentProps<"div">;
    content?: ComponentProps<"div">;
    handle?: ResizeHandleProps;
  };
}
export type ResizablePanelsProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, ResizablePanelsBaseProps>;

export type PanelEdge = "top" | "right" | "bottom" | "left";
export type PanelRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type ResizablePanelViewport = { width: number; height: number };
