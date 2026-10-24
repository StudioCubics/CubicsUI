import type { ComponentProps, ReactNode } from "react";
import type {
  UseRippleProps,
  UseRippleReturns,
} from "../../Misc/Ripple/Ripple.types";
import type { TextOrListProps } from "../../Typography/TextOrList/TextOrList.types";

export interface InputFieldSharedProps {
  /** Label for the input containing helpful info */
  label?: string;

  /** Text or array of text containing error info about the input if the input is errored */
  error?: TextOrListProps["text"];

  /** Text or array of text containing  info about the input */
  helperText?: TextOrListProps["text"];

  /**
   * Size of the input and its label, to use the html attribute `size` use `htmlSize`
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Place to add anything that should go above the inputSurface and below the label */
  beforeSurface?: ReactNode;

  /** Place to add anything that should go under the inputSurface and above the helperText */
  afterSurface?: ReactNode;

  /** Adornment at the start of the inputSurface */
  startAdornment?: ReactNode;

  /** Adornment at the end of the inputSurface */
  endAdornment?: ReactNode;

  /**
   * Expands width to 100% of container.
   * @default false
   */
  fullWidth?: boolean;

  /** Removes padding around inputSurface, use when using a button for start or end icon. */
  disablePadding?: boolean;

  /** Removes ripple effect when clicking on the input */
  disableRipple?: boolean;

  /** Additional classNames that get passed to the root */
  rootClass?: string;
}

export type InputFieldOwnProps = {
  /** id of the input element */
  inputId?: string;
  /** Id of the helperText or error  */
  descriptionId?: string;

  /** The input element that will be wrapped by `inputWrapper` */
  children?: (props: {
    /** Bind with onTouchstart and onClick to trigger ripple on inputSurface */
    createRipple: UseRippleReturns<HTMLElement>["createRipple"];
  }) => ReactNode;

  /**
   * The slotProps for the InputField these will also be inherited by components using InputField
   * ```
   *  `root <div/>
   *   |label <label/>
   *   |{beforeSurface}
   *   |inputSurface <div/>
   *   |   |startAdornment <span/>
   *   |   |{children}
   *   |   |endAdornment <span/>
   *   |   |{ripple}
   *   |{afterSurface}
   *   |helperText <TextOrString/>`
   * ```
   * @link InputFieldSlotProps
   */
  slotProps?: InputFieldSlotProps;
};
export type InputFieldProps = InputFieldOwnProps & InputFieldSharedProps;

export interface InputFieldSlotProps {
  /** Is the root div of the InputField component, for className use rootClasses prop */
  root?: Omit<ComponentProps<"div">, "className">;

  /** Contains the label text in a `<label/>` */
  label?: ComponentProps<"label">;

  /** Contains `[{startAdornment} {children} {endAdornment} {ripple}]` this is the visual surface of the input*/
  inputSurface?: ComponentProps<"div">;

  /** Contains the startAdornment in a `<span/>` */
  startAdornment?: ComponentProps<"span">;

  /** Contains the endAdornment in a `<span/>` */
  endAdornment?: ComponentProps<"span">;

  /**
   * Props for the useRipple component
   * @link UseRippleProps
   */
  ripple?: UseRippleProps;

  /**
   * Contains a `<p/>` or `<ul/>` tag with the helper text
   * @link TextOrListProps
   */
  helperText?: TextOrListProps;
}
