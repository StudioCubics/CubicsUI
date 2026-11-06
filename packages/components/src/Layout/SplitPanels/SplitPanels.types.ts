import type { CssLength, PolymorphicComponentProps } from "@cubicsui/types";
import type { CSSProperties, ElementType, ReactElement } from "react";
import type { ResizeHandleProps } from "../../Misc/ResizeHandle/ResizeHandle.types";

/** Min size of a panel in px. A number applies to row only (stacked is 0) */
export type SplitPanelMinSize =
  | number
  | {
      /** Min width when side by side
       * @default 0 */
      row?: number;
      /** Min height when stacked
       * @default 0 */
      stacked?: number;
    };

export interface SplitPanelsBaseProps extends Pick<
  ResizeHandleProps,
  "color" | "size"
> {
  /** Optional min size of the first panel. Row applies to width, stacked applies to height */
  minFirstSize?: SplitPanelMinSize;
  /** Optional min size of the second panel. Row applies to width, stacked applies to height */
  minSecondSize?: SplitPanelMinSize;
  /** Exactly two elements that accept a className */
  children: [ReactElement, ReactElement];
  /** Removes the resize handle */
  disableResizeHandle?: boolean;
  /** Value between 0..1 that will be used for the first panel
   * @default 0.5 */
  firstRatio?: number;
  /** Gap between panels, any CSS size value, e.g. "8px", "1rem", "2%". Defaults to "0px" */
  panelGap?: CssLength;
  /** Height of the container  */
  height?: CSSProperties["height"];

  className?: string;
  slotProps?: {
    handle?: ResizeHandleProps;
  };
}
export type SplitPanelsProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, SplitPanelsBaseProps>;
