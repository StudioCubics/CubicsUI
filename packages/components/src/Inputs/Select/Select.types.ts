import type { ComponentProps } from "react";
import type {
  InputFieldSharedProps,
  InputFieldSlotProps,
} from "../InputField/InputField.types";

export interface SelectProps
  extends Omit<ComponentProps<"select">, "size">, InputFieldSharedProps {
  /**
   * This behaves like the native multiple where users need to select using Ctrl,
   * for multiple selected values use `<ComboBox/>` component instead
   */
  multiple?: ComponentProps<"select">["multiple"];

  /** size attribute of the html `<input size=""/>` element */
  htmlSize?: ComponentProps<"input">["size"];

  /**
   * The slot props for the `<Select/>`
   * ```
   *  `root <div/>
   *   |label <label/>
   *   |{beforeSurface}
   *   |inputSurface <div/>
   *   |   |startAdornment <span/>
   *   |   |select <select/>
   *   |   |endAdornment <span/>
   *   |   |{ripple}
   *   |{afterSurface}
   *   |helperText <TextOrString/>`
   * ```
   * @link SelectSlotProps
   */
  slotProps?: SelectSlotProps;
}

export type SelectSlotProps = InputFieldSlotProps;
