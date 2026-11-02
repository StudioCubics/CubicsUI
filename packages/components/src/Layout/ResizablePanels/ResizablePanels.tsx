"use client";

import {
  Children,
  isValidElement,
  type ReactElement,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./ResizablePanels.module.css";
import type {
  PanelEdge,
  PanelElement,
  PanelRect,
  ResizablePanelsProps,
  ResizablePanelViewport,
} from "./ResizablePanels.types";
import {
  computeLayout,
  getPanelStyle,
  RESIZABLE_PANEL_EDGES,
  resizePanels,
} from "./ResizablePanels.utils";

export function ResizablePanels({
  width,
  height,
  children,
  layout = "row",
  columns,
  minPanelSize = 50,
  resizeMode = "linked",
  panelGap = "0px",
}: ResizablePanelsProps): ReactElement {
  const panels = Children.toArray(children).filter(
    isValidElement,
  ) as PanelElement[];

  // Validate ids: required and unique
  const ids = panels.map((p) => p.props.id);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (ids.some((id) => !id) || duplicates.length) {
    throw new Error(
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

  const layoutRects = useMemo(
    () => computeLayout(layout, ids, viewport, columns),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [layout, columns, idsKey, viewport],
  );

  // Current rect of every panel (user overrides win over the layout)
  const rects = useMemo(
    () => ({ ...layoutRects, ...overrides }),
    [layoutRects, overrides],
  );

  const startResize = useCallback(
    (
      id: string,
      edge: PanelEdge,
      startRects: Record<string, PanelRect>,
      vp: ResizablePanelViewport,
      e: ReactPointerEvent<HTMLDivElement>,
    ) => {
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
    },
    [minPanelSize, resizeMode],
  );

  const rootStyle = useMemo(() => ({ width, height }), [width, height]);

  return (
    <div ref={rootRef} className={styles.root} style={rootStyle}>
      {panels.map((panel) => {
        const id = panel.props.id;
        const rect = rects[id];
        if (!rect) return null;
        return (
          <div
            key={id}
            className={styles.panel}
            style={getPanelStyle(rect, viewport, panelGap)}
          >
            <div className={styles.content}>{panel}</div>
            {RESIZABLE_PANEL_EDGES.map((edge) => (
              <div
                key={edge}
                className={`${styles.handle} ${styles[`edge_${edge}`]}`}
                onPointerDown={(e) => startResize(id, edge, rects, viewport, e)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
