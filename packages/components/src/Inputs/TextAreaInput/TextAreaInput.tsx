"use client";

import { useId, type ReactElement } from "react";
import { InputField } from "../InputField/InputField";
import { cn, mergeEvents } from "@cubicsui/utils";
import type { TextAreaInputProps } from "./TextAreaInput.types";
import type { InputFieldProps } from "../InputField/InputField.types";
import styles from "./TextAreaInput.module.css";

export function TextAreaInput(props: TextAreaInputProps): ReactElement {
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
    disableResize,
    onClick,
    ...textareaProps
  } = props;
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const descriptionId =
    !!error || !!helperText ? `${inputId}-description` : undefined;

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
    rootClass: cn(rootClass, disableResize && styles.disableResize),
    slotProps,

    inputId,
    descriptionId,
  };
  return (
    <InputField {...inputFieldProps}>
      {({ createRipple }) => {
        return (
          <textarea
            id={inputId}
            className={cn(className, styles.input)}
            onClick={mergeEvents(createRipple, onClick)}
            aria-invalid={!!error}
            aria-describedby={descriptionId}
            {...textareaProps}
          />
        );
      }}
    </InputField>
  );
}
