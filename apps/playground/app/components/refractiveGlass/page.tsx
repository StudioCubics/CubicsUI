import { PageLayout, RefractiveGlass } from "@cubicsui/components";
import { cn } from "@cubicsui/utils";
import { Draggable } from "./draggable";

export default function Page() {
  return (
    <PageLayout title={<code>{"<RefractiveGlass/>"}</code>}>
      <h2>Usage</h2>
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <section
            // biome-ignore lint/suspicious/noArrayIndexKey: dqweqwe
            key={i}
            className={cn("grid", i % 2 ? "image_bg" : i % 3 ? "rgb_bg" : "")}
          >
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <RefractiveGlass
                  // biome-ignore lint/suspicious/noArrayIndexKey: dqweqwe
                  key={i}
                  style={{
                    padding: "var(--gap-3)",
                    height: "30ch",
                  }}
                >
                  Grid Item {i + 1}
                </RefractiveGlass>
              );
            })}
          </section>
        );
      })}
      <h2>These are draggable</h2>
      <Draggable />
      <h2>Colors</h2>
      {["primary", "tertiary", "secondary", "error", "warn", "success"].map(
        (c) => {
          return (
            <Draggable key={c} style={{ "--color": `var(--color-${c})` }}>
              {c}
            </Draggable>
          );
        },
      )}
    </PageLayout>
  );
}
