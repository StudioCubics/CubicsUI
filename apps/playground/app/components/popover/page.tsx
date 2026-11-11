import { Button, Card, PageLayout, Popover } from "@cubicsui/components";

export default function Page() {
  return (
    <PageLayout title={<code>{"<Popover/>"}</code>}>
      <h2>Basic Usage</h2>
      <section>
        <div className={"column"}>
          <Button popoverTarget="basic-popover">Open popover</Button>
          <Popover id="basic-popover">
            <Card>This is a popover</Card>
          </Popover>
        </div>
      </section>

      <h2>
        <code>positionArea</code>
      </h2>
      <section>
        <div className={"column"}>
          <Button popoverTarget="pos-bottom">
            Bottom center {"("}default{")"}
          </Button>
          <Popover id="pos-bottom" positionArea="bottom center">
            <Card>Positioned bottom center</Card>
          </Popover>
        </div>
        <div className={"column"}>
          <Button popoverTarget="pos-top">Top center</Button>
          <Popover id="pos-top" positionArea="top center">
            <Card>Positioned top center</Card>
          </Popover>
        </div>
        <div className={"column"}>
          <Button popoverTarget="pos-left">Center left</Button>
          <Popover id="pos-left" positionArea="center left">
            <Card>Positioned center left</Card>
          </Popover>
        </div>
        <div className={"column"}>
          <Button popoverTarget="pos-right">Center right</Button>
          <Popover id="pos-right" positionArea="center right">
            <Card>Positioned center right</Card>
          </Popover>
        </div>
        <div className={"column"}>
          <Button popoverTarget="pos-top-left">Top left</Button>
          <Popover id="pos-top-left" positionArea="top left">
            <Card>Positioned top left</Card>
          </Popover>
        </div>
        <div className={"column"}>
          <Button popoverTarget="pos-top-right">Top right</Button>
          <Popover id="pos-top-right" positionArea="top right">
            <Card>Positioned top right</Card>
          </Popover>
        </div>
        <div className={"column"}>
          <Button popoverTarget="pos-bottom-left">Bottom left</Button>
          <Popover id="pos-bottom-left" positionArea="bottom left">
            <Card>Positioned bottom left</Card>
          </Popover>
        </div>
        <div className={"column"}>
          <Button popoverTarget="pos-bottom-right">Bottom right</Button>
          <Popover id="pos-bottom-right" positionArea="bottom right">
            <Card>Positioned bottom right</Card>
          </Popover>
        </div>
      </section>

      <h2>
        <code>transformOrigin</code>
      </h2>
      <section>
        <p>
          Controls where the default expand animation grows from, independent of{" "}
          <code>positionArea</code>
        </p>
        <Button popoverTarget="origin-top">
          Expands from top {"("}default{")"}
        </Button>
        <Popover id="origin-top" transformOrigin="top center">
          <Card>Expands from top</Card>
        </Popover>
        <Button popoverTarget="origin-bottom-left">
          Expands from bottom left
        </Button>
        <Popover id="origin-bottom-left" transformOrigin="bottom left">
          <Card>Expands from bottom left</Card>
        </Popover>
      </section>

      <h2>Custom Animation</h2>
      <section>
        <p>
          Override the animation custom properties per-instance to change
          timing, easing, or scale without touching the default animation
        </p>
        <div className={"column"}>
          <Button popoverTarget="anim-slow">Slow expand</Button>
          <Popover
            id="anim-slow"
            style={
              {
                "--popover-duration": "500ms",
                "--popover-easing": "ease-in-out",
              } as React.CSSProperties
            }
          >
            <Card>Slow, ease-in-out expand</Card>
          </Popover>
        </div>
        <div className={"column"}>
          <Button popoverTarget="anim-slide">Slide instead of scale</Button>
          <Popover
            id="anim-slide"
            style={
              {
                "--popover-scale-from": "1",
                "--popover-translate-from": "-8px",
              } as React.CSSProperties
            }
          >
            <Card>Slides in instead of scaling</Card>
          </Popover>
        </div>
      </section>

      <h2>
        <code>popover</code> mode
      </h2>
      <section>
        <div className={"column"}>
          <Button popoverTarget="popover-auto">
            Auto (default, light dismiss)
          </Button>
          <Popover id="popover-auto" popover="auto">
            <Card>Closes on outside click or Escape</Card>
          </Popover>
        </div>
        <div className={"column"}>
          <Button popoverTarget="popover-manual">Manual</Button>
          <Popover id="popover-manual" popover="manual">
            <Card>Only closes when explicitly toggled</Card>
          </Popover>
        </div>
      </section>

      <h2>
        As different element (<code>as</code>)
      </h2>
      <section>
        <div className={"column"}>
          <Button popoverTarget="as-article">Open</Button>
          <Popover as="article" id="as-article">
            <Card>
              Rendered as an <code>{"<article>"}</code>
            </Card>
          </Popover>
        </div>
      </section>
    </PageLayout>
  );
}
