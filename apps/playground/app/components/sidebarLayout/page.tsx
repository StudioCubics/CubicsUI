import { CubicsUIPlaygroundLogo } from "@/public/logos/CubicsUIPlaygroundLogo";
import {
  SidebarLayout,
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarViewport,
  SidebarToggle,
  List,
  ListItem,
  type ListProps,
} from "@cubicsui/components";
const demoHeight = 400;

function DemoNav({ size }: { size?: ListProps["size"] }) {
  return (
    <List size={size}>
      <ListItem href="#">Dashboard</ListItem>
      <ListItem href="#">Projects</ListItem>
      <ListItem href="#">Settings</ListItem>
    </List>
  );
}

function DemoViewportContent({ label }: { label: string }) {
  return (
    <div className={"column"}>
      <h4>{label}</h4>
      <p>Resize the window / toggle the sidebar to check the transitions.</p>
    </div>
  );
}

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<SidebarLayout/>"}</code>
      </h1>

      <h2>Default closesTo=&quot;shortened&quot; </h2>
      <section>
        <div className={"column"}>
          <h3>
            Shrinks parent flexbox to <code>3rem</code> when closed
          </h3>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="default-flex">
              <Sidebar>
                <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
                <SidebarFooter>Footer content</SidebarFooter>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="Default sidebar flex" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="default-float" type="float">
              <Sidebar>
                <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
                <SidebarFooter>Footer content</SidebarFooter>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="Default sidebar floating" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
      </section>

      <h2>
        <code>closesTo=&quot;full&quot;</code>
      </h2>
      <section>
        <div className={"column"}>
          <h3>type=&quot;flex&quot; (collapses to 0 width, stays in flow)</h3>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="full-flex" closesTo="full" type="flex">
              <Sidebar>
                <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
                <SidebarFooter>Footer content</SidebarFooter>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="closesTo=full, type=flex" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            type=&quot;float&quot; (overlays viewport instead of shrinking it)
          </h3>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="full-float" closesTo="full" type="float">
              <Sidebar>
                <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
                <SidebarFooter>Footer content</SidebarFooter>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="closesTo=full, type=float" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
      </section>

      <h2>Variants</h2>
      <section>
        <div className={"column"}>
          <h3>
            <code>variant=&quot;contained&quot;</code>
          </h3>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="contained" variant="contained">
              <Sidebar>
                <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="Contained" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>variant=&quot;outlined&quot;</code>
          </h3>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="outlined" variant="outlined">
              <Sidebar>
                <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="Outlined" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
      </section>

      <h2>Sizes</h2>
      <section>
        {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
          <div className={"column"} key={size}>
            <h3>size=&quot;{size}&quot;</h3>
            <div style={{ height: demoHeight }}>
              <SidebarLayout id={`size-${size}`} type="float" size={size}>
                <Sidebar>
                  <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                  <SidebarBody>
                    <DemoNav size={size} />
                  </SidebarBody>
                </Sidebar>
                <SidebarViewport>
                  <SidebarLayout id={`size-inner-${size}`} size={size}>
                    <Sidebar>
                      <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                      <SidebarBody>
                        <DemoNav size={size} />
                      </SidebarBody>
                    </Sidebar>
                    <SidebarViewport>
                      <DemoViewportContent label={`size=${size}`} />
                    </SidebarViewport>
                  </SidebarLayout>
                </SidebarViewport>
              </SidebarLayout>
            </div>
          </div>
        ))}
      </section>

      <h2>
        <code>defaultClosed</code>
      </h2>
      <section>
        <div className={"column"}>
          <p>
            Check that this reads from its own <code>localStorage</code> key (
            <code>sidebarOpen-closed-default</code>) independently of the demos
            above
          </p>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="closed-default" defaultClosed={true}>
              <Sidebar>
                <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="defaultClosed={true}" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
      </section>

      <h2>Nested Sidebars</h2>
      <section>
        <div className={"column"}>
          <h3>
            Outer <code>id=&quot;outer&quot;</code>, inner{" "}
            <code>id=&quot;inner&quot;</code>
          </h3>
          <p>
            Verify each layout toggles independently and persists separately
          </p>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="outer">
              <Sidebar>
                <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
              </Sidebar>
              <SidebarViewport>
                <SidebarLayout id="inner" closesTo="full" type="float">
                  <Sidebar>
                    <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                    <SidebarBody>
                      <DemoNav />
                    </SidebarBody>
                  </Sidebar>
                  <SidebarViewport>
                    <DemoViewportContent label="Inner sidebar" />
                  </SidebarViewport>
                </SidebarLayout>
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
      </section>

      <h2>Header / Body / Footer</h2>
      <section>
        <div className={"column"}>
          <h3>
            <code>{"<SidebarHeader/>"}</code> without logo (toggle only)
          </h3>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="no-logo">
              <Sidebar>
                <SidebarHeader />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="No logo" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>{"<SidebarHeader/>"}</code> with custom{" "}
            <code>sidebarToggle</code>
          </h3>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="custom-toggle">
              <Sidebar>
                <SidebarHeader
                  logo={<CubicsUIPlaygroundLogo />}
                  sidebarToggle={<SidebarToggle>Toggle</SidebarToggle>}
                />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="Custom toggle" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>{"<SidebarBody showOnClose/>"}</code>
          </h3>
          <p>Content should stay visible instead of fading out when closed</p>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="body-visible">
              <Sidebar>
                <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                <SidebarBody showOnClose>
                  <DemoNav />
                </SidebarBody>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="hideOnClose=false" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>{"<SidebarFooter hideOnClose={false}/>"}</code>
          </h3>
          <div style={{ height: demoHeight }}>
            <SidebarLayout id="footer-visible">
              <Sidebar>
                <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
                <SidebarBody>
                  <DemoNav />
                </SidebarBody>
                <SidebarFooter showOnClose>Always shown</SidebarFooter>
              </Sidebar>
              <SidebarViewport>
                <DemoViewportContent label="Footer hideOnClose=false" />
              </SidebarViewport>
            </SidebarLayout>
          </div>
        </div>
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Image</h3>
        <div className={"sidebarDemoFrame image_bg"}>
          <SidebarLayout id="on-image">
            <Sidebar>
              <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
              <SidebarBody>
                <DemoNav />
              </SidebarBody>
            </Sidebar>
            <SidebarViewport>
              <DemoViewportContent label="On top of image" />
            </SidebarViewport>
          </SidebarLayout>
        </div>
        <h3>On RGB</h3>
        <div className={"sidebarDemoFrame rgb_bg"}>
          <SidebarLayout id="on-rgb">
            <Sidebar>
              <SidebarHeader logo={<CubicsUIPlaygroundLogo />} />
              <SidebarBody>
                <DemoNav />
              </SidebarBody>
            </Sidebar>
            <SidebarViewport>
              <DemoViewportContent label="On top of rgb colors" />
            </SidebarViewport>
          </SidebarLayout>
        </div>
      </section>
    </main>
  );
}
