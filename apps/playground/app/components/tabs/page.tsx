"use client";

import { useState, type CSSProperties } from "react";
import { Card, CardContent, CardHeader } from "@cubicsui/components";
import { Tabs, TabsBar, Tab, useTabs } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

/** Reads the active tab from context so we can verify selection visually. */
function ActiveTab() {
  const { activeTab } = useTabs();
  return (
    <p>
      Active tab: <code>{String(activeTab)}</code>
    </p>
  );
}

export default function Page() {
  const [clicks, setClicks] = useState(0);

  return (
    <main className="main">
      <h1>
        <code>{"<Tabs/>"}</code>
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
              <Tabs defaultTab="profile">
                <TabsBar renderGlider>
                  <Tab value="profile">Profile</Tab>
                  <Tab value="security">Security</Tab>
                  <Tab value="notifications">Notifications</Tab>
                </TabsBar>
                <ActiveTab />
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <h2>defaultTab</h2>
      <section>
        <p>
          <code>defaultTab</code> sets the initially selected tab.
        </p>
        <div className="column">
          <h3>With defaultTab</h3>
          <Tabs defaultTab="two">
            <TabsBar>
              <Tab value="one">One</Tab>
              <Tab value="two">Two</Tab>
              <Tab value="three">Three</Tab>
            </TabsBar>
            <ActiveTab />
          </Tabs>
        </div>
        <div className="column">
          <h3>Without defaultTab</h3>
          <Tabs>
            <TabsBar>
              <Tab value="one">One</Tab>
              <Tab value="two">Two</Tab>
              <Tab value="three">Three</Tab>
            </TabsBar>
            <ActiveTab />
          </Tabs>
        </div>
        <div className="column">
          <h3>Non-matching defaultTab</h3>
          <Tabs defaultTab="does-not-exist">
            <TabsBar renderGlider>
              <Tab value="one">One</Tab>
              <Tab value="two">Two</Tab>
            </TabsBar>
            <ActiveTab />
          </Tabs>
        </div>
      </section>

      <h2>Sizes</h2>
      <p>Controls the spacing scale, border-radius, and font-size tokens.</p>
      <section>
        <div className="row">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div className="column" key={size}>
              <h3>
                {size} {size === "md" && "(Default)"}
              </h3>
              <hr />
              <Tabs defaultTab="b">
                <TabsBar size={size}>
                  <Tab value="a">First</Tab>
                  <Tab value="b">Second</Tab>
                  <Tab value="c">Third</Tab>
                </TabsBar>
              </Tabs>
            </div>
          ))}
        </div>
      </section>

      <h2>Colors</h2>
      <p>Applies to the selected tab styling and the glider.</p>
      <section>
        <div className="row">
          {(
            [undefined, "primary", "secondary", "tertiary", "error"] as const
          ).map((color) => (
            <div
              className="column"
              key={color ?? "colorUndefined"}
              style={{ width: "320px" }}
            >
              <h3>{color ?? "default"}</h3>
              <hr />
              <Tabs defaultTab="b">
                <TabsBar color={color}>
                  <Tab value="a">First</Tab>
                  <Tab value="b">Selected</Tab>
                  <Tab value="c">Hover me</Tab>
                </TabsBar>
              </Tabs>
              <Tabs defaultTab="b">
                <TabsBar color={color} renderGlider>
                  <Tab value="a">First</Tab>
                  <Tab value="b">Glider</Tab>
                  <Tab value="c">Hover me</Tab>
                </TabsBar>
              </Tabs>
              <Tabs defaultTab="b">
                <TabsBar color={color} removeBg>
                  <Tab value="a">First</Tab>
                  <Tab value="b">RemoveBG</Tab>
                  <Tab value="c">Hover me</Tab>
                </TabsBar>
              </Tabs>
            </div>
          ))}
        </div>
      </section>

      <h2>
        With <code>renderGlider</code>
      </h2>
      <p>The glider should animate to the clicked tab and stay aligned.</p>
      <section>
        <div className="column">
          <h3>Off (default)</h3>
          <Tabs defaultTab="a">
            <TabsBar>
              <Tab value="a">First</Tab>
              <Tab value="b">Second</Tab>
              <Tab value="c">Third</Tab>
            </TabsBar>
          </Tabs>
        </div>
        <div className="column">
          <h3>On</h3>
          <Tabs defaultTab="a">
            <TabsBar renderGlider>
              <Tab value="a">First</Tab>
              <Tab value="b">Second</Tab>
              <Tab value="c">Third</Tab>
            </TabsBar>
          </Tabs>
        </div>
        <div className="column">
          <h3>
            Custom <code>slotProps.glider</code>
          </h3>
          <code>
            <pre>
              {`
<TabsBar
  renderGlider
  slotProps={{
    glider: { style: { "--color": "coral" } as CSSProperties },
  }}
>

`}
            </pre>
          </code>
          <Tabs defaultTab="a">
            <TabsBar
              renderGlider
              slotProps={{
                glider: { style: { "--color": "coral" } as CSSProperties },
              }}
            >
              <Tab value="a">First</Tab>
              <Tab value="b">Second</Tab>
              <Tab value="c">Third</Tab>
            </TabsBar>
          </Tabs>
        </div>
        <div className="column">
          <h3>Glider + different tab widths</h3>
          <Tabs defaultTab="a">
            <TabsBar renderGlider>
              <Tab value="a">A</Tab>
              <Tab value="b">A much longer tab</Tab>
              <Tab value="c">Mid</Tab>
            </TabsBar>
          </Tabs>
        </div>
      </section>

      <h2>
        With <code>removeBg</code>
      </h2>
      <section>
        <div className="column">
          <h3>Default background</h3>
          <Tabs defaultTab="a">
            <TabsBar>
              <Tab value="a">First</Tab>
              <Tab value="b">Second</Tab>
            </TabsBar>
          </Tabs>
        </div>
        <div className="column">
          <h3>removeBg</h3>
          <Tabs defaultTab="a">
            <TabsBar removeBg>
              <Tab value="a">First</Tab>
              <Tab value="b">Second</Tab>
            </TabsBar>
          </Tabs>
        </div>
        <div className="column">
          <h3>removeBg + glider</h3>
          <Tabs defaultTab="a">
            <TabsBar removeBg renderGlider>
              <Tab value="a">First</Tab>
              <Tab value="b">Second</Tab>
            </TabsBar>
          </Tabs>
        </div>
      </section>

      <h2>Selected state</h2>
      <p>Clicking a tab updates the active tab readout below the bar.</p>
      <section>
        <div className="column">
          <Tabs defaultTab="a">
            <TabsBar renderGlider>
              <Tab value="a">First</Tab>
              <Tab value="b">Second</Tab>
              <Tab value="c">Third</Tab>
            </TabsBar>
            <ActiveTab />
          </Tabs>
        </div>
      </section>

      <h2>Disabled</h2>
      <p>Disabled tabs should not be selectable and should not fire onClick.</p>
      <section>
        <div className="column">
          <Tabs defaultTab="a">
            <TabsBar renderGlider>
              <Tab value="a">Enabled</Tab>
              <Tab value="b" disabled>
                Disabled
              </Tab>
              <Tab value="c">Enabled</Tab>
            </TabsBar>
            <ActiveTab />
          </Tabs>
        </div>
        <div className="column">
          <h3>Disabled with href</h3>
          <Tabs defaultTab="a">
            <TabsBar>
              <Tab value="a" as="a" href="#a">
                Link
              </Tab>
              <Tab value="b" as="a" href="#b" disabled>
                Disabled link
              </Tab>
            </TabsBar>
          </Tabs>
        </div>
      </section>

      <h2>Adornments</h2>
      <p>
        <code>startAdornment</code> and <code>endAdornment</code> render inside
        the tab. Style them via <code>slotProps</code>.
      </p>
      <section>
        <div className="column">
          <h3>Start / end</h3>
          <Tabs defaultTab="a">
            <TabsBar renderGlider>
              <Tab value="a" startAdornment={<CubicsUIFavicon />}>
                Start
              </Tab>
              <Tab value="b" endAdornment={<span>★</span>}>
                End
              </Tab>
              <Tab
                value="c"
                startAdornment={<span>⚙</span>}
                endAdornment={<span>3</span>}
              >
                Both
              </Tab>
            </TabsBar>
          </Tabs>
        </div>
        <div className="column">
          <h3>
            <code>slotProps</code>
          </h3>
          <Tabs defaultTab="a">
            <TabsBar>
              <Tab
                value="a"
                startAdornment={<span>★</span>}
                slotProps={{
                  startAdornment: { className: "custom_adornment" },
                }}
              >
                Custom start slot
              </Tab>
              <Tab
                value="b"
                endAdornment={<span>★</span>}
                slotProps={{
                  endAdornment: { className: "custom_adornment" },
                }}
              >
                Custom end slot
              </Tab>
            </TabsBar>
          </Tabs>
        </div>
      </section>
      <h2>
        <code>fullWidth</code> on <code>{"<TabsBar/>"}</code>
      </h2>
      <section>
        <Tabs defaultTab="two">
          <TabsBar fullWidth>
            {Array.from({ length: 50 }).map((_, i) => (
              <Tab key={i} value={`Tab-${i + 1}`}>
                {`Tab ${i + 1}`}
              </Tab>
            ))}
          </TabsBar>
        </Tabs>
      </section>
      <h2>
        Polymorphic <code>as</code>
      </h2>
      <p>
        Renders as a <code>div</code> by default. Use <code>as</code> to swap
        the element, e.g. <code>button</code> or <code>a</code> with{" "}
        <code>href</code>.
      </p>
      <section>
        <div className="column">
          <Tabs defaultTab="div">
            <TabsBar renderGlider>
              <Tab value="div">Default (div)</Tab>
              <Tab value="button" as="button">
                Button
              </Tab>
              <Tab value="anchor" as="a" href="#anchor">
                Anchor
              </Tab>
            </TabsBar>
            <ActiveTab />
          </Tabs>
        </div>
      </section>

      <h2>onClick</h2>
      <p>
        Fires after the tab is selected. Clicks so far: <code>{clicks}</code>
      </p>
      <section>
        <div className="column">
          <Tabs defaultTab="a">
            <TabsBar renderGlider>
              <Tab value="a" onClick={() => setClicks((c) => c + 1)}>
                Counts
              </Tab>
              <Tab value="b" onClick={() => setClicks((c) => c + 1)}>
                Counts
              </Tab>
              <Tab value="c">Doesn&apos;t count</Tab>
            </TabsBar>
          </Tabs>
        </div>
      </section>

      <h2>Overflow / scrollIntoView</h2>
      <p>
        Selecting a tab scrolls it into view (centered) inside a narrow,
        scrollable bar. The glider should track scroll offset correctly.
      </p>
      <section>
        <div className="column" style={{ width: "260px" }}>
          <Tabs defaultTab="1">
            <TabsBar renderGlider style={{ overflowX: "auto" }}>
              {Array.from({ length: 12 }, (_, i) => (
                <Tab key={i} value={String(i + 1)}>
                  Tab {i + 1}
                </Tab>
              ))}
            </TabsBar>
            <ActiveTab />
          </Tabs>
        </div>
      </section>

      <h2>Extra props</h2>
      <p>
        Extra props on <code>TabsBar</code> (e.g. <code>aria-label</code>,{" "}
        <code>className</code>, <code>id</code>) are forwarded to the{" "}
        <code>nav</code>.
      </p>
      <section>
        <div className="column">
          <Tabs defaultTab="a">
            <TabsBar
              id="forwarded-nav"
              aria-label="Forwarded props"
              className="forwarded_class"
            >
              <Tab value="a" data-testid="tab-a">
                First
              </Tab>
              <Tab value="b" data-testid="tab-b">
                Second
              </Tab>
            </TabsBar>
          </Tabs>
        </div>
      </section>

      <h2>Background check</h2>
      <p>
        Confirms hover/selected mix colors read correctly against different
        backgrounds.
      </p>
      <section>
        <div className="column">
          <h3>On plain page background</h3>
          <Tabs defaultTab="a">
            <TabsBar renderGlider>
              <Tab value="a">Selected</Tab>
              <Tab value="b">Item</Tab>
            </TabsBar>
          </Tabs>
        </div>
        <div className="column rgb_bg">
          <h3>On RGB</h3>
          <Tabs defaultTab="a">
            <TabsBar renderGlider>
              <Tab value="a">Selected</Tab>
              <Tab value="b">Item</Tab>
            </TabsBar>
          </Tabs>
        </div>
        <div className="column image_bg">
          <h3>On image</h3>
          <Tabs defaultTab="a">
            <TabsBar renderGlider>
              <Tab value="a">Selected</Tab>
              <Tab value="b">Item</Tab>
            </TabsBar>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
