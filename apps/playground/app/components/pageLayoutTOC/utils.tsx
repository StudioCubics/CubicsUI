"use client";

import {
  Button,
  type PageLayoutProps,
  PageLayoutTOC,
  useTableOfContentsTree,
} from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";
import { Fragment } from "react/jsx-runtime";

export const lorem = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
deserunt facere cumque error ducimus eum repellat aspernatur saepe rerum
nam. Cupiditate, possimus. Adipisci architecto repellendus veniam
eligendi. Porro, deserunt!`;

export function SamplePageLayoutTOC(props: Omit<PageLayoutProps, "children">) {
  const { ref, tree } = useTableOfContentsTree<HTMLDivElement>();
  return (
    <PageLayoutTOC
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
      tree={tree}
      slotProps={{ sidebarViewport: { ref } }}
      {...props}
    >
      <h2 id="SomeTitle">Some title</h2>
      <p>{lorem}</p>
      <h2>Some other title</h2>
      <p>{lorem + lorem}</p>
      <hr />
      <h2>Some other other title</h2>
      <h3>Some other other title 1</h3>
      <p>{lorem}</p>
      <h3>Some other other title 2</h3>
      <p>{lorem}</p>
      <div>
        <h2>Inside title</h2>
        <p>{lorem}</p>
      </div>
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
        <h3>Inside title 2</h3>
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
    </PageLayoutTOC>
  );
}
