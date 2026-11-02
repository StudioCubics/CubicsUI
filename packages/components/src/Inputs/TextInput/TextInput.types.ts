import type { ComponentProps } from "react";
import type {
  InputFieldSharedProps,
  InputFieldSlotProps,
} from "../InputField/InputField.types";

export interface TextInputProps
  extends Omit<ComponentProps<"input">, "size" | "type">,
    InputFieldSharedProps {
  /** Only text type inputs are allowed here */
  type?: "text" | "email" | "search" | "tel" | "url";

  /** size attribute of the html `<input size=""/>` element */
  htmlSize?: ComponentProps<"input">["size"];

  /**
   * The slot props for the `<TextInput/>`
   * ```
   *  `root <div/>
   *   |label <label/>
   *   |{beforeSurface}
   *   |inputSurface <div/>
   *   |   |startAdornment <span/>
   *   |   |input <input/>
   *   |   |endAdornment <span/>
   *   |   |{ripple}
   *   |{afterSurface}
   *   |helperText <TextOrString/>`
   * ```
   * @link TextInputSlotProps
   */
  slotProps?: TextInputSlotProps;
}
export type TextInputSlotProps = InputFieldSlotProps;
