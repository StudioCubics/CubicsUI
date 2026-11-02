"use client";

import { Button, Checkbox, CheckboxProvider } from "@cubicsui/components";
import { type SubmitEvent, useState } from "react";

export function HybridInput() {
  const [value, setValue] = useState(false);
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target);
    alert(JSON.stringify(Object.fromEntries(formData.entries())));
  }
  return (
    <section>
      <h3>
        With default value {"("}uncontrolled{")"}
      </h3>
      <form onSubmit={handleSubmit}>
        <CheckboxProvider>
          <div className="row">
            <Button type="reset">Reset</Button>
            <Checkbox
              label="An uncontrolled checkbox, result will be empty if unchecked"
              defaultChecked
              name="uncontrolled-checkbox"
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </CheckboxProvider>
      </form>
      <hr />

      <h3>
        With value and onChange {"("}controlled{")"}
      </h3>
      <div className={"column"}>
        <Checkbox
          label="The checked status of the checkbox is shown below"
          checked={value}
          onChange={(e, v) => setValue(v)}
        />
        <p>
          Result : <b>{JSON.stringify(value)}</b>
        </p>
      </div>
    </section>
  );
}
