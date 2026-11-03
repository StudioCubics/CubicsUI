import { PageLayout, ResizablePanels } from "@cubicsui/components";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof ResizablePanels>, "children">;

// Shared panel definitions, ids only need to be unique per <ResizablePanels/>
const PANELS = [
  {
    id: "panel-1",
    background: "var(--color-primary)",
    color: "var(--color-on-primary)",
  },
  {
    id: "panel-2",
    background: "var(--color-secondary)",
    color: "var(--color-on-secondary)",
  },
  {
    id: "panel-3",
    background: "var(--color-tertiary)",
    color: "var(--color-on-tertiary)",
  },
  {
    id: "panel-4",
    background: "var(--color-error)",
    color: "var(--color-on-error)",
  },
];

const BASE = { width: "100%", height: "400px" };

// Every prop variation: layout, columns (grid only), resizeMode, minPanelSize, panelGap
const VARIANTS: { title: string; props: Props }[] = [
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
  { title: "grid (auto columns), linked", props: { ...BASE, layout: "grid" } },
  {
    title: "grid, columns=2, independent",
    props: { ...BASE, layout: "grid", columns: 2, resizeMode: "independent" },
  },
  {
    title: "grid, columns=3, minPanelSize=100",
    props: { ...BASE, layout: "grid", columns: 3, minPanelSize: 100 },
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
];

export default function Page() {
  return (
    <PageLayout title={"<ResizablePanels/>"}>
      <h2>Usage</h2>
      {VARIANTS.map(({ title, props }) => (
        <section key={title}>
          <h3>{title}</h3>
          <ResizablePanels {...props}>
            {PANELS.map(({ id, background, color }) => (
              <div
                key={id}
                id={id}
                style={{ height: "100%", color, background }}
              >
                {id}
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                voluptates libero quibusdam distinctio quia ab sequi, rem ad
                debitis. Quos quod mollitia impedit expedita, perferendis
                obcaecati vitae dolores a placeat!
              </div>
            ))}
          </ResizablePanels>
        </section>
      ))}
    </PageLayout>
  );
}
