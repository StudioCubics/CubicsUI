import { Button, Card, ComboBox } from "@cubicsui/components";
import { CubicsUIFavicon, PointerLightIcon } from "@cubicsui/icons";
import { HybridInput } from "./hybridInput";

const fruitOptions = [
  { type: "header" as const, label: "Citrus" },
  { label: "Orange" },
  { label: "Lemon" },
  { label: "Lime" },
  { type: "separator" as const },
  { type: "header" as const, label: "Berries" },
  { label: "Strawberry" },
  { label: "Blueberry", disabled: true },
  { label: "Raspberry" },
];

const countryOptions = [
  { label: "Bangladesh", value: "bd" },
  { label: "India", value: "in" },
  { label: "Pakistan", value: "pk" },
  { label: "Nepal", value: "np" },
  { label: "Sri Lanka", value: "lk" },
];

const iconOptions = [
  { label: "CubicsUI", icon: <CubicsUIFavicon /> },
  { label: "React", icon: <PointerLightIcon /> },
  { label: "Next.js", icon: <>🐱‍👤</> },
];

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<ComboBox/>"}</code>
      </h1>
      <h2>Labels</h2>
      <section>
        <div className={"column"}>
          <h3>
            <code>{"<ComboBox/>"}</code> with label
          </h3>
          <ComboBox label="Pick a fruit" options={fruitOptions} />
          <ComboBox
            label="This is a really long label, a really really long label"
            options={fruitOptions}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>{"<ComboBox/>"}</code> without label
          </h3>
          <p>
            You have to use <code>placeholder</code> prop to do labelling
          </p>
          <ComboBox placeholder="Pick a fruit" options={fruitOptions} />
          <ComboBox
            placeholder="This is a really long label, how long you say? Really long."
            options={fruitOptions}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            A required <code>{"<ComboBox/>"}</code>
          </h3>
          <ComboBox required label="Pick a fruit" options={fruitOptions} />
        </div>
      </section>

      <h2>Hybrid Input</h2>
      <HybridInput />

      <h2>
        With <code>options</code>
      </h2>
      <section>
        <p>
          Options can be plain items, or <code>header</code> /{" "}
          <code>separator</code> entries to group them, and items can be{" "}
          <code>disabled</code>.
        </p>
        <ComboBox label="Grouped options" options={fruitOptions} />
        <ComboBox label="Options with icons" options={iconOptions} />
        <ComboBox
          label="Multiple Options with icons"
          multiple
          options={iconOptions}
        />
      </section>

      <h2>
        With array of string <code>options</code>
      </h2>
      <section>
        <ComboBox
          label="Options with limited functionality"
          options={["a", "b", "c", "d"]}
        />
        <ComboBox
          label="Quick Options"
          options={["dwqeqw", "dqweqwe", "dsfsdf", "gqwweqw"]}
        />
      </section>

      <h2>
        With <code>freeSolo</code>
      </h2>
      <section>
        <p>
          Use <code>freeSolo</code> to allow typing values that aren&apos;t in
          the options list.
        </p>
        <ComboBox freeSolo label="Type anything" options={countryOptions} />
      </section>

      <h2>Multiple selection</h2>
      <section>
        <div className={"column"}>
          <h3>
            <code>multiple</code> renders chips
          </h3>
          <ComboBox multiple label="Pick some fruits" options={fruitOptions} />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>multiple</code> with <code>freeSolo</code>
          </h3>
          <ComboBox
            multiple
            freeSolo
            label="Add countries"
            options={countryOptions}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>limitSelections</code>
          </h3>
          <ComboBox
            multiple
            limitSelections={2}
            label="Pick up to 2 fruits"
            options={fruitOptions}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            Custom <code>chipSeparator</code>
          </h3>
          <p>
            Typed values are split on <code>chipSeparator</code> (default{" "}
            <code>,</code>) into chips when <code>freeSolo</code> is on.
          </p>
          <ComboBox
            multiple
            freeSolo
            chipSeparator=";"
            label="Separate with ; instead of ,"
            options={countryOptions}
          />
        </div>
      </section>

      <h2>Sizes</h2>
      <section>
        <ComboBox label="Extra Small" size="xs" options={fruitOptions} />
        <ComboBox label="Small" size="sm" options={fruitOptions} />
        <ComboBox label="Medium" size="md" options={fruitOptions} />
        <ComboBox label="Large" size="lg" options={fruitOptions} />
        <ComboBox label="Extra Large" size="xl" options={fruitOptions} />
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={"column"}>
          <ComboBox
            label="On top of a card"
            placeholder="This is a placeholder"
            options={fruitOptions}
          />
          <ComboBox
            label="On top of a card"
            placeholder="This is a placeholder"
            options={fruitOptions}
          />
        </Card>
        <h3>On RGB</h3>
        <div className={"column rgb_bg"}>
          <ComboBox
            label="On top of rgb colors"
            placeholder="This is a placeholder"
            options={fruitOptions}
          />
          <ComboBox
            label="On top of rgb colors"
            placeholder="This is a placeholder"
            options={fruitOptions}
          />
        </div>
        <h3>On Image</h3>
        <div className={"column image_bg"}>
          <ComboBox
            label="On top of image"
            placeholder="This is a placeholder"
            options={fruitOptions}
          />
          <ComboBox
            label="On top of image"
            placeholder="This is a placeholder"
            options={fruitOptions}
          />
        </div>
      </section>

      <h2>Helper Text</h2>
      <section>
        <div className={"column"}>
          <h3>Normal Helper text</h3>
          <ComboBox
            label="Pick a fruit"
            helperText="Start typing to filter the options"
            options={fruitOptions}
          />
          <ComboBox
            label="ComboBox with multiple helper texts"
            helperText={["Do this", "and then that"]}
            options={fruitOptions}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>When Errored</h3>
          <ComboBox
            label="Errored ComboBox"
            error="Make sure to check the ComboBox here"
            options={fruitOptions}
          />
          <ComboBox
            label="Errored ComboBox with multiple errors"
            error={["This ComboBox has", "multiple errors"]}
            options={fruitOptions}
          />
        </div>
      </section>

      <h2>
        With <code>fullWidth</code>{" "}
      </h2>
      <section>
        <ComboBox
          label="ComboBox with fullWidth"
          fullWidth
          options={fruitOptions}
        />
        <ComboBox
          label="ComboBox with fullWidth and helper text"
          fullWidth
          helperText={["This is helper text"]}
          options={fruitOptions}
        />
        <ComboBox
          label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus minima exercitationem ea quis quo vitae harum libero possimus, odio impedit quibusdam eos iure consequatur fugiat repellendus? Pariatur, repellendus atque!,Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus minima exercitationem ea quis quo vitae harum libero possimus, odio impedit quibusdam eos iure consequatur fugiat repellendus? Pariatur, repellendus atque!"
          fullWidth
          options={fruitOptions}
        />
        <ComboBox
          startAdornment={<CubicsUIFavicon />}
          endAdornment={<CubicsUIFavicon />}
          label="ComboBox with fullWidth and icons"
          fullWidth
          options={fruitOptions}
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
        <ComboBox
          disablePadding
          label="Without icon is not supposed to be used"
          options={fruitOptions}
        />
        <ComboBox
          label="Normal Icon Without disable padding"
          startAdornment={<CubicsUIFavicon />}
          options={fruitOptions}
        />
        <ComboBox
          label="Button Icon Without disable padding"
          startAdornment={
            <Button icon>
              <CubicsUIFavicon />
            </Button>
          }
          options={fruitOptions}
        />

        <ComboBox
          disablePadding
          label="Button Start Icon with disable padding"
          startAdornment={
            <Button icon>
              <CubicsUIFavicon />
            </Button>
          }
          options={fruitOptions}
        />
        <ComboBox
          disablePadding
          label="Button End Icon with disable padding"
          endAdornment={
            <Button variant="outlined" icon>
              <CubicsUIFavicon />
            </Button>
          }
          options={fruitOptions}
        />
        <ComboBox
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
          options={fruitOptions}
        />
      </section>

      <h2>Disabled Input</h2>
      <section>
        <ComboBox label="Disabled ComboBox" disabled options={fruitOptions} />
        <ComboBox label="Enabled ComboBox" options={fruitOptions} />
        <ComboBox
          label="Disabled ComboBox with default value"
          value="Orange"
          disabled
          options={fruitOptions}
        />
      </section>
    </main>
  );
}
