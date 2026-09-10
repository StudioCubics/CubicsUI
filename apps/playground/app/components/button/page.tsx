import { Button } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";
import Link from "next/link";
import { AsLink } from "./asLink";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<Button/>"}</code>
      </h1>

      <h2>Variants</h2>
      <section>
        <div className={"row"}>
          <div className={"column"}>
            <Button>Default</Button>
          </div>
          <hr />
          <div className={"column"}>
            <Button variant="outlined">Outlined</Button>
          </div>
          <hr />
          <div className={"column"}>
            <Button variant="contained">Contained</Button>
          </div>
        </div>
      </section>

      <h2>Sizes</h2>
      <section>
        <h5>Default</h5>
        <div className={"row"}>
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
        <h5>Outlined</h5>
        <div className={"row"}>
          <Button variant="outlined" size="xs">
            Extra small
          </Button>
          <Button variant="outlined" size="sm">
            Small
          </Button>
          <Button variant="outlined" size="md">
            Medium
          </Button>
          <Button variant="outlined" size="lg">
            Large
          </Button>
          <Button variant="outlined" size="xl">
            Extra Large
          </Button>
        </div>
        <h5>Contained</h5>
        <div className={"row"}>
          <Button variant="contained" size="xs">
            Extra small
          </Button>
          <Button variant="contained" size="sm">
            Small
          </Button>
          <Button variant="contained" size="md">
            Medium
          </Button>
          <Button variant="contained" size="lg">
            Large
          </Button>
          <Button variant="contained" size="xl">
            Extra Large
          </Button>
        </div>
      </section>

      <h2>Colors</h2>
      <section>
        <p>
          The main colors that should be used most of the time are{" "}
          <b>default</b>, <b>primary</b>, <b>secondary</b> and <b>error</b>. Use
          the rest only if necessary or the other three are not suitable.
        </p>
        <h5>Default</h5>
        <div className={"row"}>
          <Button>Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="tertiary">Tertiary</Button>
          <Button color="error">Error</Button>
          <Button color="warn">Warn</Button>
          <Button color="success">Success</Button>
        </div>
        <h5>Outlined</h5>
        <div className={"row"}>
          <Button variant="outlined">Default</Button>
          <Button variant="outlined" color="primary">
            Primary
          </Button>
          <Button variant="outlined" color="secondary">
            Secondary
          </Button>
          <Button variant="outlined" color="tertiary">
            Tertiary
          </Button>
          <Button variant="outlined" color="error">
            Error
          </Button>
          <Button variant="outlined" color="warn">
            Warn
          </Button>
          <Button variant="outlined" color="success">
            Success
          </Button>
        </div>
        <h5>Contained</h5>
        <div className={"row"}>
          <Button variant="contained">Default</Button>
          <Button variant="contained" color="primary">
            Primary
          </Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="contained" color="tertiary">
            Tertiary
          </Button>
          <Button variant="contained" color="error">
            Error
          </Button>
          <Button variant="contained" color="warn">
            Warn
          </Button>
          <Button variant="contained" color="success">
            Success
          </Button>
        </div>
      </section>

      <h2>Icon Button</h2>
      <section>
        <p>Use this for buttons containing only icons</p>
        <h5>Default</h5>
        <div className={"row"}>
          <div className={"column"}>
            <h6>Extra Small</h6>
            <Button icon size="xs">
              <CubicsUIFavicon width={16} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Small</h6>
            <Button icon size="sm">
              <CubicsUIFavicon width={18} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Medium</h6>
            <Button icon size="md">
              <CubicsUIFavicon width={24} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Large</h6>
            <Button icon size="lg">
              <CubicsUIFavicon width={28} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Extra Large</h6>
            <Button icon size="xl">
              <CubicsUIFavicon width={32} />
            </Button>
          </div>
        </div>
        <h5>Outlined</h5>
        <div className={"row"}>
          <div className={"column"}>
            <h6>Extra Small</h6>
            <Button icon variant="outlined" size="xs">
              <CubicsUIFavicon width={16} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Small</h6>
            <Button icon variant="outlined" size="sm">
              <CubicsUIFavicon width={18} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Medium</h6>
            <Button icon variant="outlined" size="md">
              <CubicsUIFavicon width={24} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Large</h6>
            <Button icon variant="outlined" size="lg">
              <CubicsUIFavicon width={28} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Extra Large</h6>
            <Button icon variant="outlined" size="xl">
              <CubicsUIFavicon width={32} />
            </Button>
          </div>
        </div>
        <h5>Contained</h5>
        <div className={"row"}>
          <div className={"column"}>
            <h6>Extra Small</h6>
            <Button icon variant="contained" size="xs">
              <CubicsUIFavicon width={16} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Small</h6>
            <Button icon variant="contained" size="sm">
              <CubicsUIFavicon width={18} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Medium</h6>
            <Button icon variant="contained" size="md">
              <CubicsUIFavicon width={24} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Large</h6>
            <Button icon variant="contained" size="lg">
              <CubicsUIFavicon width={28} />
            </Button>
          </div>
          <div className={"column"}>
            <h6>Extra Large</h6>
            <Button icon variant="contained" size="xl">
              <CubicsUIFavicon width={32} />
            </Button>
          </div>
        </div>
      </section>

      <h2>With Icons</h2>
      <section>
        <h5>Default</h5>
        <div className={"row"}>
          <Button startIcon={<CubicsUIFavicon />}>With Start Icon</Button>
          <Button endIcon={<CubicsUIFavicon />}>With End Icon</Button>
          <Button startIcon={<CubicsUIFavicon />} endIcon={<CubicsUIFavicon />}>
            With Both Icons
          </Button>
        </div>
        <h5>Outlined</h5>
        <div className={"row"}>
          <Button variant="outlined" startIcon={<CubicsUIFavicon />}>
            With Start Icon
          </Button>
          <Button variant="outlined" endIcon={<CubicsUIFavicon />}>
            With End Icon
          </Button>
          <Button
            variant="outlined"
            startIcon={<CubicsUIFavicon />}
            endIcon={<CubicsUIFavicon />}
          >
            With Both Icons
          </Button>
        </div>
        <h5>Contained</h5>
        <div className={"row"}>
          <Button variant="contained" startIcon={<CubicsUIFavicon />}>
            With Start Icon
          </Button>
          <Button variant="contained" endIcon={<CubicsUIFavicon />}>
            With End Icon
          </Button>
          <Button
            variant="contained"
            startIcon={<CubicsUIFavicon />}
            endIcon={<CubicsUIFavicon />}
          >
            With Both Icons
          </Button>
        </div>
      </section>

      <h2>Full Width</h2>
      <section>
        <p>
          Use this when button should expand to the full width of the container
        </p>
        <h5>Default</h5>
        <Button fullWidth>Full Width Button</Button>
        <h5>Outlined</h5>
        <Button variant="outlined" fullWidth>
          Full Width Button
        </Button>
        <h5>Contained</h5>
        <Button variant="contained" fullWidth>
          Full Width Button
        </Button>
        <h5>Full Width with icon</h5>
        <Button variant="contained" startIcon={<CubicsUIFavicon />} fullWidth>
          Full Width Button
        </Button>
        <Button variant="contained" endIcon={<CubicsUIFavicon />} fullWidth>
          Full Width Button
        </Button>
      </section>

      <h2>Disabled Button</h2>
      <section>
        <div className="row">
          <Button disabled>Disabled</Button>
          <Button disabled variant="outlined">
            Disabled
          </Button>
          <Button disabled variant="contained">
            Disabled
          </Button>
        </div>
      </section>

      <h2>
        Button as a <code>{"<Link/>"}</code>
      </h2>
      <AsLink />
      <h2>Background Check</h2>
      <section className="rgb_bg">
        <div className={"row"}>
          <div className={"column"}>
            <Button>Default</Button>
          </div>
          <hr />
          <div className={"column"}>
            <Button variant="outlined">Outlined</Button>
          </div>
          <hr />
          <div className={"column"}>
            <Button variant="contained">Contained</Button>
          </div>
        </div>
      </section>
      <section className="image_bg">
        <div className={"row"}>
          <div className={"column"}>
            <Button>Default</Button>
          </div>
          <hr />
          <div className={"column"}>
            <Button variant="outlined">Outlined</Button>
          </div>
          <hr />
          <div className={"column"}>
            <Button variant="contained">Contained</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
