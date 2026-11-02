"use client";

import type { ReactElement } from "react";
import { Checkbox } from "./Checkbox";
import type { CheckboxProps } from "./Checkbox.types";
import { useCheckbox } from "./CheckboxProvider";

export function CheckboxGroupControl(props: CheckboxProps): ReactElement {
  const group = useCheckbox();

  if (!group) {
    throw new Error(
      "<CheckboxGroupControl/> must be used inside <CheckboxProvider/>",
    );
  }

  const { values, setAll } = group;

  const allChecked = Object.values(values).every(Boolean);
  const someChecked = Object.values(values).some(Boolean);

  return (
    <Checkbox
      {...props}
      checked={allChecked}
      indeterminate={!allChecked && someChecked}
      onChange={(_, checked) => setAll(checked)}
      skipGroup
    />
  );
}
