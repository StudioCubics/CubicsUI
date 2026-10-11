"use client";

import { useId, useState, type ReactElement } from "react";
import { cn, mergeEvents } from "@cubicsui/utils";
import { InputField } from "../InputField/InputField";
import type { InputFieldProps } from "../InputField/InputField.types";
import type { PasswordInputProps } from "./PasswordInput.types";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter/PasswordStrengthMeter";
import { PasswordVisibilityIcon } from "./PasswordVisibilityIcon/PasswordVisibilityIcon";
import styles from "./PasswordInput.module.css";

export function PasswordInput(props: PasswordInputProps): ReactElement {
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
    slotProps: _slotProps = {},

    id,
    className,
    htmlSize,
    disableVisibilityToggle,
    enableStrengthMeter,
    onTouchStart,
    onClick,
    ...inputProps
  } = props;
  const { strengthMeter, visibilityToggle, ...slotProps } = _slotProps;
  const [showPass, setShowPass] = useState(false);
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
    afterSurface: (
      <>
        {enableStrengthMeter && <PasswordStrengthMeter {...strengthMeter} />}
        {afterSurface}
      </>
    ),
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
                aria-controls={inputId}
                type="button"
                aria-label="Show password"
                onClick={() => setShowPass(!showPass)}
                className={cn(
                  styles.visibilityToggle,
                  visibilityToggle?.className,
                )}
              >
                <PasswordVisibilityIcon closed={showPass} />
              </button>
            )}
          </span>
        );
      }}
    </InputField>
  );
}
