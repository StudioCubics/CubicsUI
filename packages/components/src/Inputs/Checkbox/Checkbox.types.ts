import type { ComponentProps, ReactElement, ReactNode } from "react";
import type { TextOrListProps } from "../../Typography/TextOrList/TextOrList.types";

export interface CheckboxProps
  extends Omit<ComponentProps<"input">, "onChange" | "type" | "size"> {
  /** Class for the root of the `<Checkbox/>` component */
  rootClass?: string;

  /** Label for the input containing helpful info */
  label?: ReactNode;

  /** Text or array of text containing  info about the input */
  helperText?: TextOrListProps["text"];

  /** Text or array of text containing error info about the input if the input is errored */
  error?: TextOrListProps["text"];

  /** Handle the indeterminate state */
  indeterminate?: boolean;

  /** Skips registering with group even if wrapped with `<CheckboxProvider/>` */
  skipGroup?: boolean;

  /** Extends inputs onChange handler to also include checked along with event */
  onChange?: (event: React.ChangeEvent, checked: boolean) => void;

  /** Use if you want to pass your own checked state icon */
  checkedIcon?: ReactElement<ComponentProps<"svg">>;

  /** Use if you want to pass your own indeterminate state icon */
  indeterminateIcon?: ReactElement<ComponentProps<"svg">>;

  /** Size of the checkbox and its label, to use the html attribute `size` use `htmlSize` */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** Color of the checkbox and its label */
  color?: "primary" | "secondary" | "tertiary" | "error";

  /** Slot props for customizing internal elements.
   * ```
   *  `root <div/>
   *   |inputWrapper <div/>
   *   |   |checkbox <span/>
   *   |   |   |input <input/>
   *   |   |   |checkIconsWrapper <span/>
   *   |   |   |   |checkedIcon <span/>
   *   |   |   |   |indeterminateIcon <span/>
   *   |   |label <label/>
   *   |helperText <TextOrString/>`
   * ```
   * @link CheckboxSlotProps
   */
  slotProps?: CheckboxSlotProps;
}

/** The slot props for `<Checkbox/>`

 */
export interface CheckboxSlotProps {
  /** If the root wrapping `<div/>` needs some props to be passed, for className use the className prop of the `<Checkbox/>` component instead */
  root?: ComponentProps<"div">;

  /** Contains `[{checkbox} {label}]` */
  inputWrapper?: ComponentProps<"div">;

  /** A `<span/>` that wraps the input checkbox */
  checkbox?: ComponentProps<"span">;

  /** Contains `[{checkedIcon} {indeterminateIcon}]` */
  checkIconsWrapper?: ComponentProps<"span">;

  /** Span that wraps the checked icon */
  checkedIcon?: ComponentProps<"span">;

  /** Span that wraps the indeterminate icon */
  indeterminateIcon?: ComponentProps<"span">;

  /** Contains the label text in a `<label/>` */
  label?: ComponentProps<"label">;

  /** Contains a `<p/>` or `<ul/>` tag with the helper text
   * @link TextOrListProps
   */
  helperText?: TextOrListProps;
}

export type CheckboxCurrentState =
  | "checked"
  | "unchecked"
  | "indeterminate"
  | undefined;

export interface CheckboxContextProps {
  values: Record<string, boolean>;
  selected: string[];
  register: (id: string, checked?: boolean) => void;
  update: (id: string, checked: boolean) => void;
  setAll: (checked: boolean) => void;
}
export interface CheckboxProviderProps {
  children: ReactNode;
  onChange?: (checked: Record<string, boolean>) => void;
}
