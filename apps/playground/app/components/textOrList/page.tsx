import { TextOrList } from "@cubicsui/components";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<TextOrList/>"}</code>
      </h1>

      <h2>String text</h2>
      <section>
        <div className={"column"}>
          <h3>Single string</h3>
          <TextOrList text="This renders as a paragraph" />
        </div>
      </section>

      <h2>Array text</h2>
      <section>
        <div className={"column"}>
          <h3>Array with one item</h3>
          <p>Still renders a paragraph, not a list</p>
          <TextOrList text={["Just one item"]} />
        </div>
        <hr />
        <div className={"column"}>
          <h3>Array with multiple items</h3>
          <p>Renders a list, each item in an li</p>
          <TextOrList text={["First item", "Second item", "Third item"]} />
        </div>
      </section>

      <h2>Common usage: helper text / errors</h2>
      <section>
        <div className={"column"}>
          <h3>Single helper message</h3>
          <TextOrList text="Make sure to add in format city, state, country" />
        </div>
        <hr />
        <div className={"column"}>
          <h3>Multiple error messages</h3>
          <TextOrList text={["This field has", "multiple errors"]} />
        </div>
      </section>
    </main>
  );
}
