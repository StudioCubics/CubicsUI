import {
  Accordion,
  AccordionItem,
  type AccordionItemProps,
  type AccordionProps,
} from "@cubicsui/components";

function AccordionItemSample(props: AccordionItemProps) {
  return (
    <AccordionItem {...props}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil maiores,
      quod corporis ea laboriosam exercitationem esse illum praesentium, hic
      maxime quibusdam temporibus excepturi quasi ullam soluta? Quasi, minus.
      Architecto, in!
    </AccordionItem>
  );
}
function AccordionSample(props: AccordionProps) {
  return (
    <Accordion
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--gap-2)",
        ...props.style,
      }}
      {...props}
    />
  );
}

function AccordionVariantSamples(props: AccordionProps) {
  return (
    <>
      {(
        [undefined, "contained", "outlined"] as AccordionItemProps["variant"][]
      ).map((v) => (
        <AccordionSample key={v ?? "default"} {...props}>
          <h4>{v ?? "default"}</h4>
          <AccordionItemSample
            variant={v}
            summary={`This is a ${props.exclusive ? "exclusive" : ""} summary`}
          />
          <AccordionItemSample
            variant={v}
            highlightOpen
            summary={`This is another ${props.exclusive ? "exclusive" : ""} summary, this one also has highlightOpen for some reason`}
          />
          <AccordionItemSample
            variant={v}
            summary={`This is a third ${props.exclusive ? "exclusive" : ""} summary`}
          />
        </AccordionSample>
      ))}
    </>
  );
}
function AccordionColorSamples(props: AccordionProps) {
  return (
    <>
      {(
        [
          undefined,
          "primary",
          "secondary",
          "tertiary",
          "error",
          "warn",
          "success",
        ] as AccordionItemProps["color"][]
      ).map((c) => (
        <AccordionSample key={c ?? "default"} {...props}>
          <h4>{c ?? "default"}</h4>
          <AccordionItemSample
            color={c}
            summary={`This is a ${props.exclusive ? "exclusive" : ""} summary`}
          />
          <AccordionItemSample
            color={c}
            highlightOpen
            summary={`This is a ${props.exclusive ? "exclusive" : ""} summary, has highlightOpen`}
          />
          <AccordionItemSample
            color={c}
            variant={"contained"}
            summary={`This is another ${props.exclusive ? "exclusive" : ""} summary, this one is contained`}
          />
          <AccordionItemSample
            color={c}
            variant={"contained"}
            highlightOpen
            summary={`This is another ${props.exclusive ? "exclusive" : ""} summary, this one is contained, has highlightOpen`}
          />
          <AccordionItemSample
            color={c}
            variant={"outlined"}
            summary={`This is a third ${props.exclusive ? "exclusive" : ""} summary, this one is outlined`}
          />
          <AccordionItemSample
            color={c}
            variant={"outlined"}
            highlightOpen
            summary={`This is a third ${props.exclusive ? "exclusive" : ""} summary, this one is outlined, has highlightOpen`}
          />
        </AccordionSample>
      ))}
    </>
  );
}
function AccordionSizeSamples(props: AccordionProps) {
  return (
    <>
      {(["xs", "sm", "md", "lg", "xl"] as AccordionItemProps["size"][]).map(
        (s) => (
          <AccordionSample key={s ?? "default"} {...props}>
            <h4>{s ?? "default"}</h4>
            <AccordionItemSample
              size={s}
              summary={`This is a ${s} ${props.exclusive ? "exclusive" : ""} summary`}
            />
            <AccordionItemSample
              size={s}
              variant={"contained"}
              summary={`This is another ${s} ${props.exclusive ? "exclusive" : ""} summary`}
            />
            <AccordionItemSample
              size={s}
              variant={"outlined"}
              summary={`This is a ${s} third ${props.exclusive ? "exclusive" : ""} summary`}
            />
          </AccordionSample>
        ),
      )}
    </>
  );
}
export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<Accordion/>"}</code>
      </h1>
      <h2>Exclusive</h2>
      <section>
        <AccordionSample exclusive>
          <AccordionItemSample summary={"This is a exclusive summary"} />
          <AccordionItemSample summary={"This is another exclusive summary"} />
          <AccordionItemSample summary={"This is a third exclusive summary"} />
        </AccordionSample>
      </section>

      <h2>Variants</h2>
      <section>
        <AccordionVariantSamples />
      </section>

      <h2>Colors</h2>
      <section>
        <AccordionColorSamples />
      </section>
      <h2>Sizes</h2>
      <section>
        <AccordionSizeSamples />
      </section>

      <h2>Persistent</h2>
      <section>
        <h3>NonExclusive</h3>
        <AccordionSample id={"persitant"}>
          <AccordionItemSample
            id={"1"}
            summary={"This is a persistent summary"}
          />
          <AccordionItemSample
            id={"2"}
            summary={"This is another persistent summary"}
          />
          <AccordionItemSample
            id={"3"}
            summary={"This is a third persistent summary"}
          />
        </AccordionSample>
        <hr />
        <h3>Exclusive</h3>
        <AccordionSample exclusive id={"persitant-exclusive"}>
          <AccordionItemSample
            id={"1"}
            summary={"This is a persistent exclusive summary"}
          />
          <AccordionItemSample
            id={"2"}
            summary={"This is another persistent exclusive summary"}
          />
          <AccordionItemSample
            id={"3"}
            summary={"This is a third persistent exclusive summary"}
          />
        </AccordionSample>
      </section>
      <h2>toggleOnlyOnIcon</h2>
      <section>
        <AccordionItemSample
          summary={"This should toggle only when clicked on the dropdownicon"}
          toggleOnlyOnIcon
        />
        <AccordionItemSample
          highlightOpen
          summary={
            "This should toggle only when clicked on the dropdownicon,has highlightOpen"
          }
          toggleOnlyOnIcon
        />
      </section>
      <h2>With renderGlider</h2>
      <section>
        <AccordionVariantSamples exclusive renderGlider />
        <AccordionColorSamples exclusive renderGlider />
      </section>

      <h2>With highlightOpen</h2>
      <section>
        <AccordionColorSamples />
      </section>
      <h2>Without Accordion Provider</h2>
      <section>
        <AccordionItemSample summary={"This is a exclusive summary"} />
        <AccordionItemSample summary={"This is another exclusive summary"} />
        <AccordionItemSample summary={"This is a third exclusive summary"} />
      </section>
      <h2>Disabled Item</h2>
      <section>
        <AccordionItemSample summary={"This is a exclusive summary"} />
        <AccordionItemSample
          color="primary"
          disabled
          summary={"This is another exclusive summary"}
        />
        <AccordionItemSample
          disabled
          summary={"This is another another exclusive summary"}
        />
        <AccordionItemSample
          disabled
          summary={"This is another another primary exclusive summary"}
          color="primary"
        />
        <AccordionItemSample
          disabled
          summary={"This is another another secondary exclusive summary"}
          color="secondary"
          variant="contained"
        />
        <AccordionItemSample
          disabled
          variant="outlined"
          summary={"This is another another error exclusive summary"}
          color="error"
        />
        <AccordionItemSample summary={"This is a third exclusive summary"} />
      </section>
    </main>
  );
}
