import { PageLayout, RefractiveGlass } from "@cubicsui/components";

export default function Page() {
  return (
    <PageLayout title={<code>{"<RefractiveGlass/>"}</code>}>
      <h2>Usage</h2>
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: dqweqwe
            key={i}
            className={i % 2 ? "image_bg" : i % 3 ? "rgb_bg" : ""}
          >
            <section className={"grid"}>
              {Array.from({ length: 3 }).map((_, i) => {
                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: dqweqwe
                    key={i}
                  >
                    <RefractiveGlass style={{ padding: "var(--gap-3)" }}>
                      Grid Item {i + 1}
                    </RefractiveGlass>
                  </div>
                );
              })}
            </section>
          </div>
        );
      })}
    </PageLayout>
  );
}
