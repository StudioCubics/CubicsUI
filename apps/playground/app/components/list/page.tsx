import { Card, CardContent, CardHeader, Button } from "@cubicsui/components";
import { List, ListItem } from "@cubicsui/components";
import { SelectedWhen } from "./selectedWhen";
import { CubicsUIFavicon } from "@cubicsui/icons";
import { RenderGlider } from "./renderMarker";
import { nestedListItems } from "@/lib/constants/nestedListItems";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<List/>"}</code>
      </h1>

      <h2>Composed example</h2>
      <section>
        <div className="column image_bg">
          <Card fixedWidth="320px" elevation="high">
            <CardHeader
              title={<>Account settings</>}
              desc="Manage your preferences"
            />

            <CardContent>
              <div className="column">
                <List>
                  <ListItem type="header" children="Some Header" />
                  <ListItem children="Profile" />
                  <ListItem children="Security" />
                  <ListItem
                    type="collapsible"
                    id="notifications"
                    children="Notifications"
                    nodes={nestedListItems("notifications")}
                  />
                </List>
                <Button variant="contained" fullWidth>
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <h2>ListItem without List</h2>
      <p>Dont do this!</p>
      <section>
        <ul>
          <ListItem>Only List Item no List</ListItem>
          <ListItem
            type="collapsible"
            id="composed-ul-collapsible"
            nodes={[{ children: "Child 1" }, { children: "Child 2" }]}
            size="xs"
          >
            Only List Item no List 2
          </ListItem>
        </ul>
        <ol>
          <ListItem>Only List Item no List</ListItem>
          <ListItem
            type="collapsible"
            id="composed-ol-collapsible"
            nodes={[{ children: "Child 1" }, { children: "Child 2" }]}
            size="xs"
          >
            Only List Item no List 2
          </ListItem>
        </ol>
      </section>

      <h2>Item types</h2>
      <p>
        <code>type</code> controls which sub-component renders:{" "}
        <code>item</code>, <code>separator</code>, <code>collapsible</code>, or{" "}
        <code>header</code>.
      </p>
      <section>
        <div className="column" style={{ width: "260px" }}>
          <h3>item</h3>
          <List>
            <ListItem children="A plain item" />
          </List>
        </div>
        <div className="column" style={{ width: "260px" }}>
          <h3>separator</h3>
          <List>
            <ListItem children="Above" />
            <ListItem type="separator" />
            <ListItem children="Below" />
          </List>
        </div>
        <div className="column" style={{ width: "260px" }}>
          <h3>collapsible</h3>
          <List>
            <ListItem
              type="collapsible"
              id="t-col-1"
              children="Expand me"
              nodes={nestedListItems("ExpandMe")}
            />
          </List>
        </div>
        <div className="column" style={{ width: "260px" }}>
          <h3>header</h3>
          <p>
            Non-interactive label. <code>renderLine</code> adds a trailing
            divider line.
          </p>
          <List>
            <ListItem type="header" children="Plain header" />
            <ListItem children="Item below" />
            <ListItem type="header" children="Header with line" renderLine />
            <ListItem children="Another item" />
          </List>
        </div>
      </section>

      <h2>Sizes</h2>
      <p>Controls the spacing scale, border-radius, and font-size tokens.</p>
      <section>
        <div className="row">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div className="column" key={size} style={{ width: "350px" }}>
              <h3>
                {size} {size === "md" && "(Default)"}
              </h3>
              <hr />
              <List size={size}>
                <ListItem
                  children="With Icon"
                  icon={<CubicsUIFavicon />}
                  href="#"
                />
                <ListItem children="First item" />
                <ListItem type="header" children="Sized Header" />
                <ListItem children="Second item" href="#" selected />
                <ListItem
                  type="collapsible"
                  id={`size-${size}-3`}
                  children="Collapsible"
                  nodes={nestedListItems(size)}
                  size={size}
                />
              </List>
            </div>
          ))}
        </div>
      </section>

      <h2>Colors</h2>
      <p>
        Controls <code>--bg-hover</code>, <code>--bg-selected</code>, and{" "}
        <code>--color-selected</code>. Applies to the whole list or an
        individual item.
      </p>
      <section>
        <div className="row">
          {(
            [
              "primary",
              "secondary",
              "tertiary",
              "error",
              "warn",
              "success",
            ] as const
          ).map((color) => (
            <div className="column" key={color} style={{ width: "220px" }}>
              <h3>{color}</h3>
              <hr />
              <List color={color}>
                <ListItem
                  children="With Icon"
                  icon={<CubicsUIFavicon />}
                  href="#"
                />
                <ListItem children="Selected item" href="#" selected />
                <ListItem type="header" children="Colored Header" />
                <ListItem children="Hover me" href="#" />
                <ListItem
                  type="collapsible"
                  id={`color-other-${color}-3`}
                  children="Collapsible Colored"
                  defaultCollapsed
                  nodes={nestedListItems(`otherColor-${color}`)}
                  color={"error"}
                />
                <ListItem
                  type="collapsible"
                  id={`color-${color}-3`}
                  children="Collapsible with expanded"
                  nodes={nestedListItems(color)}
                />
              </List>
            </div>
          ))}
        </div>
      </section>

      <h2>
        With <code>renderGlider</code>
      </h2>
      <RenderGlider />

      <h2>Selected state</h2>
      <SelectedWhen />

      <h2>Disabled</h2>
      <section>
        <div className="column" style={{ width: "260px" }}>
          <List>
            <ListItem id="dis-1" children="Enabled item" />
            <ListItem id="dis-2" children="Disabled item" disabled />
            <ListItem
              type="collapsible"
              id="dis-3"
              children="Disabled collapsible"
              disabled
              nodes={nestedListItems("disabled")}
            />
          </List>
        </div>
      </section>

      <h2>Icon and action</h2>
      <section>
        <div className="column" style={{ width: "280px" }}>
          <List>
            <ListItem icon={<span>★</span>} children="With icon" />
            <ListItem
              icon={<span>⚙</span>}
              children="With icon and action"
              action={<Button size="xs">Edit</Button>}
            />
            <ListItem
              icon={<CubicsUIFavicon />}
              children="With icon and action"
            />
          </List>
        </div>
      </section>
      <h2>Persisting collapsed state</h2>
      <p>
        Collapsed state is saved to <code>localStorage</code> when the{" "}
        <code>List</code> has an <code>id</code>, unless{" "}
        <code>persist={"{false}"}</code> is set. Without an <code>id</code>,
        nothing is persisted. Toggle the items, then reload the page and
        navigate away and back to compare.
      </p>
      <section>
        <div className="column" style={{ width: "260px" }}>
          <h3>
            With <code>id</code>
          </h3>
          <p>Persists.</p>
          <List id="persist-with-id">
            <ListItem
              type="collapsible"
              id="persist-with-id-collapsible"
              children="Persisted"
              nodes={nestedListItems("persistWithId")}
            />
          </List>
        </div>
        <div className="column" style={{ width: "260px" }}>
          <h3>
            <code>id</code> + <code>persist={"{false}"}</code>
          </h3>
          <p>Doesn't persist.</p>
          <List id="persist-disabled" persist={false}>
            <ListItem
              type="collapsible"
              id="persist-disabled-collapsible"
              children="Not persisted"
              nodes={nestedListItems("persistDisabled")}
            />
          </List>
        </div>
        <div className="column" style={{ width: "260px" }}>
          <h3>
            No <code>id</code>
          </h3>
          <p>Doesn't persist.</p>
          <List>
            <ListItem
              type="collapsible"
              id="persist-no-id-collapsible"
              children="Not persisted"
              nodes={nestedListItems("persistNoId")}
            />
          </List>
        </div>
        <div className="column" style={{ width: "260px" }}>
          <h3>
            <code>persist</code> without <code>id</code>
          </h3>
          <p>
            Persists, but the key isn't stable across client-side navigations.
          </p>
          <List persist>
            <ListItem
              type="collapsible"
              id="persist-no-id-flag-collapsible"
              children="Unreliable"
              nodes={nestedListItems("persistNoIdFlag")}
            />
          </List>
        </div>
      </section>
      <h2>
        Links <code>href + LinkComponent</code>
      </h2>
      <p>
        Renders as an anchor (or the supplied <code>LinkComponent</code>, e.g.
        Next.js <code>Link</code>) instead of a <code>div</code> when{" "}
        <code>href</code> is set.
      </p>
      <section>
        <div className="column" style={{ width: "260px" }}>
          <List>
            <ListItem href="#" children="Anchor link item" />
            <ListItem children="No href, not clickable" />
          </List>
        </div>
      </section>

      <h2>Ordered vs unordered</h2>
      <section>
        <div className="column" style={{ width: "260px" }}>
          <h3>unordered (default)</h3>
          <List>
            <ListItem children="Item one" />
            <ListItem children="Item two" />
          </List>
        </div>
        <div className="column" style={{ width: "260px" }}>
          <h3>ordered</h3>
          <List ordered>
            <ListItem children="Item one" />
            <ListItem children="Item two" />
          </List>
        </div>
      </section>

      <h2>
        With custom <code>dropdownIcon</code>
      </h2>
      <p>Custom dropdownIcon set to "^" in collapsible type</p>
      <section>
        <div className="column" style={{ width: "260px" }}>
          <List>
            <ListItem children="Item one" />
            <ListItem children="Item two" />
            <ListItem
              type="collapsible"
              id="dropdownIcon-nested"
              ordered
              children="Nested code"
              nodes={nestedListItems("listTypeListWide")}
              dropdownIcon={"^"}
            />
          </List>
        </div>
      </section>

      <h2>listType</h2>
      <p>
        <code>listType</code> sets the CSS <code>list-style-type</code> for a
        list. Pass it to <code>List</code> to apply it to the whole list (and
        its sublists), or to a <code>collapsible</code> <code>ListItem</code> to
        override it for just that item's sublist.
      </p>
      <section>
        <div className="column" style={{ width: "260px" }}>
          <h3>List-wide</h3>
          <List ordered listType="upper-roman">
            <ListItem children="Item one" />
            <ListItem children="Item two" />
            <ListItem
              type="collapsible"
              id="listtype-listwide"
              ordered
              children="Sublist inherits upper-roman"
              nodes={nestedListItems("listTypeListWide")}
            />
          </List>
        </div>
        <div className="column" style={{ width: "260px" }}>
          <h3>Per collapsible sublist</h3>
          <List ordered>
            <ListItem children="Item one" />
            <ListItem
              type="collapsible"
              id="listtype-override"
              ordered
              listType="lower-alpha"
              children="Sublist uses lower-alpha"
              nodes={nestedListItems("listTypeOverride")}
            />
          </List>
        </div>
      </section>

      <h2>Collapsible nesting</h2>
      <p>
        Collapsed state persists to <code>localStorage</code> keyed by{" "}
        <code>{"${id}-collapsed"}</code> of the <code>List</code>. Reload the
        page to confirm it sticks.
      </p>
      <section>
        <div className="column" style={{ width: "280px" }}>
          <List>
            <ListItem
              type="collapsible"
              id="collapse-initially-open"
              children="Initially expanded"
              defaultCollapsed={false}
              nodes={nestedListItems("initiallyExpanded")}
            />
            <ListItem
              type="collapsible"
              id="collapse-initially-closed"
              children="Initially defaultCollapsed"
              defaultCollapsed={true}
              nodes={nestedListItems("initiallyCollapsed")}
            />
          </List>
        </div>
      </section>

      <h2>Background check</h2>
      <p>
        Confirms hover/selected mix colors read correctly against different
        backgrounds.
      </p>
      <section>
        <div className="column" style={{ width: "260px" }}>
          <h3>On plain page background</h3>
          <List>
            <ListItem children="Item" />
            <ListItem children="Selected" selected />
          </List>
        </div>
        <div className="column rgb_bg" style={{ width: "260px" }}>
          <h3>On RGB</h3>
          <List>
            <ListItem children="Item" />
            <ListItem children="Selected" selected />
          </List>
        </div>
        <div className="column image_bg" style={{ width: "260px" }}>
          <h3>On image</h3>
          <List>
            <ListItem children="Item" />
            <ListItem children="Selected" selected />
          </List>
        </div>
      </section>
    </main>
  );
}
