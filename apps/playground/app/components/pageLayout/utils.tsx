import { Button, PageLayout, type PageLayoutProps } from "@cubicsui/components";
import { Fragment } from "react/jsx-runtime";

export const lorem = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
deserunt facere cumque error ducimus eum repellat aspernatur saepe rerum
nam. Cupiditate, possimus. Adipisci architecto repellendus veniam
eligendi. Porro, deserunt!`;

export function SamplePageLayout(props: Omit<PageLayoutProps, "children">) {
  return (
    <PageLayout
      title="This is a title"
      desc="This is a description"
      actions={
        <Button size="sm" variant="outlined">
          This is an action
        </Button>
      }
      titleBar={
        <>
          <p>
            This is a <code>titleBar</code>
          </p>
          <Button variant="contained" size="sm">
            Copy
          </Button>
          <Button variant="outlined" size="sm">
            Paste
          </Button>
          <Button color="error" size="sm">
            Delete
          </Button>
        </>
      }
      footer={
        <footer
          className={"fullWidth"}
          style={{
            background: "var(--color-surface-highest)",
            color: "var(--color-on-surface)",
            padding: "calc(var(--size) * var(--gr)) 8.33%",
          }}
        >
          This is a <code>footer</code>
          <br />
          {lorem}
        </footer>
      }
      {...props}
    >
      <p>{lorem}</p>
      <p>{lorem + lorem}</p>
      <hr />
      <p>{lorem}</p>
      <p className={"breakout secondary_bg"}>
        With <code>className="breakout"</code>
        <br />
        {lorem}
      </p>
      <p className={"fullWidth primary_bg"}>
        With <code>className="fullWidth"</code>
        <br />
        {lorem}
      </p>

      <div className="column">
        <p>
          A row with vertical <code>{"<hr/>"}</code>
        </p>
        <div className="row">
          {["A", "B", "C", "D", "E"].map((c) => (
            <Fragment key={c}>
              <Button>{c}</Button>
              <hr />
            </Fragment>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
