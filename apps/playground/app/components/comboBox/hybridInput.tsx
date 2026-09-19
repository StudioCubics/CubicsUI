"use client";

import { Button, ComboBox } from "@cubicsui/components";
import { useState, type SubmitEvent } from "react";

const fruitOptions = [
  { label: "Orange" },
  { label: "Lemon" },
  { label: "Lime" },
  { label: "Strawberry" },
  { label: "Blueberry" },
];

export function HybridInput() {
  const [single, setSingle] = useState("");
  const [multiple, setMultiple] = useState<string[]>([]);
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    alert(formData.get("pick-a-fruit")); //Should be the value of the combobox
  }
  function handleMultipleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    alert(formData.getAll("pick-some-fruits")); //Should be an array of the values
  }
  return (
    <section>
      <h3>
        Single select, with default value {"("}uncontrolled{")"}
      </h3>
      <form onSubmit={handleSubmit}>
        <ComboBox
          label="Pick a fruit"
          defaultValue={"Orange"}
          name="pick-a-fruit"
          options={fruitOptions}
          disablePadding
          startAdornment={<Button type="reset">Reset</Button>}
          endAdornment={<Button type="submit">Submit</Button>}
        />
      </form>
      <hr />

      <h3>
        Single select, with value and onChange {"("}controlled{")"}
      </h3>
      <div className={"column"}>
        <ComboBox
          label="Pick a fruit"
          value={single}
          onChange={setSingle}
          options={fruitOptions}
        />
        <p>
          Result : <b>{JSON.stringify(single)}</b>
        </p>
      </div>
      <hr />

      <h3>
        Multiple select {"("}uncontrolled{")"}
      </h3>
      <form onSubmit={handleMultipleSubmit}>
        <ComboBox
          multiple
          label="Pick some fruits"
          name="pick-some-fruits"
          options={fruitOptions}
          defaultValue={["Lemon"]}
          disablePadding
          startAdornment={<Button type="reset">Reset</Button>}
          endAdornment={<Button type="submit">Submit</Button>}
        />
      </form>
      <hr />

      <h3>
        Multiple select, with value and onChange {"("}controlled{")"}
      </h3>
      <div className={"column"}>
        <ComboBox
          multiple
          label="Pick some fruits"
          value={multiple}
          onChange={setMultiple}
          options={fruitOptions}
        />
        <p>
          Result : <b>{JSON.stringify(multiple)}</b>
        </p>
      </div>
    </section>
  );
}
