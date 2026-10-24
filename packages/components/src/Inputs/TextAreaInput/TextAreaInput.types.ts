import type { ComponentProps } from "react";
import type {
  InputFieldSharedProps,
  InputFieldSlotProps,
} from "../InputField/InputField.types";

export interface TextAreaInputProps
  extends ComponentProps<"textarea">, InputFieldSharedProps {
  /** Disables the handle for resizing <textarea/> */
  disableResize?: boolean;
  /**
   * The slot props for the `<TextAreaInput/>`
   * ```
   *  `root <div/>
   *   |label <label/>
   *   |{beforeSurface}
   *   |inputSurface <div/>
   *   |   |startAdornment <span/>
   *   |   |input <textarea/>
   *   |   |endAdornment <span/>
   *   |   |{ripple}
   *   |{afterSurface}
   *   |helperText <TextOrString/>`
   * ```
   * @link TextAreaInputSlotProps
   */
  slotProps?: TextAreaInputSlotProps;
}

export type TextAreaInputSlotProps = InputFieldSlotProps;
