import { Button, Card, TextInput } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";
import { HybridInput } from "./hybridInput";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<TextInput/>"}</code>
      </h1>
      <h2>Labels</h2>
      <section>
        <div className={"column"}>
          <h3>
            <code>{"<TextInput/>"}</code> with label
          </h3>
          <TextInput label="Enter your first name" />
          <TextInput label="This is a really long label, a really really long label" />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>{"<TextInput/>"}</code> without label
          </h3>
          <p>
            You have to use <code>placeholder</code> prop to do labelling
          </p>
          <TextInput placeholder="Enter your first name" />
          <TextInput placeholder="This is a really long label, how long you say? Really long." />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            A required <code>{"<TextInput/>"}</code>
          </h3>
          <TextInput required label="Enter your first name" />
        </div>
      </section>

      <h2>Hybrid input</h2>
      <HybridInput />

      <h2>Sizes</h2>
      <section>
        <TextInput label="Extra Small" size="xs" />
        <TextInput label="Small" size="sm" />
        <TextInput label="Medium" size="md" />
        <TextInput label="Large" size="lg" />
        <TextInput label="Extra Large" size="xl" />
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={"column"}>
          <TextInput label="On top of a card" />
          <TextInput
            label="On top of a card"
            placeholder="This is a placeholder"
          />
        </Card>
        <h3>On RGB</h3>
        <div className={"column rgb_bg"}>
          <TextInput label="On top of rgb colors" />
          <TextInput
            label="On top of rgb colors"
            placeholder="This is a placeholder"
          />
        </div>
        <h3>On Image</h3>
        <div className={"column image_bg"}>
          <TextInput label="On top of image" />
          <TextInput
            label="On top of image"
            placeholder="This is a placeholder"
          />
        </div>
      </section>

      <h2>Helper Text</h2>
      <section>
        <div className={"column"}>
          <h3>Normal Helper text</h3>
          <TextInput
            label="Enter address"
            helperText="Make sure to add in format city, state, country"
          />
          <TextInput
            label="TextInput with multiple helper texts"
            helperText={["Do this", "and then that"]}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>When Errored</h3>
          <TextInput
            label="Errored TextInput"
            error="Make sure to check the TextInput here"
          />
          <TextInput
            label="Errored TextInput with multiple errors"
            error={["This textinput has", "multiple errors"]}
          />
        </div>
      </section>

      <h2>
        With <code>fullWidth</code>{" "}
      </h2>
      <section>
        <TextInput label="TextInput with fullWidth" fullWidth />
        <TextInput
          label="TextInput with fullWidth and helper text"
          fullWidth
          helperText={["This is helper text"]}
        />
        <TextInput
          label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus minima exercitationem ea quis quo vitae harum libero possimus, odio impedit quibusdam eos iure consequatur fugiat repellendus? Pariatur, repellendus atque!,Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus minima exercitationem ea quis quo vitae harum libero possimus, odio impedit quibusdam eos iure consequatur fugiat repellendus? Pariatur, repellendus atque!"
          fullWidth
        />
        <TextInput
          startAdornment={<CubicsUIFavicon />}
          endAdornment={<CubicsUIFavicon />}
          label="TextInput with fullWidth and icons"
          fullWidth
        />
      </section>

      <h2>
        With <code>disablePadding</code>
      </h2>
      <section>
        <p>
          Use to remove the padding of the inputWrapper, mainly used when using{" "}
          <code>{"<Button/>"}</code> for start or end icons
        </p>
        <TextInput
          disablePadding
          label="Without icon is not supposed to be used"
        />
        <TextInput
          label="Normal Icon Without disable padding"
          startAdornment={<CubicsUIFavicon />}
        />
        <TextInput
          label="Button Icon Without disable padding"
          startAdornment={
            <Button icon>
              <CubicsUIFavicon />
            </Button>
          }
        />

        <TextInput
          disablePadding
          label="Button Start Icon with disable padding"
          startAdornment={
            <Button icon>
              <CubicsUIFavicon />
            </Button>
          }
        />
        <TextInput
          disablePadding
          label="Button End Icon with disable padding"
          endAdornment={
            <Button variant="outlined" icon>
              <CubicsUIFavicon />
            </Button>
          }
        />
        <TextInput
          disablePadding
          label="Button Both Icons with disable padding"
          startAdornment={
            <Button variant="contained" icon>
              <CubicsUIFavicon />
            </Button>
          }
          endAdornment={
            <Button variant="contained" icon>
              <CubicsUIFavicon />
            </Button>
          }
        />
      </section>

      <h2>Disabled Input</h2>
      <section>
        <TextInput label="Disabled TextInput" disabled />
        <TextInput label="Enabled TextInput" />
        <TextInput
          label="Disabled TextInput with default value"
          defaultValue={"This is disabled"}
          disabled
        />
      </section>
    </main>
  );
}
