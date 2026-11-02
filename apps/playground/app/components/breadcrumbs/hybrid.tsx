"use client";

import { Breadcrumbs, Button } from "@cubicsui/components";
import { useState } from "react";
import { renderStaticCrumbs } from "./crumbs";
// 1. Uncontrolled: click selects, defaultSelected, onChange
export function Hybrid() {
  const [active, setActive] = useState("B");
  const crumbs = ["Apple", "Orange", "Pinapple", "Apricot"];
  return (
    <section>
      <h3>
        Using <code>defaultSelected=1</code>
      </h3>
      <Breadcrumbs
        defaultSelected={1}
        onChange={(i) => console.log("selected", i)}
      >
        {renderStaticCrumbs()}
      </Breadcrumbs>
      <hr />
      <h3>
        Using <code>selectedWhen</code>
      </h3>
      <div className={"row"}>
        {crumbs.map((c) => (
          <Button
            variant="outlined"
            size="sm"
            color={active === c ? "primary" : undefined}
            key={c}
            onClick={() => setActive(c)}
          >
            Make {c} active
          </Button>
        ))}
      </div>
      <Breadcrumbs selectedWhen={({ id }) => id === active}>
        {crumbs.map((c) => (
          <span key={c} id={c}>
            {c}
          </span>
        ))}
      </Breadcrumbs>
    </section>
  );
}
