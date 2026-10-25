"use client";

import { cn, mergeRefs } from "@cubicsui/utils";
import { type ReactElement, useId } from "react";
import { Card } from "../../Display/Card/Card";
import { List } from "../../Display/List/List";
import type { ListItemProps } from "../../Display/List/List.types";
import { ListItem } from "../../Display/List/ListItem/ListItem";
import { Popover } from "../../Layout/Popover/Popover";
import { InputField } from "../InputField/InputField";
import type { InputFieldProps } from "../InputField/InputField.types";
import styles from "./ComboBox.module.css";
import type { ComboBoxProps } from "./ComboBox.types";
import { normalizeOptions } from "./ComboBox.utils";
import { ComboBoxChips } from "./ComboBoxChips";
import { useComboBox } from "./useComboBox";

// TODO add overriding chips and options react nodes
export function ComboBox<T, Multiple extends boolean | undefined = false>(
  props: ComboBoxProps<T, Multiple>,
): ReactElement {
  const {
    label,
    error,
    helperText,
    size,
    beforeSurface,
    afterSurface,
    startAdornment,
    endAdornment,
    fullWidth,
    disablePadding,
    disableRipple,
    rootClass,
    slotProps = {},

    id,
    className,
    onTouchStart,
    onClick,
    value,
    defaultValue,
    onChange,
    multiple,
    options: _options = [],
    limitSelections,
    freeSolo,
    disabled,
    name,
    chipSeparator,
    ...inputProps
  } = props;
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const descriptionId =
    error || helperText ? `${inputId}-description` : undefined;
  const options = normalizeOptions(_options);

  const {
    inputValue,
    popoverActive,
    setPopoverActive,
    inputRef,
    selected,
    activeIndex,
    getOptionKey,
    handleSelect,
    removeChip,
    handleInputChange,
    filterOptions,
    filterSelectableOptions,
    handleKeyDown,
  } = useComboBox({
    value,
    defaultValue,
    onChange,
    multiple,
    freeSolo,
    limitSelections,
    chipSeparator,
    options,
  });

  const selectableOptions = filterSelectableOptions();
  // icon of the currently selected option, shown next to inputValue when not multiple
  const selectedIcon = (() => {
    if (multiple || selected.length === 0) return undefined;
    const opt = options.find(
      (o) =>
        (o.type === "item" || o.type === undefined) &&
        getOptionKey(o) === selected[0],
    );
    return opt && opt.type !== "separator" && opt.type !== "header"
      ? opt.icon
      : undefined;
  })();
  const listItemKeys = new WeakMap<ListItemProps, string>();

  const optionsToListItem: ListItemProps[] = options.map(
    (o, index): ListItemProps => {
      let props: ListItemProps;
      let key: string;
      switch (o.type) {
        case "header":
          key = `header-${index}`;
          props = { ...o, type: "header", children: o.label };
          break;
        case "separator":
          key = `separator-${index}`;
          props = { ...o, type: "separator" };
          break;
        case "item":
        case undefined: {
          key = `item-${String(getOptionKey(o))}`;
          const selectableIndex = selectableOptions.indexOf(o);
          props = {
            ...o,
            type: "item",
            icon: o.icon,
            disabled: o.disabled,
            selected: o.selected ?? selected.includes(getOptionKey(o)),
            className: cn(
              o.className,
              selectableIndex >= 0 &&
                selectableIndex === activeIndex &&
                styles.activeOption,
            ),
            onClick: (e) => {
              o.onClick?.(e);
              handleSelect(o, inputId);
            },
            children: o.label,
          };
          break;
        }
      }
      listItemKeys.set(props, key);
      return props;
    },
  );
  const inputFieldProps: InputFieldProps = {
    label,
    error,
    helperText,
    size,
    beforeSurface: (
      <>
        {beforeSurface}
        {multiple && !!selected.length && (
          <ComboBoxChips
            name={name}
            size={size}
            selected={selected}
            options={options}
            getOptionKey={getOptionKey}
            removeChip={removeChip}
          />
        )}
      </>
    ),
    afterSurface,
    startAdornment: (
      <>
        {startAdornment}
        {!multiple && selectedIcon}
      </>
    ),
    endAdornment,
    fullWidth,
    disablePadding,
    disableRipple,
    rootClass,
    slotProps,

    inputId,
    descriptionId,
  };
  return (
    <InputField {...inputFieldProps}>
      {({ createRipple }) => {
        return (
          <div
            className={cn(
              styles.container,
              disablePadding && styles.disablePadding,
            )}
          >
            <button
              className={cn(
                styles.popoverTrigger,
                popoverActive && styles.popoverActive,
              )}
              type="button"
              popoverTarget={`popover-${inputId}`}
              disabled={disabled}
              onClick={(e) => {
                createRipple(e);
                setPopoverActive(!popoverActive);
                inputRef.current?.focus();
                inputRef.current?.select();
              }}
              onFocus={() => {
                inputRef.current?.focus();
                inputRef.current?.select();
              }}
            ></button>

            <input
              {...inputProps}
              ref={mergeRefs(inputRef)}
              disabled={disabled}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, inputId)}
              name={!multiple ? name : undefined}
              id={inputId}
              className={cn(className, styles.input)}
            />
            <Popover
              anchorWidth
              onClose={() => setPopoverActive(false)}
              id={`popover-${inputId}`}
            >
              <Card size="sm">
                <List size="sm">
                  {filterOptions(optionsToListItem).map((otli) => (
                    <ListItem
                      {...(otli as ListItemProps)}
                      key={listItemKeys.get(otli as ListItemProps)}
                    />
                  ))}
                </List>
              </Card>
            </Popover>
          </div>
        );
      }}
    </InputField>
  );
}
