"use client";

import { cn, mergeEvents } from "@cubicsui/utils";
import { type ReactElement, useId } from "react";
import { InputField } from "../InputField/InputField";
import type { InputFieldProps } from "../InputField/InputField.types";
import styles from "./Select.module.css";
import type { SelectProps } from "./Select.types";
/**
 * Interchangeable with the native `<select/>` element for more control like combobox, multiselect, autocomplete, async or creatable support use <Combobox/> component.
 * You cannot use any element inside a native `<option/>` element currently in browsers like firefox and safari, only text.
 */
export function Select(props: SelectProps): ReactElement {
  const {
    label,
    error,
    helperText,
    size,
    beforeSurface,
    afterSurface,
    startAdornment,
    endAdornment,
    fullWidth,
    disablePadding,
    disableRipple,
    rootClass,
    slotProps = {},

    id,
    className,
    htmlSize,
    multiple,
    onClick,
    children,
    ...selectProps
  } = props;
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const descriptionId =
    error || helperText ? `${inputId}-description` : undefined;

  const inputFieldProps: InputFieldProps = {
    label,
    error,
    helperText,
    size,
    beforeSurface,
    afterSurface,
    startAdornment,
    endAdornment,
    fullWidth,
    disablePadding,
    disableRipple: multiple ?? disableRipple,
    rootClass,
    slotProps,

    inputId,
    descriptionId,
  };
  return (
    <InputField {...inputFieldProps}>
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
