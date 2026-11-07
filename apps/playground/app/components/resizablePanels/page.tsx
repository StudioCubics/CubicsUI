import {
  Card,
  CardContent,
  CardHeader,
  type CardProps,
  PageLayout,
  ResizablePanels,
  type ResizablePanelsProps,
} from "@cubicsui/components";

// Shared panel definitions, ids only need to be unique per <ResizablePanels/>
const PANELS = [
  {
    id: "panel-1",
    color: "primary",
  },
  {
    id: "panel-2",
    color: "secondary",
  },
  {
    id: "panel-3",
    color: "tertiary",
  },
  {
    id: "panel-4",
    color: "error",
  },
];

const BASE: Omit<ResizablePanelsProps, "children"> = {
  width: "100%",
  height: "400px",
};

// Every prop variation: layout, columns (grid only), resizeMode, minPanelSize, panelGap
const VARIANTS: {
  title: string;
  props: Omit<ResizablePanelsProps, "children">;
}[] = [
  { title: "row (default, linked)", props: BASE },
  {
    title: "row, independent",
    props: { ...BASE, layout: "row", resizeMode: "independent" },
  },
  { title: "column, linked", props: { ...BASE, layout: "column" } },
  {
    title: "column, independent",
    props: { ...BASE, layout: "column", resizeMode: "independent" },
  },

  {
    title: "size xs",
    props: { ...BASE, size: "xs" },
  },
  {
    title: "size sm",
    props: { ...BASE, size: "sm" },
  },
  {
    title: "size md (default)",
    props: { ...BASE, size: "md" },
  },
  {
    title: "size lg",
    props: { ...BASE, size: "lg" },
  },
  {
    title: "size xl",
    props: { ...BASE, size: "xl" },
  },
  {
    title: "color primary",
    props: { ...BASE, color: "primary" },
  },
  {
    title: "color secondary",
    props: { ...BASE, color: "secondary" },
  },
  {
    title: "color tertiary",
    props: { ...BASE, color: "tertiary" },
  },
  {
    title: "color error",
    props: { ...BASE, color: "error" },
  },
  { title: "grid (auto columns), linked", props: { ...BASE, layout: "grid" } },
  {
    title: "grid, columns=2, independent",
    props: { ...BASE, layout: "grid", columns: 2, resizeMode: "independent" },
  },
  {
    title: "grid, columns=3, minPanelSize=100",
    props: {
      ...BASE,
      layout: "grid",
      columns: 3,
      minPanelSize: 100,
      snapDistance: 10,
    },
  },
  {
    title: "row, panelGap=16px",
    props: { ...BASE, layout: "row", panelGap: "16px" },
  },
  {
    title: "grid, columns=2, linked, panelGap=1rem",
    props: { ...BASE, layout: "grid", columns: 2, panelGap: "1rem" },
  },
  {
    title: "column, independent, panelGap=2%",
    props: {
      ...BASE,
      layout: "column",
      resizeMode: "independent",
      panelGap: "2%",
    },
  },
  {
    title: "fixed size (800px x 300px)",
    props: { width: "800px", height: "300px", layout: "row" },
  },
  {
    title: "row, disableEdgeHandles",
    props: { ...BASE, layout: "row", disableEdgeHandles: true },
  },
  {
    title: "grid, columns=2, disableEdgeHandles, panelGap=1rem",
    props: {
      ...BASE,
      layout: "grid",
      columns: 2,
      disableEdgeHandles: true,
      panelGap: "1rem",
    },
  },
  {
    title: "row, independent, snapDistance=0 No snapping",
    props: {
      ...BASE,
      layout: "row",
      snapDistance: 0,
      resizeMode: "independent",
    },
  },
  {
    title: "grid, columns=2, independent, snapDistance=32",
    props: {
      ...BASE,
      layout: "grid",
      columns: 2,
      resizeMode: "independent",
      snapDistance: 32,
    },
  },
];

export default function Page() {
  return (
    <PageLayout title={"<ResizablePanels/>"}>
      <h2>Usage</h2>
      {VARIANTS.map(({ title, props }) => (
        <section key={title}>
          <h3>{title}</h3>
          <ResizablePanels {...props}>
            {PANELS.map(({ id, color }) => (
              <Card
                color={color as CardProps["color"]}
                variant="outlined"
                key={id}
                id={id}
                style={{ height: "100%" }}
              >
                <CardHeader title={id} />
                <CardContent>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum voluptates libero quibusdam distinctio quia ab sequi,
                  rem ad debitis. Quos quod mollitia impedit expedita,
                  perferendis obcaecati vitae dolores a placeat!
                </CardContent>
              </Card>
            ))}
          </ResizablePanels>
        </section>
      ))}
    </PageLayout>
  );
}
