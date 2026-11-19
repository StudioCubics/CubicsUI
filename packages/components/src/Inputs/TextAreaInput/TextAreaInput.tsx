"use client";

import { useId } from "@cubicsui/hooks";
import { cn, mergeEvents } from "@cubicsui/utils";
import { type ReactElement } from "react";
import { InputField } from "../InputField/InputField";
import { extractInputFieldSharedProps } from "../InputField/InputField.utils";
import styles from "./TextAreaInput.module.css";
import type { TextAreaInputProps } from "./TextAreaInput.types";

export function TextAreaInput(props: TextAreaInputProps): ReactElement {
  const {
    inputFieldSharedProps,
    slotProps = {},
    id,
    className,
    disableResize,
    onClick,
    ...textareaProps
  } = extractInputFieldSharedProps(props);

  const { error, helperText, rootClass } = inputFieldSharedProps;
  const inputId = useId(id);
  const descriptionId =
    error || helperText ? `${inputId}-description` : undefined;

  return (
    <InputField
      {...inputFieldSharedProps}
      inputId={inputId}
      descriptionId={descriptionId}
      slotProps={slotProps}
      rootClass={cn(rootClass, disableResize && styles.disableResize)}
    >
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
