import type { InputFieldSharedProps } from "./InputField.types";

const INPUT_FIELD_SHARED_KEYS: (keyof InputFieldSharedProps)[] = [
  "label",
  "error",
  "helperText",
  "size",
  "beforeSurface",
  "afterSurface",
  "startAdornment",
  "endAdornment",
  "fullWidth",
  "disablePadding",
  "disableRipple",
  "rootClass",
];

export function extractInputFieldSharedProps<T extends InputFieldSharedProps>(
  props: T,
): Omit<T, keyof InputFieldSharedProps> & {
  inputFieldSharedProps: InputFieldSharedProps;
} {
  const inputFieldSharedProps: Record<string, unknown> = {};
  const restProps = { ...props } as Record<string, unknown>;

  for (const key of INPUT_FIELD_SHARED_KEYS) {
    if (key in restProps) {
      inputFieldSharedProps[key] = restProps[key];
      delete restProps[key];
    }
  }

  return {
    ...(restProps as Omit<T, keyof InputFieldSharedProps>),
    inputFieldSharedProps: inputFieldSharedProps as InputFieldSharedProps,
  };
}
