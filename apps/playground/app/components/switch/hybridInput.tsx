"use client";

import { Button, Switch } from "@cubicsui/components";
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
        <div className="row">
          <Button type="reset">Reset</Button>
          <Switch
            label="An uncontrolled switch, result will be empty if unchecked"
            defaultChecked
            name="uncontrolled-switch"
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
      <hr />

      <h3>
        With value and onChange {"("}controlled{")"}
      </h3>
      <div className={"column"}>
        <Switch
          label="The checked status of the switch is shown below"
          checked={value}
          onChange={(_, v) => setValue(v)}
        />
        <p>
          Result : <b>{JSON.stringify(value)}</b>
        </p>
      </div>
    </section>
  );
}
