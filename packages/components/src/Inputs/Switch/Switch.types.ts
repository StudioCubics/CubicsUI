import type { ComponentProps, ReactNode } from "react";
import type { TextOrListProps } from "../../Typography/TextOrList/TextOrList.types";

export interface SwitchProps
  extends Omit<ComponentProps<"input">, "size" | "onChange" | "indeterminate"> {
  /** Class for the root of the `<Switch/>` component */
  rootClass?: string;

  /** Label for the input containing helpful info */
  label?: ReactNode;

  /** Text or array of text containing  info about the input */
  helperText?: TextOrListProps["text"];

  /** Text or array of text containing error info about the input if the input is errored */
  error?: TextOrListProps["text"];

  /** Extends inputs onChange handler to also include on along with event */
  onChange?: (event: React.ChangeEvent, on: boolean) => void;

  /** Size of the checkbox and its label, to use the html attribute `size` use `htmlSize` */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** Color of the checkbox and its label */
  color?: "primary" | "secondary" | "tertiary" | "error";

  /** On off Icons to render inside the track beside the thumb
   * @link SwitchIcons
   */
  trackIcons?: SwitchIcons;

  /** On off Icons to render inside the thumb
   * @link SwitchIcons
   */
  thumbIcons?: SwitchIcons;

  /** Slot props for customizing internal elements.
   * ```
   *  `root <div/>
   *   |inputWrapper <div/>
   *   |   |switch <span/>
   *   |   |   |input <input/>
   *   |   |   |track <span/>
   *   |   |   |   |trackIcons <RenderSwitchIcons/>
   *   |   |   |   |thumb <span/>
   *   |   |   |   |   |thumbIcons <RenderSwitchIcons/>
   *   |   |label <label/>
   *   |helperText <TextOrString/>`
   * ```
   */

  slotProps?: {
    root?: ComponentProps<"div">;
    inputWrapper?: ComponentProps<"div">;
    switch?: ComponentProps<"div">;
    track?: ComponentProps<"span">;
    trackIcons?: RenderSwitchIconsProps;
    thumb?: ComponentProps<"span">;
    thumbIcons?: RenderSwitchIconsProps;
    label?: ComponentProps<"label">;
    helperText?: TextOrListProps;
  };
}
export type SwitchIcons = { on?: ReactNode; off?: ReactNode } | ReactNode;
export type RenderSwitchIconsProps = {
  icons: SwitchIcons;
} & ComponentProps<"span">;
