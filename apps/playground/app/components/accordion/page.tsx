/** biome-ignore-all lint/suspicious/noArrayIndexKey: playground pages dont matter */
import {
  Accordion,
  AccordionItem,
  type AccordionItemProps,
  type AccordionProps,
  PageLayout,
} from "@cubicsui/components";

const LOREM =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil maiores, quod corporis ea laboriosam exercitationem esse illum praesentium, hic maxime quibusdam temporibus excepturi quasi ullam soluta? Quasi, minus. Architecto, in!";

const VARIANTS: {
  title: string;
  props: Partial<AccordionItemProps>;
}[] = [
  { title: "default", props: {} },
  { title: "contained", props: { variant: "contained" } },
  { title: "outlined", props: { variant: "outlined" } },
];

const COLORS: {
  title: string;
  props: Partial<AccordionItemProps>;
}[] = [
  { title: "default", props: {} },
  ...(
    ["primary", "secondary", "tertiary", "error", "warn", "success"] as const
  ).map((color) => ({ title: color, props: { color } })),
];

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

const COLOR_VARIANTS: {
  title: string;
  props: Partial<AccordionItemProps>;
}[] = [
  { title: "default", props: {} },
  { title: "highlightOpen", props: { highlightOpen: true } },
  { title: "contained", props: { variant: "contained" } },
  {
    title: "contained + highlightOpen",
    props: { variant: "contained", highlightOpen: true },
  },
  { title: "outlined", props: { variant: "outlined" } },
  {
    title: "outlined + highlightOpen",
    props: { variant: "outlined", highlightOpen: true },
  },
];

const DISABLED_ITEMS: AccordionItemProps[] = [
  { summary: "This is another exclusive summary", color: "primary" },
  { summary: "This is another another exclusive summary" },
  {
    summary: "This is another another primary exclusive summary",
    color: "primary",
  },
  {
    summary: "This is another another secondary exclusive summary",
    color: "secondary",
    variant: "contained",
  },
  {
    summary: "This is another another error exclusive summary",
    color: "error",
    variant: "outlined",
  },
];

function Item(props: AccordionItemProps) {
  return <AccordionItem {...props}>{LOREM}</AccordionItem>;
}

function Sample(props: AccordionProps) {
  return (
    <Accordion
      {...props}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--gap-2)",
        ...props.style,
      }}
    />
  );
}

export default function Page() {
  return (
    <PageLayout
      id={"Accordion"}
      persistScrollPosition
      collapseHeaderOnScroll
      title={<code>{"<Accordion/>"}</code>}
    >
      <h2>Exclusive</h2>
      <Sample exclusive>
        {["This is a", "This is another", "This is a third"].map((s) => (
          <Item key={s} summary={`${s} exclusive summary`} />
        ))}
      </Sample>

      <h2>Variants</h2>
      <section>
        {VARIANTS.map(({ title, props }) => (
          <Sample key={title}>
            <h4>{title}</h4>
            {["a", "another", "a third"].map((s, i) => (
              <Item
                key={i}
                {...props}
                highlightOpen={i === 1}
                summary={`This is ${s} summary`}
              />
            ))}
          </Sample>
        ))}
      </section>

      <h2>Colors</h2>
      <section>
        {COLORS.map(({ title, props: colorProps }) => (
          <Sample key={title}>
            <h4>{title}</h4>
            {COLOR_VARIANTS.map(({ title, props }) => (
              <Item
                key={title}
                {...colorProps}
                {...props}
                summary={`This is a ${title} summary`}
              />
            ))}
          </Sample>
        ))}
      </section>

      <h2>Sizes</h2>
      <section>
        {SIZES.map((size) => (
          <Sample key={size}>
            <h4>{size}</h4>
            {VARIANTS.map(({ title, props }) => (
              <Item
                key={title}
                {...props}
                size={size}
                summary={`This is a ${size} ${title} summary`}
              />
            ))}
          </Sample>
        ))}
      </section>

      <h2>Persistent</h2>
      <section>
        {[false, true].map((exclusive) => (
          <section key={String(exclusive)}>
            {exclusive && <hr />}
            <h3>{exclusive ? "Exclusive" : "NonExclusive"}</h3>
            <Sample
              exclusive={exclusive}
              id={exclusive ? "persistent-exclusive" : "persistent"}
            >
              {["This is a", "This is another", "This is a third"].map(
                (s, i) => (
                  <Item
                    key={i}
                    id={String(i + 1)}
                    summary={`${s} persistent ${exclusive ? "exclusive " : ""}summary`}
                  />
                ),
              )}
            </Sample>
          </section>
        ))}
      </section>

      <h2>toggleOnlyOnIcon</h2>
      <section>
        <Item
          summary="This should toggle only when clicked on the dropdown icon"
          toggleOnlyOnIcon
        />
        <Item
          highlightOpen
          summary="This should toggle only when clicked on the dropdown icon, has highlightOpen"
          toggleOnlyOnIcon
        />
      </section>

      <h2>With renderGlider</h2>
      <section>
        {VARIANTS.map(({ title, props }) => (
          <Sample key={title} exclusive renderGlider>
            <h4>{title}</h4>
            {["a", "another", "a third"].map((s, i) => (
              <Item
                key={i}
                {...props}
                highlightOpen={i === 1}
                summary={`This is ${s} summary`}
              />
            ))}
          </Sample>
        ))}
      </section>

      <h2>With highlightOpen</h2>
      <section>
        {COLORS.map(({ title, props: colorProps }) => (
          <Sample key={title}>
            <h4>{title}</h4>
            {COLOR_VARIANTS.map(({ title, props }) => (
              <Item
                key={title}
                {...colorProps}
                {...props}
                highlightOpen
                summary={`This is a ${title} summary`}
              />
            ))}
          </Sample>
        ))}
      </section>

      <h2>Without Accordion Provider</h2>
      <section>
        {["This is a", "This is another", "This is a third"].map((s) => (
          <Item key={s} summary={`${s} exclusive summary`} />
        ))}
      </section>

      <h2>Disabled Item</h2>
      <section>
        <Item summary="This is an exclusive summary" />
        {DISABLED_ITEMS.map((props, i) => (
          <Item key={i} {...props} disabled />
        ))}
        <Item summary="This is a third exclusive summary" />
      </section>
    </PageLayout>
  );
}
