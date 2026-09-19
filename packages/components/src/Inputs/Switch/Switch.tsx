"use client";

import {
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ReactElement,
} from "react";
import { cn, mergeRefs } from "@cubicsui/utils";
import type { RenderSwitchIconsProps, SwitchProps } from "./Switch.types";
import { TextOrList } from "../../Typography/TextOrList/TextOrList";
import styles from "./Switch.module.css";

export function Switch(props: SwitchProps): ReactElement {
  const {
    id: _id,
    ref,
    className,
    checked,
    defaultChecked,
    disabled,
    onChange,

    label,
    size,
    color,
    helperText,
    error,
    thumbIcons,
    trackIcons,
    slotProps = {},
    ...inputProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const [isOn, setIsOn] = useState(defaultChecked || checked);
  const fallbackId = useId();
  const id = _id ?? fallbackId;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const c = e.currentTarget.checked;
    onChange?.(e, c);
    setIsOn(c);
  }
  // Mounting effect
  useEffect(() => {
    if (!inputRef.current) return;
    setIsOn(inputRef.current.checked || inputRef.current.defaultChecked);
  }, []);

  // Handle form reset
  useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!input || !form) return;

    function handleReset() {
      setTimeout(() => {
        if (!inputRef.current) return;
        setIsOn(inputRef.current.checked || inputRef.current.defaultChecked);
      }, 0);
    }

    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  });

  return (
    <div
      className={cn(styles.root)}
      data-color={error ? "error" : color}
      data-size={size}
      data-error={!!error}
    >
      <div className={cn(styles.inputWrapper)}>
        <div className={cn(styles.switch)}>
          <input
            {...inputProps}
            id={id}
            type={"checkbox"}
            ref={mergeRefs(ref, inputRef)}
            className={cn(className, styles.input)}
            role="switch"
            aria-checked={isOn}
            onChange={handleChange}
            disabled={disabled}
            {...(checked !== undefined ? { checked } : { defaultChecked })}
          />
          <span
            className={cn(styles.track)}
            onClick={() => {
              inputRef.current?.click();
            }}
            aria-hidden="true"
          >
            <RenderSwitchIcons
              className={styles.trackIcons}
              icons={trackIcons}
            />
            <span ref={thumbRef} className={cn(styles.thumb)}>
              <RenderSwitchIcons
                className={styles.thumbIcons}
                icons={thumbIcons}
              />
            </span>
          </span>
        </div>
        {label && (
          <label htmlFor={id} className={cn(styles.label)}>
            {label}
          </label>
        )}
      </div>
      <TextOrList
        className={cn(styles.helperText)}
        text={error ?? helperText}
      />
    </div>
  );
}
// TODO add slotProps
function RenderSwitchIcons(props: RenderSwitchIconsProps) {
  const { icons, ...rest } = props;
  const isRN = isValidElement(icons);
  if (typeof icons !== "object" || icons === null) return;
  if (isRN || Array.isArray(icons)) {
    return <span {...rest}>{icons}</span>;
  }
  if ("on" in icons || "off" in icons)
    return (
      <span {...rest}>
        {icons.on && <span className={cn(styles.on)}>{icons.on}</span>}
        {icons.off && <span className={cn(styles.off)}>{icons.off}</span>}
      </span>
    );
  return;
}
