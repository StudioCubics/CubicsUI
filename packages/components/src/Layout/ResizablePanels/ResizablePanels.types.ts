import type { ReactElement } from "react";

export type PanelElement = ReactElement<{ id: string }>;
export type PanelResizeMode = "independent" | "linked";
export type PanelLayout = "row" | "column" | "grid";

export interface ResizablePanelsProps {
  /** Any valid CSS width value, e.g. "100%", "800px", "80vw" */
  width: string;
  /** Any valid CSS height value, e.g. "100%", "600px", "70vh" */
  height: string;
  /** Each child must have a unique `id` prop */
  children: PanelElement | PanelElement[];
  /** Initial arrangement of the panels. Defaults to "row" */
  layout?: PanelLayout;
  /** Gap between panels, any CSS size value, e.g. "8px", "1rem", "2%". Defaults to "0px" */
  panelGap?: string;
  /** Column count, only used by "grid". Defaults to ceil(sqrt(panel count)) */
  columns?: number;
  /**
   * "independent": resizing a panel does not affect the others.
   * "linked": panels touching the dragged edge are resized with it.
   * @default "linked"
   */
  resizeMode?: PanelResizeMode;
  minPanelSize?: number;
}
export type PanelEdge = "top" | "right" | "bottom" | "left";
export type PanelRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type ResizablePanelViewport = { width: number; height: number };
