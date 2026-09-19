"use client";

import { List, ListItem } from "@cubicsui/components";

export function SelectedWhen() {
  return (
    <section>
      <p>
        <code>selected</code> can be set individually per item, or derived from
        the list via <code>selectedWhen</code>.
      </p>
      <div className="column" style={{ width: "260px" }}>
        <h3>Individual selected prop</h3>
        <List>
          <ListItem type="item">Not selected</ListItem>
          <ListItem type="item" selected>
            Selected
          </ListItem>
        </List>
      </div>
      <div className="column" style={{ width: "260px" }}>
        <h3>selectedWhen</h3>
        <List selectedWhen={(props) => props.children === "Selected via list"}>
          <ListItem type="item">Not selected</ListItem>
          <ListItem type="item">Selected via list</ListItem>
        </List>
      </div>
    </section>
  );
}
