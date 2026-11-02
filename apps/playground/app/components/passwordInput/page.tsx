import { Button, Card, PasswordInput } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";
import { StrengthMeter } from "./strengthMeter";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<PasswordInput/>"}</code>
      </h1>
      <h2>
        With <code>enableStrengthMeter</code>
      </h2>
      <StrengthMeter />

      <h2>
        With <code>disableVisibilityToggle</code>
      </h2>
      <section>
        <PasswordInput label="Visibility Toggle Enabled" />
        <PasswordInput
          label="Visibility Toggle Disabled"
          disableVisibilityToggle
        />
      </section>

      <h2>Labels</h2>
      <section>
        <div className={"column"}>
          <h3>
            <code>{"<PasswordInput/>"}</code> with label
          </h3>
          <PasswordInput label="Enter your password" />
          <PasswordInput label="This is a really long label, a really really long label" />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>{"<PasswordInput/>"}</code> without label
          </h3>
          <p>
            You have to use <code>placeholder</code> prop to do labelling
          </p>
          <PasswordInput placeholder="Enter your password" />
          <PasswordInput placeholder="This is a really long label, how long you say? Really long." />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            A required <code>{"<PasswordInput/>"}</code>
          </h3>
          <PasswordInput required label="Enter your password" />
        </div>
      </section>

      <h2>Sizes</h2>
      <section>
        <PasswordInput label="Extra Small" size="xs" />
        <PasswordInput label="Small" size="sm" />
        <PasswordInput label="Medium" size="md" />
        <PasswordInput label="Large" size="lg" />
        <PasswordInput label="Extra Large" size="xl" slotProps={{}} />
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={"column"}>
          <PasswordInput label="On top of a card" />
          <PasswordInput
            label="On top of a card"
            placeholder="This is a placeholder"
          />
        </Card>
        <h3>On RGB</h3>
        <div className={"column rgb_bg"}>
          <PasswordInput label="On top of rgb colors" />
          <PasswordInput
            label="On top of rgb colors"
            placeholder="This is a placeholder"
          />
        </div>
        <h3>On Image</h3>
        <div className={"column image_bg"}>
          <PasswordInput label="On top of image" />
          <PasswordInput
            label="On top of image"
            placeholder="This is a placeholder"
          />
        </div>
      </section>

      <h2>Helper Text</h2>
      <section>
        <div className={"column"}>
          <h3>Normal Helper text</h3>
          <PasswordInput
            label="Enter address"
            helperText="Make sure to add in format city, state, country"
          />
          <PasswordInput
            label="PasswordInput with multiple helper texts"
            helperText={["Do this", "and then that"]}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>When Errored</h3>
          <PasswordInput
            label="Errored PasswordInput"
            error="Make sure to check the PasswordInput here"
          />
          <PasswordInput
            label="Errored PasswordInput with multiple errors"
            error={["This passwordInput has", "multiple errors"]}
          />
        </div>
      </section>

      <h2>
        With <code>fullWidth</code>{" "}
      </h2>
      <section>
        <PasswordInput label="PasswordInput with fullWidth" fullWidth />
        <PasswordInput
          label="PasswordInput with fullWidth and helper text"
          fullWidth
          helperText={["This is helper text"]}
        />
        <PasswordInput
          label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus minima exercitationem ea quis quo vitae harum libero possimus, odio impedit quibusdam eos iure consequatur fugiat repellendus? Pariatur, repellendus atque!,Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus minima exercitationem ea quis quo vitae harum libero possimus, odio impedit quibusdam eos iure consequatur fugiat repellendus? Pariatur, repellendus atque!"
          fullWidth
        />
        <PasswordInput
          startAdornment={<CubicsUIFavicon />}
          endAdornment={<CubicsUIFavicon />}
          label="PasswordInput with fullWidth and icons"
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
        <PasswordInput
          disablePadding
          label="Without icon is not supposed to be used"
        />
        <PasswordInput
          label="Normal Icon Without disable padding"
          startAdornment={<CubicsUIFavicon />}
        />
        <PasswordInput
          label="Button Icon Without disable padding"
          startAdornment={
            <Button icon>
              <CubicsUIFavicon />
            </Button>
          }
        />

        <PasswordInput
          disablePadding
          label="Button Start Icon with disable padding"
          startAdornment={
            <Button icon>
              <CubicsUIFavicon />
            </Button>
          }
        />
        <PasswordInput
          disablePadding
          label="Button End Icon with disable padding"
          endAdornment={
            <Button variant="outlined" icon>
              <CubicsUIFavicon />
            </Button>
          }
        />
        <PasswordInput
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
        <PasswordInput label="Disabled PasswordInput" disabled />
        <PasswordInput label="Enabled PasswordInput" />
        <PasswordInput
          label="Disabled PasswordInput with default value"
          defaultValue={"This is disabled"}
          disabled
        />
      </section>
    </main>
  );
}
