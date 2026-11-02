import {
  Card,
  Checkbox,
  CheckboxGroupControl,
  CheckboxProvider,
} from "@cubicsui/components";
import { cn } from "@cubicsui/utils";
import { HybridInput } from "./hybridInput";
import { InGroup } from "./inGroup";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<Checkbox/>"}</code>
      </h1>
      <h2>Solo</h2>
      <section>
        <Checkbox label="Solo Checkbox 1" />
        <Checkbox label="Solo Checkbox 2" />
      </section>

      <h2>In Group</h2>
      <InGroup />

      <h2>Hybrid Input</h2>
      <HybridInput />

      <h2>Sizes</h2>
      <section>
        <Checkbox label="Extra small" size="xs" />
        <Checkbox label="Small" size="sm" />
        <Checkbox label="Medium" size="md" />
        <Checkbox label="Large" size="lg" />
        <Checkbox label="Extra Large" size="xl" />
      </section>

      <h2>Colors</h2>
      <section>
        <Checkbox label="Default" />
        <Checkbox label="Primary" color="primary" />
        <Checkbox label="Secondary" color="secondary" />
        <Checkbox label="Tertiary" color="tertiary" />
        <Checkbox label="Error" color="error" />
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={"column"}>
          <Checkbox label="On top of a card" />
          <Checkbox label="On top of a card" />
        </Card>
        <h3>On RGB</h3>
        <div className={cn("rgb_bg", "column")}>
          <Checkbox label="On top of rgb colors" />
          <Checkbox label="On top of rgb colors" />
        </div>
        <h3>On Image</h3>
        <div className={cn("image_bg", "column")}>
          <Checkbox label="On top of image" />
          <Checkbox label="On top of image" />
        </div>
      </section>

      <h2>
        With custom <code>checkedIcon</code> and <code>indeterminateIcon</code>
      </h2>
      <section>
        <Checkbox checkedIcon={<>✔</>} label="Custom checked icon" />
        <hr />
        <CheckboxProvider>
          <CheckboxGroupControl
            indeterminateIcon={<>≡</>}
            checkedIcon={<>✔</>}
            label="Custom indeterminate icon"
          />
          <Checkbox checkedIcon={<>✔</>} label="Custom checked icon" name="a" />
          <Checkbox checkedIcon={<>✔</>} label="Custom checked icon" name="b" />
          <Checkbox checkedIcon={<>✔</>} label="Custom checked icon" name="c" />
        </CheckboxProvider>
      </section>

      <h2>
        With <code>helperText</code>
      </h2>
      <section>
        <div className={"column"}>
          <h3>Normal Helper text</h3>
          <Checkbox
            label="Checkbox with helper text"
            helperText="String type helper text"
          />
          <Checkbox
            label="Checkbox with multiple helper texts"
            helperText={["Do this", "and then that"]}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>When Errored</h3>
          <Checkbox
            label="Errored Checkbox"
            error="Make sure to check the Checkbox here"
          />
          <Checkbox
            label="Errored Checkbox with multiple errors"
            error={["This Checkbox has", "multiple errors"]}
          />
        </div>
      </section>

      <h2>
        Disabled <code>{"<Checkbox/>"}</code>
      </h2>
      <section>
        <h3>Solo</h3>
        <Checkbox label="Non Disabled Checkbox" />
        <Checkbox label="Disabled Checkbox" disabled />
        <hr />
        <h3>In Group</h3>
        <CheckboxProvider>
          <CheckboxGroupControl label="Select All" />
          <Checkbox label="Non Disabled Checkbox" name="enabled" />
          <Checkbox label="Disabled Checkbox" disabled name="disabled" />
          <Checkbox label="Non Disabled Checkbox 2" name="enabled2" />
        </CheckboxProvider>
      </section>
    </main>
  );
}
