"use client";

import { Card, CardContent } from "@cubicsui/components";
import { GlassCard } from "@cubicsui/components";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<GlassCard/>"}</code>
      </h1>
      <p>A card component that is glassmorphic</p>

      <h2>Usage</h2>
      <section>
        <GlassCard>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
          dignissimos laboriosam reiciendis reprehenderit iusto sunt eligendi
          impedit iure voluptatibus, incidunt rem nemo molestias alias explicabo
          sequi at saepe similique officia!
        </GlassCard>
      </section>

      <h2>Polymorphic (as)</h2>
      <section>
        <div className={"column"}>
          <h3>
            As <code>{"<span/>"}</code>
          </h3>
          <GlassCard id="span" as="span">
            Rendered as a <code>{"<span/>"}</code>
          </GlassCard>
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            As <code>{"<button/>"}</code> and <code>{"<a/>"}</code>
          </h3>
          <p>
            Checks that native interactive elements still get the glass effect
          </p>
          <GlassCard id="button" as="button" onClick={() => alert("clicked")}>
            Rendered as a clickable <code>{"<button/>"}</code>
          </GlassCard>
          <GlassCard id="link" as="a" href="#">
            Rendered as an <code>{"<a/>"}</code>
          </GlassCard>
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            As <code>{"<Card/>"}</code>
          </h3>
          <GlassCard id="0" as={Card} fixedWidth={"350px"} color={"error"}>
            <CardContent>
              With <code>{"<Card/>"}</code> in as, color=&quot;error&quot;
            </CardContent>
          </GlassCard>
          <GlassCard
            as={Card}
            id="1"
            size={"xl"}
            fixedWidth={"350px"}
            color={"tertiary"}
          >
            <CardContent>
              With <code>{"<Card/>"}</code> in as, size=&quot;xl&quot;,
              color=&quot;tertiary&quot;
            </CardContent>
          </GlassCard>
          <GlassCard
            as={Card}
            id="2"
            size={"sm"}
            fixedWidth={"350px"}
            color={"secondary"}
          >
            <CardContent>
              With <code>{"<Card/>"}</code> in as, size=&quot;sm&quot;,
              color=&quot;secondary&quot;
            </CardContent>
          </GlassCard>
        </div>
      </section>

      <h2>Colors</h2>
      <section>
        <GlassCard
          id="color-primary"
          as={Card}
          fixedWidth={"200px"}
          color={"primary"}
        >
          <CardContent>primary</CardContent>
        </GlassCard>
        <GlassCard
          id="color-secondary"
          as={Card}
          fixedWidth={"200px"}
          color={"secondary"}
        >
          <CardContent>secondary</CardContent>
        </GlassCard>
        <GlassCard
          id="color-tertiary"
          as={Card}
          fixedWidth={"200px"}
          color={"tertiary"}
        >
          <CardContent>tertiary</CardContent>
        </GlassCard>
        <GlassCard
          id="color-error"
          as={Card}
          fixedWidth={"200px"}
          color={"error"}
        >
          <CardContent>error</CardContent>
        </GlassCard>
      </section>

      <h2>Custom tint</h2>
      <section>
        <p>
          Use the <code>--color</code> CSS variable to set a tint outside the
          theme palette
        </p>
        <GlassCard
          id="custom-tint"
          as={Card}
          fixedWidth={"350px"}
          style={{ "--color": "#ff6ec7" } as React.CSSProperties}
        >
          <CardContent>Custom tint via CSS variable override</CardContent>
        </GlassCard>
      </section>

      <h2>Custom border radius</h2>
      <section>
        <p>
          Use the <code>--br</code> CSS variable to override the default radius
        </p>
        <GlassCard
          id="radius"
          as={Card}
          fixedWidth={"350px"}
          color={"primary"}
          style={{ "--br": "4px" } as React.CSSProperties}
        >
          <CardContent>
            Square-ish corners via <code>--br</code>
          </CardContent>
        </GlassCard>
      </section>

      <h2>Nested GlassCards</h2>
      <section>
        <GlassCard id="outer" as={Card} fixedWidth={"400px"} color={"primary"}>
          <CardContent>
            Outer card
            <GlassCard
              id="inner"
              as={Card}
              elevation="highest"
              color={"tertiary"}
            >
              Inner card, layered glass
            </GlassCard>
          </CardContent>
        </GlassCard>
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={"column"}>
          <GlassCard id="on-card">On top of a card</GlassCard>
        </Card>
        <h3>On RGB</h3>
        <div className={"column rgb_bg"}>
          <GlassCard id="on-rgb">On top of rgb colors</GlassCard>
        </div>
        <h3>On Image</h3>
        <div className={"column image_bg"}>
          <GlassCard id="on-image">On top of image</GlassCard>
        </div>
      </section>

      <h2>Grid layout / many cards at once</h2>
      <section>
        <div className="grid">
          <GlassCard as={Card} removeBg color={"tertiary"}>
            <CardContent>Card 1</CardContent>
          </GlassCard>
          <GlassCard as={Card} removeBg color={"primary"}>
            <CardContent>Card 2</CardContent>
          </GlassCard>
          <GlassCard as={Card} removeBg color={"tertiary"}>
            <CardContent>Card 3</CardContent>
          </GlassCard>
          <GlassCard as={Card} removeBg color={"primary"}>
            <CardContent>Card 4</CardContent>
          </GlassCard>
          <GlassCard as={Card} removeBg color={"tertiary"}>
            <CardContent>Card 5</CardContent>
          </GlassCard>
          <GlassCard as={Card} removeBg color={"primary"}>
            <CardContent>Card 6</CardContent>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
