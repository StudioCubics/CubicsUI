import { Button, Card, PageLayout, Tooltip } from "@cubicsui/components";

export default function Page() {
  return (
    <PageLayout title={<code>{"<Tooltip/>"}</code>}>
      <h2>Basic Usage</h2>
      <section>
        <Tooltip title="This is a tooltip">
          <Button variant="outlined">Hover me</Button>
        </Tooltip>
      </section>

      <h2>
        <code>title</code> as ReactNode
      </h2>
      <section>
        <Tooltip
          title={
            <>
              This is the message in <code>title</code> as{" "}
              <code>ReactNode</code>
            </>
          }
        >
          <Button variant="outlined">Rich content</Button>
        </Tooltip>
      </section>

      <h2>
        <code>positionArea</code>
      </h2>
      <section>
        <Tooltip title="Bottom center (default)" positionArea="bottom center">
          <Button variant="outlined">Bottom center</Button>
        </Tooltip>
        <Tooltip title="Top center" positionArea="top center">
          <Button variant="outlined">Top center</Button>
        </Tooltip>
        <Tooltip title="Center left" positionArea="center left">
          <Button variant="outlined">Center left</Button>
        </Tooltip>
        <Tooltip title="Center right" positionArea="center right">
          <Button variant="outlined">Center right</Button>
        </Tooltip>
        <Tooltip title="Top left" positionArea="top left">
          <Button variant="outlined">Top left</Button>
        </Tooltip>
        <Tooltip title="Top right" positionArea="top right">
          <Button variant="outlined">Top right</Button>
        </Tooltip>
        <Tooltip title="Bottom left" positionArea="bottom left">
          <Button variant="outlined">Bottom left</Button>
        </Tooltip>
        <Tooltip title="Bottom right" positionArea="bottom right">
          <Button variant="outlined">Bottom right</Button>
        </Tooltip>
      </section>

      <h2>
        <code>renderArrow</code>
      </h2>
      <section>
        <Tooltip title="No arrow (default)">
          <Button variant="outlined">Without arrow</Button>
        </Tooltip>
        <Tooltip title="Arrow pointing at the anchor" renderArrow>
          <Button variant="outlined">With arrow</Button>
        </Tooltip>
        <Tooltip
          title="Arrow on the top edge"
          renderArrow
          positionArea="top center"
        >
          <Button variant="outlined">Arrow on top</Button>
        </Tooltip>
        <Tooltip
          title="Arrow on the side edge"
          renderArrow
          positionArea="center right"
        >
          <Button variant="outlined">Arrow on side</Button>
        </Tooltip>
      </section>

      <h2>
        <code>arrowSize</code>
      </h2>
      <section>
        <Tooltip
          title="Small arrow"
          renderArrow
          arrowSize={{ width: 10, height: 5 }}
        >
          <Button variant="outlined">Small</Button>
        </Tooltip>
        <Tooltip
          title="Large arrow"
          renderArrow
          arrowSize={{ width: 28, height: 14 }}
        >
          <Button variant="outlined">Large</Button>
        </Tooltip>
      </section>

      <h2>Arrow in the corners</h2>
      <section>
        <p>
          A wide anchor with a short tooltip, the arrow slides along the edge
          and must stay clear of the rounded corners
        </p>
        <Tooltip title="Hi" renderArrow positionArea="bottom left">
          <Button variant="outlined" fullWidth>
            Wide anchor, tooltip is much narrower
          </Button>
        </Tooltip>
      </section>

      <h2>
        <code>followPointer</code>
      </h2>
      <section>
        <p>The tooltip follows the cursor while hovering the anchor</p>
        <Tooltip title="I follow your cursor" followPointer>
          <Card>
            <div style={{ padding: "3rem" }}>
              Move the pointer over this card
            </div>
          </Card>
        </Tooltip>
      </section>

      <h2>
        <code>followPointer</code> + <code>renderArrow</code>
      </h2>
      <section>
        <p>The arrow points at the cursor</p>
        <Tooltip title="Arrow points at the cursor" followPointer renderArrow>
          <Card>
            <div style={{ padding: "3rem" }}>
              Move the pointer over this card
            </div>
          </Card>
        </Tooltip>
      </section>

      <h2>
        <code>pointToCenterOfAnchor</code>
      </h2>
      <section>
        <p>
          The tooltip follows the cursor but the arrow keeps pointing at the
          center of the anchor
        </p>
        <Tooltip
          title="Arrow points at the card center"
          followPointer
          renderArrow
          pointToCenterOfAnchor
        >
          <Card>
            <div style={{ padding: "3rem" }}>
              Move the pointer over this card
            </div>
          </Card>
        </Tooltip>
      </section>

      <h2>
        <code>pointerGap</code>
      </h2>
      <section>
        <Tooltip title="Close to the cursor" followPointer pointerGap={4}>
          <Card>
            <div style={{ padding: "2rem" }}>Gap 4</div>
          </Card>
        </Tooltip>
        <Tooltip title="Far from the cursor" followPointer pointerGap={40}>
          <Card>
            <div style={{ padding: "2rem" }}>Gap 40</div>
          </Card>
        </Tooltip>
      </section>

      <h2>Viewport edges</h2>
      <section>
        <p>
          Scroll so these sit at the edge of the screen, the tooltip should flip
          or clamp instead of leaving the viewport
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Tooltip title="Stays inside the viewport" renderArrow>
            <Button variant="outlined">Left edge</Button>
          </Tooltip>
          <Tooltip title="Stays inside the viewport" renderArrow>
            <Button variant="outlined">Right edge</Button>
          </Tooltip>
        </div>
      </section>

      <h2>Long content</h2>
      <section>
        <Tooltip
          title="A much longer message that has to wrap or grow, to check that the position and the arrow still line up with the anchor"
          renderArrow
        >
          <Button variant="outlined">Long tooltip</Button>
        </Tooltip>
      </section>

      <h2>Different children</h2>
      <section>
        <Tooltip title="On a plain element" renderArrow>
          <span>Plain span</span>
        </Tooltip>
        <Tooltip title="On a card" renderArrow>
          <Card>
            <div style={{ padding: "1rem" }}>Card as anchor</div>
          </Card>
        </Tooltip>
      </section>
    </PageLayout>
  );
}
