import type { ComponentProps } from "react";
import type {
  InputFieldSharedProps,
  InputFieldSlotProps,
} from "../InputField/InputField.types";
import type { TextOrListProps } from "../../Typography/TextOrList/TextOrList";

export interface PasswordInputProps
  extends
    Omit<ComponentProps<"input">, "size" | "type">,
    InputFieldSharedProps {
  /** size attribute of the html `<input size=""/>` element */
  htmlSize?: ComponentProps<"input">["size"];

  /** Removes the toggle button for showing or hiding the password */
  disableVisibilityToggle?: boolean;

  /** Enables password strength meter below the password input, pass down the score using slotProps.score */
  enableStrengthMeter?: boolean;

  /**
   * The slot props for the `<PasswordInput/>`, extends InputFieldSlotProps
   * ```
   *  `root <div/>
   *   |label <label/>
   *   |{beforeSurface}
   *   |inputSurface <div/>
   *   |   |startAdornment <span/>
   *   |   |inputWrapper <span/>
   *   |   |   |input <input/>
   *   |   |   |visibilityToggle <button/>
   *   |   |   |   |visibilityIcon <svg/>
   *   |   |endAdornment <span/>
   *   |   |{ripple}
   *   |strengthMeter <PasswordStrengthMeter/>
   *   |{afterSurface}
   *   |helperText <TextOrString/>`
   * ```
   * @link PasswordInputSlotProps
   */
  slotProps?: PasswordInputSlotProps;
}

export interface PasswordInputSlotProps extends InputFieldSlotProps {
  /** Wraps the input and visibility toggle button */
  inputWrapper?: ComponentProps<"span">;

  /** Button containing the visibility toggle of the password */
  visibilityToggle?: ComponentProps<"button">;

  /** Props for the PasswordStrengthMeter if enabled */
  strengthMeter?: PasswordStrengthMeterProps;
}
export interface PasswordStrengthMeterProps extends ComponentProps<"div"> {
  /** Strength of the password from 0-4, the strength value can be got from something like https://github.com/zxcvbn-ts/zxcvbn
   * ```
   * These values are from zxcvbn
   * 0 = too guessable: risky password. (guesses < 10^3)
   * 1 = very guessable: protection from throttled online attacks. (guesses < 10^6)
   * 2 = somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)
   * 3 = safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)
   * 4 = very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)
   * ```
   * @default 0
   */
  score?: number;

  /** Array with length of 5, containing custom words for each score
   * @default
   * ["Weak", "Okay", "Good", "Strong", "Very strong"]
   */
  scoreWords?: string[];

  /** Feedback regarding the password provided by the user, will prioritize rendering warning before suggestions */
  feedback?: { warning?: string; suggestions?: string[] };

  /**
   * SlotProps for PasswordStrength
   * ```
   * root
   *   |meterWrapper
   *     |meter
   *     |scoreWord
   *   |feedback
   * ```
   */
  slotProps?: PasswordStrengthMeterSlotProps;
}

export interface PasswordStrengthMeterSlotProps {
  /** A div wrapping the meter and scoreWord */
  meterWrapper?: ComponentProps<"div">;

  /** A div wrapping the meter `<span/>` bars */
  meter?: ComponentProps<"div">;

  /** A div containing the words for the score */
  scoreWord?: ComponentProps<"div">;

  /** The InputHelperText used to show the feedback
   * @link TextOrListProps
   */
  feedback?: TextOrListProps;
}
