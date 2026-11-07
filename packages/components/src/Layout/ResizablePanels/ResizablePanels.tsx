"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn, mergeRefs } from "@cubicsui/utils";
import {
  Children,
  type ElementType,
  isValidElement,
  type ReactElement,
  type PointerEvent as ReactPointerEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ResizeHandle } from "../../Misc/ResizeHandle/ResizeHandle";
import styles from "./ResizablePanels.module.css";
import type {
  PanelEdge,
  PanelElement,
  PanelRect,
  ResizablePanelsBaseProps,
  ResizablePanelsProps,
  ResizablePanelViewport,
} from "./ResizablePanels.types";
import {
  computeLayout,
  getPanelStyle,
  isBoundaryEdge,
  RESIZABLE_PANELS_EDGES,
  resizePanels,
} from "./ResizablePanels.utils";

function ResizablePanelsBase<C extends ElementType>(
  props: ResizablePanelsProps<C>,
): ReactElement {
  const {
    as,
    ref,
    style,
    className,
    width,
    height,
    children,
    layout = "row",
    columns,
    minPanelSize = 50,
    resizeMode = "linked",
    panelGap = "0px",
    disableEdgeHandles,
    touchTolerance = 1,
    snapDistance = 16,
    color,
    size,
    slotProps = {},
    ...rest
  } = props as ResizablePanelsProps<"div">;
  const panels = Children.toArray(children).filter(
    isValidElement,
  ) as PanelElement[];

  // Validate ids: required and unique
  const ids = panels.map((p) => p.props.id);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (ids.some((id) => !id) || duplicates.length) {
    console.error(
      `ResizablePanels: every panel needs a unique id. Duplicates/missing: ${
        duplicates.join(", ") || "empty id"
      }`,
    );
  }

  const rootRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<ResizablePanelViewport>({
    width: 0,
    height: 0,
  });

  // Track the viewport's pixel size (it may be %, vw, vh, etc.)
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const update = () =>
      setViewport({ width: el.clientWidth, height: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Panel state keyed by id; user resizes are stored as overrides of the layout
  const [overrides, setOverrides] = useState<Record<string, PanelRect>>({});
  // Reset user overrides when the layout or the set of panels changes
  const idsKey = ids.join("|");
  useLayoutEffect(() => {
    setOverrides({});
  }, [layout, columns, idsKey]);

  const layoutRects = computeLayout(layout, ids, viewport, columns);
  // Current rect of every panel (user overrides win over the layout)
  const rects = { ...layoutRects, ...overrides };
  const Component: ElementType = as || "div";

  function startResize(
    id: string,
    edge: PanelEdge,
    startRects: Record<string, PanelRect>,
    vp: ResizablePanelViewport,
    e: ReactPointerEvent<HTMLElement>,
  ) {
    e.preventDefault();
    const handle = e.currentTarget;
    const origin = { x: e.clientX, y: e.clientY };

    handle.setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - origin.x;
      const dy = ev.clientY - origin.y;

      // Computed from the rects at drag start; in "linked" mode touching panels are included
      const changed = resizePanels(
        startRects,
        id,
        edge,
        dx,
        dy,
        vp,
        minPanelSize,
        resizeMode === "linked",
        touchTolerance,
        snapDistance,
      );

      setOverrides((prev) => ({ ...prev, ...changed }));
    };

    const onUp = (ev: PointerEvent) => {
      handle.releasePointerCapture(ev.pointerId);
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
    };

    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
  }

  return (
    <Component
      {...rest}
      ref={mergeRefs(ref, rootRef)}
      className={cn(className, styles.root)}
      style={{ ...style, width, height }}
    >
      {panels.map((panel) => {
        const id = panel.props.id;
        const rect = rects[id];
        if (!rect) return null;
        return (
          <div
            {...slotProps.panel}
            key={id}
            className={cn(slotProps.panel?.className, styles.panel)}
            style={{
              ...slotProps.panel?.style,
              ...getPanelStyle(rect, viewport, panelGap, touchTolerance),
            }}
          >
            
              {panel}
            {RESIZABLE_PANELS_EDGES.filter(
              (edge) =>
                !disableEdgeHandles ||
                !isBoundaryEdge(rect, edge, viewport, touchTolerance),
            ).map((edge) => (
              <ResizeHandle
                role="separator"
                aria-orientation={
                  ["bottom", "top"].includes(edge) ? "horizontal" : "vertical"
                }
                key={edge}
                size={size}
                color={color}
                className={`${styles.handle} ${styles[`edge_${edge}`]}`}
                onPointerDown={(e) => startResize(id, edge, rects, viewport, e)}
              />
            ))}
          </div>
        );
      })}
    </Component>
  );
}
ResizablePanelsBase.displayName = "ResizablePanels";

export const ResizablePanels = ResizablePanelsBase as PolymorphicComponentType<
  ResizablePanelsBaseProps,
  "div"
>;
