import { LabeledValue, type LabeledValueProps } from "@cubicsui/components";

function SampleLabeledValue(props: LabeledValueProps) {
  return (
    <LabeledValue {...props}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat
      error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse,
      ad dolores deleniti distinctio eum a vitae harum?
    </LabeledValue>
  );
}
export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<LabeledValue/>"}</code>
      </h1>
      <h2>
        Custom <code>divider</code>
      </h2>
      <div
        className={"row_separator column"}
        style={{ containerType: "inline-size" }}
      >
        <SampleLabeledValue
          label="With a custom divider"
          divider={<hr style={{ borderStyle: "double" }} />}
        />
      </div>
      <h2>Sizes</h2>
      <div
        className={"row_separator column"}
        style={{ containerType: "inline-size" }}
      >
        <SampleLabeledValue label="This is a xs size label" size="xs" />
        <SampleLabeledValue label="This is a sm size label" size="sm" />
        <SampleLabeledValue label="This is a md size label" size="md" />
        <SampleLabeledValue label="This is a lg size label" size="lg" />
        <SampleLabeledValue label="This is a xl size label" size="xl" />
      </div>
      <h2>Colors</h2>
      <div
        className={"row_separator column"}
        style={{ containerType: "inline-size" }}
      >
        <SampleLabeledValue label="Color set to primary" color="primary" />
        <SampleLabeledValue label="Color set to secondary" color="secondary" />
        <SampleLabeledValue label="Color set to tertiary" color="tertiary" />
        <SampleLabeledValue label="Color set to error" color="error" />
        <SampleLabeledValue label="Color set to warn" color="warn" />
        <SampleLabeledValue label="Color set to success" color="success" />
      </div>
      <h2>
        <code>removeDivider</code>
      </h2>
      <div
        className={"row_separator column"}
        style={{ containerType: "inline-size" }}
      >
        <SampleLabeledValue label="Divider is removed" removeDivider />
      </div>
      <h2>Handling Long labels</h2>
      <div
        className={"row_separator column"}
        style={{ containerType: "inline-size" }}
      >
        <LabeledValue label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse, ad dolores deleniti distinctio eum a vitae harum?">
          This is a really long label
        </LabeledValue>
        <LabeledValue
          disableLabelWidth
          label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse, ad dolores deleniti distinctio eum a vitae harum?"
        >
          This is a really long label with <code>disableLabelWidth</code> it
          will make the content get as wide as possible
        </LabeledValue>
        <LabeledValue
          enableEvenWidth
          label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse, ad dolores deleniti distinctio eum a vitae harum?"
        >
          This is a really long label with <code>enableEvenWidth</code>
        </LabeledValue>
        <LabeledValue enableEvenWidth label="enableEvenWidth short label">
          This is a short label with <code>enableEvenWidth</code>
        </LabeledValue>
      </div>
      <h2>
        <code>clampLabel</code>
      </h2>
      <div
        className={"row_separator column"}
        style={{ containerType: "inline-size" }}
      >
        <LabeledValue
          disableLabelWidth
          clampLabel
          label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse, ad dolores deleniti distinctio eum a vitae harum?"
        >
          This is a really long label with disableLabelWidth and clampLabel it
          will make the content get as wide as possible, adding more words for
          length hows life? good! Good!
        </LabeledValue>
        <LabeledValue
          disableLabelWidth
          clampLabel={3}
          label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse, ad dolores deleniti distinctio eum a vitae harum?"
        >
          This is a really long label with disableLabelWidth and clampLabel=3 it
          will make the content get as wide as possible, adding more words for
          length hows life? good! Good!
        </LabeledValue>
      </div>
      <h2>
        <code>scrollOverflowLabel</code>
      </h2>
      <div
        className={"row_separator column"}
        style={{ containerType: "inline-size" }}
      >
        <LabeledValue
          enableEvenWidth
          scrollOverflowLabel
          label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quaerat error alias ad neque architecto corrupti? Omnis ut magni, odit illum esse, ad dolores deleniti distinctio eum a vitae harum?"
        >
          This is a really long label with disableLabelWidth and clampLabel it
          will make the content get as wide as possible, adding more words for
          length hows life? good! Good!
        </LabeledValue>
      </div>
    </main>
  );
}
