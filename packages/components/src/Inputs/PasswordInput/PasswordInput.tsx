"use client";

import { useId } from "@cubicsui/hooks";
import { PasswordVisibilityIcon } from "@cubicsui/icons";
import { cn, mergeEvents } from "@cubicsui/utils";
import { type ReactElement, useState } from "react";
import { InputField } from "../InputField/InputField";
import { extractInputFieldSharedProps } from "../InputField/InputField.utils";
import styles from "./PasswordInput.module.css";
import type { PasswordInputProps } from "./PasswordInput.types";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter/PasswordStrengthMeter";

export function PasswordInput(props: PasswordInputProps): ReactElement {
  const {
    inputFieldSharedProps,
    slotProps: _slotProps = {},

    id,
    className,
    htmlSize,
    disableVisibilityToggle,
    enableStrengthMeter,
    onClick,
    ...inputProps
  } = extractInputFieldSharedProps(props);
  const { error, helperText, afterSurface } = inputFieldSharedProps;
  const { strengthMeter, visibilityToggle, ...slotProps } = _slotProps;
  const [showPass, setShowPass] = useState(false);
  const inputId = useId(id);
  const descriptionId =
    error || helperText ? `${inputId}-description` : undefined;

  return (
    <InputField
      {...inputFieldSharedProps}
      inputId={inputId}
      descriptionId={descriptionId}
      slotProps={slotProps}
      afterSurface={
        <>
          {enableStrengthMeter && <PasswordStrengthMeter {...strengthMeter} />}
          {afterSurface}
        </>
      }
    >
      {({ createRipple }) => {
        return (
          <span className={styles.inputWrapper}>
            <input
              type={showPass ? "text" : "password"}
              id={inputId}
              className={cn(className, styles.input)}
              onClick={mergeEvents(createRipple, onClick)}
              aria-invalid={!!error}
              aria-describedby={descriptionId}
              size={htmlSize}
              {...inputProps}
            />
            {!disableVisibilityToggle && (
              <button
                {...visibilityToggle}
                aria-pressed={showPass}
                data-hidden={!showPass}
                data-open={showPass}
                aria-controls={inputId}
                type="button"
                aria-label="Show password"
                onClick={() => setShowPass(!showPass)}
                className={cn(
                  styles.visibilityToggle,
                  visibilityToggle?.className,
                )}
              >
                <PasswordVisibilityIcon />
              </button>
            )}
          </span>
        );
      }}
    </InputField>
  );
}
