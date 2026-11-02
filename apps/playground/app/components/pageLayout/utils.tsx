import { Button, PageLayout, type PageLayoutProps } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";
import { Fragment } from "react/jsx-runtime";

export const lorem = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
deserunt facere cumque error ducimus eum repellat aspernatur saepe rerum
nam. Cupiditate, possimus. Adipisci architecto repellendus veniam
eligendi. Porro, deserunt!`;

export function SamplePageLayout(props: Omit<PageLayoutProps, "children">) {
  return (
    <PageLayout
      title={
        <>
          <CubicsUIFavicon /> This is a title
        </>
      }
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
          <Button variant="outlined">Paste</Button>
          <Button color="error" size="lg">
            Delete
          </Button>
        </>
      }
      footer={
        <footer
          className={"pageWidth"}
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
      <p className={"pageWidth primary_bg"}>
        With <code>className="pageWidth"</code>
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
