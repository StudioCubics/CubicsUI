import { Card, Switch } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";
import { cn } from "@cubicsui/utils";
import { HybridInput } from "./hybridInput";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<Switch/>"}</code>
      </h1>
      <h2>Solo</h2>
      <section>
        <Switch label="Solo Switch 1" />
        <Switch label="Solo Switch 2" />
      </section>

      <h2>Hybrid Input</h2>
      <HybridInput />

      <h2>Sizes</h2>
      <section>
        <Switch label="Extra small" size="xs" />
        <Switch label="Small" size="sm" />
        <Switch label="Medium" size="md" />
        <Switch label="Large" size="lg" />
        <Switch label="Extra Large" size="xl" />
      </section>

      <h2>Colors</h2>
      <section>
        <Switch label="Default" />
        <Switch label="Primary" color="primary" />
        <Switch label="Secondary" color="secondary" />
        <Switch label="Tertiary" color="tertiary" />
        <Switch label="Error" color="error" />
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={"column"}>
          <Switch label="On top of a card" />
          <Switch label="On top of a card" />
        </Card>
        <h3>On RGB</h3>
        <div className={cn("rgb_bg", "column")}>
          <Switch label="On top of rgb colors" />
          <Switch label="On top of rgb colors" />
        </div>
        <h3>On Image</h3>
        <div className={cn("image_bg", "column")}>
          <Switch label="On top of image" />
          <Switch label="On top of image" />
        </div>
      </section>

      <h2>
        With <code>helperText</code>
      </h2>
      <section>
        <div className={"column"}>
          <h3>Normal Helper text</h3>
          <Switch
            label="Switch with helper text"
            helperText="String type helper text"
          />
          <Switch
            label="Switch with multiple helper texts"
            helperText={["Do this", "and then that"]}
          />
          <Switch
            size="lg"
            label="Switch with multiple helper texts"
            helperText={["Do this", "and then that"]}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>When Errored</h3>
          <Switch
            label="Errored Switch"
            error="Make sure to check the Switch here"
          />
          <Switch
            label="Errored Switch with multiple errors"
            error={["This Switch has", "multiple errors"]}
          />
        </div>
      </section>

      <h2>With track and thumb icons</h2>
      <section>
        <Switch
          label="With off and on icons on track"
          trackIcons={{ on: <>🌙</>, off: <>🌞</> }}
        />
        <Switch
          label="With single icon on track"
          trackIcons={<CubicsUIFavicon />}
        />
        <Switch
          label="With off and on icons on thumb"
          thumbIcons={{ off: <>🌙</>, on: <>🌞</> }}
        />
        <Switch
          label="With single icon on thumb"
          thumbIcons={<CubicsUIFavicon />}
        />
        <Switch
          label="With off and on icons on both track and thumb"
          trackIcons={{ on: <>🌙</>, off: <>🌞</> }}
          thumbIcons={{ off: <>🌙</>, on: <>🌞</> }}
        />
        <Switch
          label="With single icon on both track and thumb"
          trackIcons={<CubicsUIFavicon />}
          thumbIcons={<CubicsUIFavicon />}
        />
      </section>

      <h2>
        Disabled <code>{"<Switch/>"}</code>
      </h2>
      <section>
        <Switch label="Non Disabled Switch" />
        <Switch label="Disabled Checked Switch" disabled defaultChecked />
        <Switch label="Disabled Switch" disabled />
      </section>
    </main>
  );
}
