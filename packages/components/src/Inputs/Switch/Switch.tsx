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
      {...slotProps.root}
      className={cn(styles.root)}
      data-color={error ? "error" : color}
      data-size={size}
      data-error={!!error}
    >
      <div
        {...slotProps.inputWrapper}
        className={cn(slotProps.inputWrapper?.className, styles.inputWrapper)}
      >
        <div
          {...slotProps.switch}
          className={cn(slotProps.switch?.className, styles.switch)}
        >
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
            {...slotProps.track}
            className={cn(slotProps.track?.className, styles.track)}
            onClick={(e) => {
              inputRef.current?.click();
              slotProps.track?.onClick?.(e);
            }}
            aria-hidden="true"
          >
            <RenderSwitchIcons
              icons={trackIcons}
              {...slotProps.trackIcons}
              className={cn(slotProps.trackIcons?.className, styles.trackIcons)}
            />
            <span
              {...slotProps.thumb}
              ref={mergeRefs(thumbRef, slotProps.thumb?.ref)}
              className={cn(slotProps.thumb?.className, styles.thumb)}
            >
              <RenderSwitchIcons
                icons={thumbIcons}
                {...slotProps.thumbIcons}
                className={cn(
                  slotProps.thumbIcons?.className,
                  styles.thumbIcons,
                )}
              />
            </span>
          </span>
        </div>
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
      <TextOrList
        text={error ?? helperText}
        {...slotProps.helperText}
        className={cn(slotProps.helperText?.className, styles.helperText)}
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
