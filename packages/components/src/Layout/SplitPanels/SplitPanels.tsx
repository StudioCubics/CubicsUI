"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { clamp, cn, mergeEvents, mergeRefs } from "@cubicsui/utils";
import {
  type CSSProperties,
  type ElementType,
  type PointerEvent,
  type ReactElement,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ResizeHandle } from "../../Misc/ResizeHandle/ResizeHandle";
import styles from "./SplitPanels.module.css";
import type {
  SplitPanelMinSize,
  SplitPanelsBaseProps,
  SplitPanelsProps,
} from "./SplitPanels.types";

// A number only applies to row, stacked defaults to 0
function resolveMinSize(size: SplitPanelMinSize | undefined) {
  if (typeof size === "object") {
    return { row: size.row ?? 0, stacked: size.stacked ?? 0 };
  }
  return { row: size ?? 0, stacked: 0 };
}

function SplitPanelsBase<C extends ElementType = "div">(
  props: SplitPanelsProps<C>,
): ReactElement {
  const {
    as,
    ref,
    children,
    className,
    style,
    minFirstSize,
    minSecondSize,
    size,
    color,
    disableResizeHandle,
    firstRatio = 0.5,
    height,
    slotProps = {},
    ...rest
  } = props as SplitPanelsProps<"div">;
  const [first, second] = children;
  const rootRef = useRef<HTMLDivElement>(null);
  const [stacked, setStacked] = useState(false);
  const [ratio, setRatio] = useState(firstRatio); // first panel's share of the space
  const [handlePos, setHandlePos] = useState(0); // boundary between the panels in px
  const minFirst = resolveMinSize(minFirstSize);
  const minSecond = resolveMinSize(minSecondSize);
  const minFirstRow = minFirst.row;
  const minSecondRow = minSecond.row;
  // Min sizes of the current layout (width in row, height when stacked)
  const activeMinFirst = stacked ? minFirst.stacked : minFirst.row;
  const activeMinSecond = stacked ? minSecond.stacked : minSecond.row;

  const Component: ElementType = as || "div";
  // Stack when the root can't fit both panels
  useLayoutEffect(() => {
    const root = rootRef.current!;
    const firstPanel = root.firstElementChild as HTMLElement;
    const measure = () => {
      const isStacked =
        minFirstRow + minSecondRow > 0 &&
        root.clientWidth < minFirstRow + minSecondRow;
      setStacked(isStacked);
      // The handle is out of the flow, so it follows the first panel's end edge
      setHandlePos(
        isStacked
          ? firstPanel.offsetTop + firstPanel.offsetHeight
          : firstPanel.offsetLeft + firstPanel.offsetWidth,
      );
    };
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    ro.observe(firstPanel);
    return () => ro.disconnect();
  }, [minFirstRow, minSecondRow]);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (disableResizeHandle) return;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId) || disableResizeHandle)
      return;
    const rect = rootRef.current!.getBoundingClientRect();
    const total = stacked ? rect.height : rect.width;
    if (total <= 0) return;
    const pos = stacked ? e.clientY - rect.top : e.clientX - rect.left;
    // Keep each panel at least its own min size
    const lower = activeMinFirst / total;
    const upper = 1 - activeMinSecond / total;
    setRatio(lower > upper ? lower : clamp(lower, pos / total, upper));
  }

  return (
    <Component
      {...rest}
      ref={mergeRefs(rootRef, ref)}
      className={cn(
        className,
        styles.root,
        stacked ? styles.stacked : styles.row,
      )}
      style={
        {
          ...style,
          height,
          "--min-first-size": `${activeMinFirst}px`,
          "--min-second-size": `${activeMinSecond}px`,
          "--handle-pos": `${handlePos}px`,
          // Large multiplier so fr values sum above 1 and always fill the track
          "--first-size": `${ratio * 1000}fr`,
          "--second-size": `${(1 - ratio) * 1000}fr`,
        } as CSSProperties
      }
    >
      {/* Merge the injected panel class with any className the child already has */}
      {first}
      {!disableResizeHandle && (
        <ResizeHandle
          size={size}
          color={color}
          {...slotProps.handle}
          role="separator"
          aria-orientation={stacked ? "horizontal" : "vertical"}
          className={cn(slotProps.handle?.className, styles.handle)}
          onPointerDown={mergeEvents(
            slotProps.handle?.onPointerDown,
            onPointerDown,
          )}
          onPointerMove={mergeEvents(
            slotProps.handle?.onPointerMove,
            onPointerMove,
          )}
        />
      )}
      {second}
    </Component>
  );
}
SplitPanelsBase.displayName = "SplitPanels";

/**
 * A polymorphic split panels layout component.
 * By default it renders a `<div>`, but any element can be used via the `as` prop.
 *
 * ```tsx
 * <SplitPanels as="main">...</SplitPanels>
 * ```
 */
export const SplitPanels = SplitPanelsBase as PolymorphicComponentType<
  SplitPanelsBaseProps,
  "div"
>;
