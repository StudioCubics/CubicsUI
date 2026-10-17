import { SectionWrapper, type SectionWrapperProps } from "@cubicsui/components";

function SectionWrapperSample(props: SectionWrapperProps) {
  return (
    <SectionWrapper {...props}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat
      error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse,
      ad dolores deleniti distinctio eum a vitae harum?
    </SectionWrapper>
  );
}

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<SectionWrapper/>"}</code>
      </h1>
      <h2>Sample</h2>
      <div style={{ containerType: "inline-size" }}>
        <SectionWrapperSample
          title={"This is a title"}
          subtitle={"This is a subtitle"}
        />
        <SectionWrapperSample
          title={"This is another title"}
          subtitle={"This is another subtitle"}
        />
      </div>

      <h2>Colors</h2>
      <div style={{ containerType: "inline-size" }}>
        {(["primary", "secondary", "tertiary", "error"] as const).map((c) => (
          <SectionWrapperSample
            key={c}
            color={c}
            title={
              <h4>
                Color set to <code>{c}</code>
              </h4>
            }
            subtitle={`Checking subtitle size`}
          />
        ))}
      </div>
      <h2>Sizes</h2>
      <div style={{ containerType: "inline-size" }}>
        {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
          <SectionWrapperSample
            key={s}
            size={s}
            title={
              <h4>
                Size set to <code>{s}</code>
              </h4>
            }
            subtitle={`Checking subtitle size`}
          />
        ))}
      </div>
      <h2>Using other TitleElement</h2>
      <div style={{ containerType: "inline-size" }}>
        {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((s) => (
          <SectionWrapperSample
            key={s}
            TitleElement={s}
            title={`TitleElement set to ${s} ${s == "h4" ? "(default)" : ""}`}
            subtitle={`Checking subtitle size`}
          />
        ))}
      </div>

      <h2>Long titles and subtitles</h2>
      <div style={{ containerType: "inline-size" }}>
        <SectionWrapperSample title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse, ad dolores deleniti distinctio eum a vitae harum?" />
        <SectionWrapperSample
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse, ad dolores deleniti distinctio eum a vitae harum?"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse, ad dolores deleniti distinctio eum a vitae harum?"
        />
      </div>
      <h2>
        Using <code>noBorders</code>
      </h2>
      <div style={{ containerType: "inline-size" }}>
        <SectionWrapperSample title={"With noBorders"} noBorders />
        <SectionWrapperSample title={"Anoter with noBorders"} noBorders />
      </div>
    </main>
  );
}
