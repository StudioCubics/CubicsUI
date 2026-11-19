"use client";

import { useId } from "@cubicsui/hooks";
import { cn, mergeEvents } from "@cubicsui/utils";
import { type ReactElement } from "react";
import { InputField } from "../InputField/InputField";
import { extractInputFieldSharedProps } from "../InputField/InputField.utils";
import styles from "./Select.module.css";
import type { SelectProps } from "./Select.types";

/**
 * Interchangeable with the native `<select/>` element for more control like combobox, multiselect, autocomplete, async or creatable support use <Combobox/> component.
 * You cannot use any element inside a native `<option/>` element currently in browsers like firefox and safari, only text.
 */
export function Select(props: SelectProps): ReactElement {
  const {
    inputFieldSharedProps,
    slotProps = {},

    id,
    className,
    htmlSize,
    multiple,
    onClick,
    children,
    ...selectProps
  } = extractInputFieldSharedProps(props);
  const { error, helperText, disableRipple } = inputFieldSharedProps;
  const inputId = useId(id);
  const descriptionId =
    error || helperText ? `${inputId}-description` : undefined;

  return (
    <InputField
      {...inputFieldSharedProps}
      inputId={inputId}
      descriptionId={descriptionId}
      slotProps={slotProps}
      disableRipple={multiple ?? disableRipple}
    >
      {({ createRipple }) => (
        <select
          id={id}
          className={cn(className, styles.input)}
          onClick={mergeEvents(createRipple, onClick)}
          aria-invalid={!!error}
          size={htmlSize}
          multiple={multiple}
          {...selectProps}
        >
          {children}
        </select>
      )}
    </InputField>
  );
}
