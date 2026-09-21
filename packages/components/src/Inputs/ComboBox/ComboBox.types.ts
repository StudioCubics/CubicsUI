import type { ComponentProps, MouseEvent, ReactNode, RefObject } from "react";
import type {
  InputFieldSharedProps,
  InputFieldSlotProps,
} from "../InputField/InputField.types";
import type { PopoverProps } from "../../Layout/Popover/Popover.types";
import type { CardProps } from "../../Display/Card/Card.types";
import type { ListProps } from "../../Display/List/List.types";
import type { SetState } from "@cubicsui/types";

export type ComboBoxProps<
  T,
  Multiple extends boolean | undefined = false,
> = Omit<
  ComponentProps<"input">,
  "size" | "type" | "value" | "onChange" | "multiple"
> &
  InputFieldSharedProps & {
    /** Type anything as selection and it will be added to the selection */
    freeSolo?: boolean;
    /** Dont allow more than these many selections */
    limitSelections?: number;
    /** Renders chips on beforeSurface to represent multiple selections */
    multiple?: Multiple;
    /** Options to select the value from */
    options?: (ComboBoxOption<T> | string)[];
    /**@default "," */
    chipSeparator?: string;
    /** Uncontrolled initial value(s). An array when `multiple` is true, otherwise a single value. */
    defaultValue?: Multiple extends true ? T[] : T;
    /** Selected value(s). An array when `multiple` is true, otherwise a single value. */
    value?: Multiple extends true ? T[] : T;
    /** Called with an array when `multiple` is true, otherwise a single value. */
    onChange?: (value: Multiple extends true ? T[] : T) => void;

    /**
     * The slot props for the `<TextAreaInput/>`
     * ```
     *  `root <div/>
     *   |label <label/>
     *   |{beforeSurface}
     *   |chips <div/>
     *   |inputSurface <div/>
     *   |   |startAdornment <span/>
     *   |   |container <div/>
     *   |   |   |popoverTrigger <button/>
     *   |   |   |input <input/>
     *   |   |   |popover <Popover/>
     *   |   |   |   |card <Card/>
     *   |   |   |   |   |list <Card/>
     *   |   |endAdornment <span/>
     *   |   |{ripple}
     *   |{afterSurface}
     *   |helperText <TextOrString/>`
     * ```
     * @link TextAreaInputSlotProps
     */
    slotProps?: ComboBoxSlotProps;
  };
export type ComboBoxOption<T> =
  | {
      type?: "item";
      icon?: ReactNode;
      className?: string;
      label: string;
      value?: T;
      disabled?: boolean;
      selected?: boolean;
      onClick?: (e: MouseEvent) => void;
    }
  | { type: "separator" }
  | { type: "header"; label: string };

export interface ComboBoxSlotProps extends InputFieldSlotProps {
  /** Contains the {popoverTrigger} {input} {popover}  */
  container?: ComponentProps<"div">;
  /** A button that triggers the popover */
  popoverTrigger?: ComponentProps<"button">;
  /** The popover with all the options */
  popover?: PopoverProps;
  /** The card rendering the list of options */
  card?: CardProps;
  /** The list containing the options as ListItems */
  list?: ListProps;
}
export type UseComboBoxReturns<T> = {
  /** Value of the input element */
  inputValue: string;
  /** To set the value of the input element */
  setInputValue: SetState<string>;
  /** If the options popover is shown or not */
  popoverActive: boolean;
  /** Open or close the options popover */
  setPopoverActive: SetState<boolean>;
  /** The index of the element that is selected when navigating with keyboard */
  activeIndex?: number;
  /** The ref of the input element */
  inputRef: RefObject<HTMLInputElement | null>;
  /** The selected options */
  selected: T[];
  /** Get the key that identifies the option */
  getOptionKey: (o: ComboBoxOption<T>) => T;
  /** Handles an option being selected */
  handleSelect: (option: ComboBoxOption<T>, inputId: string) => void;
  /** Handles removing a chip */
  removeChip: (val: T) => void;
  /** Handles changes to the input element */
  handleInputChange: (raw: string) => void;
  /** The function use to filter the options */
  filterOptions: (items: { type?: string; children?: unknown }[]) => {
    type?: string;
    children?: unknown;
  }[];
  /** Filters selectable options */
  filterSelectableOptions: () => ComboBoxOption<T>[];
  /** Attach to the input element to handle arrow and enter navigation */
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    inputId: string,
  ) => void;
};

export type ComboBoxChipsProps<T> = Pick<
  UseComboBoxReturns<T>,
  "selected" | "getOptionKey" | "removeChip"
> & {
  options: ComboBoxOption<T>[];
  name: ComboBoxProps<T>["name"];
  size: ComboBoxProps<T>["size"];
};
