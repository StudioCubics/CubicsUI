import { Card, Chip } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";
import { cn } from "@cubicsui/utils";
import { OnClose } from "./onClose";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<Chip/>"}</code>
      </h1>

      <h2>Variants</h2>
      <section>
        <div className="row">
          <Chip>Contained</Chip>
          <Chip variant="outlined">Outlined</Chip>
        </div>
      </section>

      <h2>Sizes</h2>
      <section>
        <div className="row">
          <Chip size="sm">Small</Chip>
          <Chip size="md">
            Medium {"("}Default{")"}
          </Chip>
          <Chip size="lg">Large</Chip>
        </div>
      </section>

      <h2>Colors</h2>
      <section>
        <div className="column">
          <h3>Contained</h3>
          <hr />
          <div className="row">
            <Chip>Default</Chip>
            <Chip color="primary">Primary</Chip>
            <Chip color="secondary">Secondary</Chip>
            <Chip color="tertiary">Tertiary</Chip>
            <Chip color="error">Error</Chip>
            <Chip color="warn">Warn</Chip>
            <Chip color="success">Success</Chip>
          </div>
        </div>

        <div className="column">
          <h3>Outlined</h3>
          <hr />
          <div className="row">
            <Chip variant="outlined">Default</Chip>
            <Chip variant="outlined" color="primary">
              Primary
            </Chip>
            <Chip variant="outlined" color="secondary">
              Secondary
            </Chip>
            <Chip variant="outlined" color="tertiary">
              Tertiary
            </Chip>
            <Chip variant="outlined" color="error">
              Error
            </Chip>
            <Chip variant="outlined" color="warn">
              Warn
            </Chip>
            <Chip variant="outlined" color="success">
              Success
            </Chip>
          </div>
        </div>
      </section>

      <h2>With onClosed provided a close button will render</h2>
      <OnClose />

      <h2>With SVG Icon as child</h2>
      <section>
        <p>
          SVG Components inside the chip component will size to <code>1em</code>{" "}
          width and height
        </p>
        <Chip>
          <CubicsUIFavicon /> With Icon
        </Chip>
        <Chip>
          <CubicsUIFavicon /> With Multiple Icons <CubicsUIFavicon />
        </Chip>
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={cn("column")}>
          <Chip variant="outlined">On top of a card</Chip>
          <Chip>On top of a card</Chip>
        </Card>
        <h3>On RGB</h3>
        <div className={cn("rgb_bg", "column")}>
          <Chip variant="outlined">On top of rgb colors</Chip>
          <Chip>On top of rgb colors</Chip>
        </div>
        <h3>On Image</h3>
        <div className={cn("image_bg", "column")}>
          <Chip variant="outlined">On top of image</Chip>
          <Chip>On top of image</Chip>
        </div>
      </section>
    </main>
  );
}
