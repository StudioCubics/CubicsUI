import { Card, ThemeToggle } from "@cubicsui/components";
import { Controlled } from "./controlled";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<ThemeToggle/>"}</code>
      </h1>
      <p>
        The toggling toggles from{" "}
        {`"light" -> "system"(if enableSystem is true in ThemeProvider) ->"dark"`}{" "}
        and then back again
      </p>

      <h2>Variants</h2>
      <section>
        <div className={"column"}>
          <h3>
            icon {"("}default{")"}
          </h3>
          <ThemeToggle variant="icon" />
        </div>
        <hr />
        <div className={"column"}>
          <h3>full</h3>
          <ThemeToggle variant="full" />
        </div>
        <hr />
        <div className={"column"}>
          <h3>list</h3>
          <ThemeToggle variant="list" />
        </div>
      </section>

      <h2>
        With <code>resolveSystem</code>
      </h2>
      <section>
        <div className={"column"}>
          <h3>resolveSystem off (default)</h3>
          <p>
            Clicking system mode always goes to <code>dark</code>
          </p>
          <ThemeToggle variant="full" />
        </div>
        <hr />
        <div className={"column"}>
          <h3>resolveSystem on</h3>
          <p>
            Clicking system mode skips to the opposite of the resolved system
            theme
          </p>
          <ThemeToggle variant="full" resolveSystem />
        </div>
      </section>

      <h2>Custom themeObject</h2>
      <section>
        <div className={"column"}>
          <h3>Custom text</h3>
          <ThemeToggle
            variant="full"
            themeObject={{
              light: { text: "Day" },
              dark: { text: "Night" },
              system: { text: "Auto" },
            }}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>Custom icon</h3>
          <ThemeToggle
            variant="icon"
            themeObject={{
              light: { icon: <span>🌙</span> },
              dark: { icon: <span>☀️</span> },
              system: { icon: <span>🖥️</span> },
            }}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>List variant with custom themeObject</h3>
          <ThemeToggle
            variant="list"
            themeObject={{
              light: { text: "Day", icon: <span>☀️</span> },
              dark: { text: "Night", icon: <span>🌙</span> },
              system: { text: "Auto", icon: <span>🖥️</span> },
            }}
          />
        </div>
      </section>

      <h2>Controlled mode</h2>
      <section>
        <p>
          Passing <code>currentTheme</code> puts <code>{"<ThemeToggle/>"}</code>{" "}
          in controlled mode. It no longer calls the internal
          ThemeProvider&apos;s <code>setTheme</code>, you have to supply{" "}
          <code>onClick</code> for each theme yourself.
        </p>
        <Controlled />
      </section>

      <h2>
        With <code>slotProps</code>
      </h2>
      <section>
        <div className={"column"}>
          <h3>
            Custom <code>button</code> slotProps
          </h3>
          <ThemeToggle
            variant="full"
            slotProps={{ button: { variant: "outlined", size: "lg" } }}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            Custom <code>card</code> slotProps on list variant
          </h3>
          <ThemeToggle
            variant="list"
            slotProps={{ card: { variant: "outlined" } }}
          />
        </div>
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={"column"}>
          <ThemeToggle variant="icon" />
          <ThemeToggle variant="full" />
        </Card>
        <h3>On RGB</h3>
        <div className={"column rgb_bg"}>
          <ThemeToggle variant="icon" />
          <ThemeToggle variant="full" />
        </div>
        <h3>On Image</h3>
        <div className={"column image_bg"}>
          <ThemeToggle variant="icon" />
          <ThemeToggle variant="full" />
        </div>
      </section>
    </main>
  );
}
