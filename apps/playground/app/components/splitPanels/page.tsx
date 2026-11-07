import {
  Card,
  PageLayout,
  SplitPanels,
  type SplitPanelsProps,
} from "@cubicsui/components";
import type { CSSProperties } from "react";

type Props = Omit<SplitPanelsProps, "children" | "className">;

interface Demo {
  title: string;
  description?: string;
  props?: Props;
  // Wraps the demo in a container that can be resized by dragging its bottom right corner
  resizableContainer?: boolean;
}

const DEMOS: Demo[] = [
  {
    title: "Default",
    description: "Row layout, 50/50 split, drag the handle to resize.",
  },
  {
    title: "size xs",
    description: "Handle thickness from the gap scale, smallest.",
    props: { size: "xs" },
  },
  {
    title: "size sm",
    description: "Handle thickness from the gap scale.",
    props: { size: "sm" },
  },
  {
    title: "size md (default)",
    description: "Default handle thickness.",
    props: { size: "md" },
  },
  {
    title: "size lg",
    description: "Handle thickness from the gap scale.",
    props: { size: "lg" },
  },
  {
    title: "size xl",
    description: "Handle thickness from the gap scale, largest.",
    props: { size: "xl" },
  },
  {
    title: "color primary",
    props: { color: "primary" },
  },
  {
    title: "color secondary",
    props: { color: "secondary" },
  },
  {
    title: "color tertiary",
    props: { color: "tertiary" },
  },
  {
    title: "color error",
    props: { color: "error" },
  },
  {
    title: "size xl, stacked",
    description:
      "The handle is out of the flow, so size doesn't affect the stacking threshold. Drag the bottom right corner below 400 + 400 to stack and see the horizontal handle.",
    props: {
      size: "xl",
      minFirstSize: { row: 200, stacked: 100 },
      minSecondSize: { row: 200, stacked: 100 },
    },
    resizableContainer: true,
  },
  {
    title: "disableResizeHandle, size has no effect",
    description:
      "No handle is rendered, so size is ignored and the panels sit flush against each other.",
    props: { disableResizeHandle: true, size: "xl", firstRatio: 0.3 },
  },
  {
    title: "firstRatio",
    description:
      "Initial share of the first panel (0..1). Only the initial value, dragging takes over afterwards. Here 0.25.",
    props: { firstRatio: 0.25 },
  },
  {
    title: "minFirstSize / minSecondSize",
    description:
      "Each panel has its own min size in px. Drag to both ends: the first stops at 150px, the second at 300px.",
    props: { minFirstSize: 150, minSecondSize: 300 },
  },
  {
    title: "Auto stacking",
    description:
      "Drag the bottom right corner of the dashed container to make it narrower. Below minFirstSize + minSecondSize + handleSize (200 + 200 + 8) the panels stack and the handle resizes heights.",
    props: { minFirstSize: 200, minSecondSize: 200 },
    resizableContainer: true,
  },
  {
    title: "disableResizeHandle",
    description:
      "No handle is rendered and its track collapses to 0, the panels keep the firstRatio split (here 0.3).",
    props: {
      disableResizeHandle: true,
      firstRatio: 0.3,
      minFirstSize: 300,
      minSecondSize: 100,
    },
  },
  {
    title: "minFirstSize / minSecondSize (row and stacked)",
    description:
      "Pass { row, stacked } to set separate min sizes. Row applies to width, stacked applies to height. Drag the bottom right corner of the dashed container: below 400 + 400 + 8 the panels stack and each keeps a 100px min height instead of 400px. A plain number applies to row only and stacked defaults to 0.",
    props: {
      minFirstSize: { row: 400, stacked: 100 },
      minSecondSize: { row: 400, stacked: 100 },
    },
    resizableContainer: true,
  },
];

// Grid with a single cell makes SplitPanels stretch to the container size,
// stacked resizing needs a definite height so the container always has one
const FRAME: CSSProperties = { display: "grid", width: "100%", height: 300 };

const RESIZABLE_FRAME: CSSProperties = {
  ...FRAME,
  minWidth: 150,
  maxWidth: "100%",
  overflow: "hidden",
  resize: "horizontal",
  outline: "var(--focus-ring)",
};

const PANEL_TEXT =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptates libero quibusdam distinctio quia ab sequi, rem ad debitis.";

export default function Page() {
  return (
    <PageLayout title={"<SplitPanels/>"}>
      <h2>Usage</h2>
      {DEMOS.map(({ title, description, props, resizableContainer }) => (
        <section key={title}>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
          <SplitPanels
            style={resizableContainer ? RESIZABLE_FRAME : FRAME}
            {...props}
          >
            <Card
              variant="outlined"
              removeBg
              style={{
                overflow: "auto",
              }}
            >
              first
              <br />
              {PANEL_TEXT}
            </Card>
            <Card
              variant="outlined"
              removeBg
              style={{
                overflow: "auto",
              }}
            >
              second
              <br />
              {PANEL_TEXT}
            </Card>
          </SplitPanels>
        </section>
      ))}
    </PageLayout>
  );
}
