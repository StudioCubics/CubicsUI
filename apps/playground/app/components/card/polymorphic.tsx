"use client";

import { Card } from "@cubicsui/components";

export function Polymorphic() {
  return (
    <section>
      <Card as="article" fixedWidth="220px">
        Rendered as an <code>{"<article>"}</code> instead of a{" "}
        <code>{"<div>"}</code>.
      </Card>
      <Card as="button" fixedWidth="220px" onClick={() => alert("clicked")}>
        Rendered as a <code>{"<button>"}</code> — click me.
      </Card>
    </section>
  );
}
