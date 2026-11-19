"use client";

import { useId } from "@cubicsui/hooks";
import { cn, mergeEvents } from "@cubicsui/utils";
import { type ReactElement } from "react";
import { InputField } from "../InputField/InputField";
import { extractInputFieldSharedProps } from "../InputField/InputField.utils";
import styles from "./TextInput.module.css";
import type { TextInputProps } from "./TextInput.types";

export function TextInput(props: TextInputProps): ReactElement {
  const {
    inputFieldSharedProps,
    slotProps = {},
    id,
    className,
    type = "text",
    htmlSize,
    onClick,
    ...inputProps
  } = extractInputFieldSharedProps(props);

  const { error, helperText } = inputFieldSharedProps;
  const inputId = useId(id);
  const descriptionId =
    error || helperText ? `${inputId}-description` : undefined;

  return (
    <InputField
      {...inputFieldSharedProps}
      inputId={inputId}
      descriptionId={descriptionId}
      slotProps={slotProps}
    >
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
