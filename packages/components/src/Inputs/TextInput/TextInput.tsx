"use client";

import { cn, mergeEvents } from "@cubicsui/utils";
import { type ReactElement, useId } from "react";
import { InputField } from "../InputField/InputField";
import type { InputFieldProps } from "../InputField/InputField.types";
import styles from "./TextInput.module.css";
import type { TextInputProps } from "./TextInput.types";

export function TextInput(props: TextInputProps): ReactElement {
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
    type = "text",
    htmlSize,
    onClick,
    ...inputProps
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
    disableRipple,
    rootClass,
    slotProps,

    inputId,
    descriptionId,
  };
  return (
    <InputField {...inputFieldProps}>
      {({ createRipple }) => {
        return (
          <input
            type={type}
            id={inputId}
            className={cn(className, styles.input)}
            onClick={mergeEvents(createRipple, onClick)}
            aria-invalid={!!error}
            aria-describedby={descriptionId}
            size={htmlSize}
            {...inputProps}
          />
        );
      }}
    </InputField>
  );
}
