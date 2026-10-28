"use client";

import { DrawCheckIcon, DrawDashIcon } from "@cubicsui/icons";
import { cn, mergeRefs } from "@cubicsui/utils";
import {
  type ChangeEvent,
  type ReactElement,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { TextOrList } from "../../Typography/TextOrList/TextOrList";
import styles from "./Checkbox.module.css";
import type { CheckboxCurrentState, CheckboxProps } from "./Checkbox.types";
import { useCheckbox } from "./CheckboxProvider";

export function Checkbox(props: CheckboxProps): ReactElement {
  const {
    ref,
    rootClass,
    className,
    label,
    id: _id,
    name,
    checked,
    indeterminate = false,
    defaultChecked,
    value,
    skipGroup,
    size = "md",
    color,
    disabled,
    error,
    helperText,
    "aria-label": ariaLabel,
    checkedIcon = <DrawCheckIcon />,
    indeterminateIcon = <DrawDashIcon />,
    slotProps = {},
    onChange,
    ...rest
  } = props;

  const isRegistered = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentState, setCurrentState] = useState<CheckboxCurrentState>(
    defaultChecked || checked
      ? "checked"
      : indeterminate
        ? "indeterminate"
        : "unchecked",
  );
  const group = useCheckbox();
  const fallbackId = useId();
  const id = _id ?? fallbackId;
  const isChecked = currentState === "checked";
  const isIndeterminate = currentState === "indeterminate";
  const stringLabel = typeof label === "string" ? label : undefined;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (disabled) return;
    const next = e.target.checked;
    setCurrentState(next ? "checked" : "unchecked");
    if (group && !skipGroup && name) group.update(name, next);
    onChange?.(e, next);
  }

  // Keep state synced when mounting because for some reason browser remembers the
  // checked state of checkboxes when refreshed, this i saw only in mozilla
  useEffect(() => {
    if (!inputRef.current) return;
    const c = inputRef.current.checked;
    setCurrentState(
      indeterminate ? "indeterminate" : c ? "checked" : "unchecked",
    );
    // Register with group if inside <CheckboxProvider/>
    if (group && !skipGroup && !isRegistered.current && name && !disabled) {
      isRegistered.current = true;
      group.register(name, c);
    }
  }, [group, skipGroup, name, indeterminate, disabled]);

  // Set indeterminate state
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.indeterminate = indeterminate;
    if (indeterminate) setCurrentState("indeterminate");
  }, [indeterminate]);

  // Sync to group state if group is present and checkbox is checked in group
  useEffect(() => {
    if (!isRegistered.current || !inputRef.current || !name || disabled) return;
    inputRef.current.checked = group.values[name];
    setCurrentState(group.values[name] ? "checked" : "unchecked");
  }, [group.values, name, disabled]);

  // Native form reset restores input.checked to defaultChecked but does not
  // fire onChange, so currentState never changes, this effect handles that
  useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!input || !form) return;

    function handleReset() {
      // The reset event fires before the browser applies the reset
      // algorithm
      setTimeout(() => {
        if (!inputRef.current) return;
        // Explicitly set indeterminate if it was passed as prop from parent
        inputRef.current.indeterminate = indeterminate;
        setCurrentState(
          indeterminate
            ? "indeterminate"
            : inputRef.current.checked
              ? "checked"
              : "unchecked",
        );
        if (group && !skipGroup && name) {
          group.update(name, inputRef.current.checked);
        }
      }, 0);
    }

    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [group, skipGroup, name, indeterminate]);

  return (
    <div
      {...slotProps.root}
      className={cn(rootClass, slotProps.root?.className, styles.root)}
      data-size={size}
      data-color={error ? "error" : color}
      data-error={!!error}
    >
      <div
        {...slotProps.inputWrapper}
        className={cn(slotProps.inputWrapper?.className, styles.inputWrapper)}
      >
        {/* Main Checkbox */}
        <span
          {...slotProps.checkbox}
          className={cn(slotProps.checkbox?.className, styles.checkbox)}
        >
          <input
            id={id}
            ref={mergeRefs(ref, inputRef)}
            type="checkbox"
            aria-checked={isIndeterminate ? "mixed" : isChecked}
            aria-label={ariaLabel ?? stringLabel}
            onChange={handleChange}
            className={cn(className, styles.input)}
            disabled={disabled}
            value={value}
            name={name}
            {...(checked !== undefined ? { checked } : { defaultChecked })}
            {...rest}
          />
          <span
            {...slotProps.checkIconsWrapper}
            className={cn(
              slotProps.checkIconsWrapper?.className,
              styles.checkIconsWrapper,
            )}
          >
            <span
              {...slotProps.checkedIcon}
              className={cn(
                slotProps.checkedIcon?.className,
                styles.checkedIcon,
              )}
            >
              {checkedIcon}
            </span>
            <span
              {...slotProps.indeterminateIcon}
              className={cn(
                slotProps.indeterminateIcon?.className,
                styles.indeterminateIcon,
              )}
            >
              {indeterminateIcon}
            </span>
          </span>
        </span>
        {/* Label */}
        {label && (
          <label
            {...slotProps.label}
            htmlFor={id}
            className={cn(slotProps.label?.className, styles.label)}
          >
            {label}
          </label>
        )}
      </div>
      {/* Helper text */}
      <TextOrList
        {...slotProps.helperText}
        className={cn(slotProps.helperText?.className, styles.helperText)}
        text={error ?? helperText}
      />
    </div>
  );
}
