"use client";

import { List, ListItem, type ListProps } from "@cubicsui/components";
import { useState } from "react";
import { getListItems } from "./getListItems";

export function RenderGlider() {
  return (
    <section>
      <p>
        The glider helps indicate the selected list item, uses a{" "}
        <code>GlassCard</code> by default but can be changed using{" "}
        <code>GliderComponent</code>
      </p>
      <div className={"grid"}>
        {(
          [
            undefined,
            "primary",
            "secondary",
            "tertiary",
            "error",
            "warn",
            "success",
          ] as const
        ).map((s) => (
          <GliderSample key={s ?? "undefined"} color={s} />
        ))}
      </div>
    </section>
  );
}
function GliderSample({ color }: { color: ListProps["color"] }) {
  const [selected, setSelected] = useState("s2");

  return (
    <div className="column" style={{ width: "260px" }}>
      <List
        color={color}
        renderGlider
        selectedWhen={(p) => {
          if (p.type && p.type !== "item") return false;
          return p.id == selected;
        }}
      >
        {getListItems({ color, setSelected }).map((item, i) => (
          <ListItem key={i} {...item} />
        ))}
      </List>
    </div>
  );
}
