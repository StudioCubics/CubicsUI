import { Card, Logo } from "@cubicsui/components";
import { ToggleLogo } from "./toggleLogo";
import { logoBaseProps, altLogoBaseProps } from "./logoAssets";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<Logo/>"}</code>
      </h1>

      <h2>Variants</h2>
      <section>
        <div className={"column"}>
          <h3>
            Default <code>{"<Logo/>"}</code>
          </h3>
          <p>
            Uses <code>viewBox</code>, renders both groups
          </p>
          <Logo {...logoBaseProps} height={50} />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            With <code>onlyFavicon</code>
          </h3>
          <p>
            Switches to <code>faviconViewBox</code>, text group is scaled to 0
          </p>
          <Logo {...logoBaseProps} onlyFavicon height={50} />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            With <code>onlyText</code>
          </h3>
          <p>
            Switches to <code>textViewBox</code>, favicon group is scaled to 0
          </p>
          <Logo {...logoBaseProps} onlyText height={50} />
        </div>
      </section>

      <h2>Transition Check</h2>
      <ToggleLogo />

      <h2>Sizes</h2>
      <section>
        <Logo {...logoBaseProps} height={16} />
        <Logo {...logoBaseProps} height={24} />
        <Logo {...logoBaseProps} height={32} />
        <Logo {...logoBaseProps} height={48} />
        <Logo {...logoBaseProps} height={72} />
      </section>

      <h2>Color Inheritance</h2>
      <section>
        <p>
          Both groups are filled with <code>currentcolor</code>
        </p>
        <div className={"column"} style={{ color: "red" }}>
          <Logo {...logoBaseProps} height={40} />
        </div>
        <div className={"column"} style={{ color: "var(--primary)" }}>
          <Logo {...logoBaseProps} height={40} />
        </div>
        <div className={"column"} style={{ color: "currentcolor" }}>
          <Logo {...logoBaseProps} height={40} />
        </div>
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={"column"}>
          <Logo {...logoBaseProps} height={40} />
          <Logo {...logoBaseProps} onlyFavicon height={40} />
        </Card>
        <h3>On RGB</h3>
        <div className={"column rgb_bg"}>
          <Logo {...logoBaseProps} height={40} />
          <Logo {...logoBaseProps} onlyFavicon height={40} />
        </div>
        <h3>On Image</h3>
        <div className={"column image_bg"}>
          <Logo {...logoBaseProps} height={40} />
          <Logo {...logoBaseProps} onlyFavicon height={40} />
        </div>
      </section>

      <h2>
        With <code>faviconClass</code> and <code>textClass</code>
      </h2>
      <section>
        <Logo {...logoBaseProps} faviconClass="favicon_demo" height={50} />
        <Logo {...logoBaseProps} textClass="text_demo" height={50} />
        <Logo
          {...logoBaseProps}
          faviconClass="favicon_demo"
          textClass="text_demo"
          height={50}
        />
      </section>

      <h2>Other Marks</h2>
      <p>Checking arbitrary favicon/text props render correctly</p>
      <section>
        <div className={"column"}>
          <h3>Play-button favicon + &quot;LOGO&quot; wordmark</h3>
          <Logo {...altLogoBaseProps} height={50} />
          <Logo {...altLogoBaseProps} onlyFavicon height={50} />
          <Logo {...altLogoBaseProps} onlyText height={50} />
        </div>
      </section>
    </main>
  );
}
