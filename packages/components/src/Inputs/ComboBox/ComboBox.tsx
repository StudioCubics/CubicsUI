"use client";

import { useId, type ReactElement } from "react";
import { InputField } from "../InputField/InputField";
import type { InputFieldProps } from "../InputField/InputField.types";
import type { ComboBoxOption, ComboBoxProps } from "./ComboBox.types";
import { cn, mergeRefs } from "@cubicsui/utils";
import { Popover } from "../../Layout/Popover/Popover";
import styles from "./ComboBox.module.css";
import { eventWithRipple } from "../../Misc/Ripple/Ripple";
import { List } from "../../Display/List/List";
import type { ListItemProps } from "../../Display/List/List.types";
import { ListItem } from "../../Display/List/ListItem/ListItem";
import { Card } from "../../Display/Card/Card";
import { Chip } from "../../Display/Chip/Chip";
import { useComboBox } from "./useComboBox";

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
    value: _value,
    defaultValue: _defaultValue,
    onChange: _onChange,
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
    !!error || !!helperText ? `${inputId}-description` : undefined;
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
  } = useComboBox({ ...props, options });

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
  const optionsToListItem: ListItemProps[] = options.map((o): ListItemProps => {
    switch (o.type) {
      case "header":
        return { type: "header", children: o.label };
      case "separator":
        return { type: "separator" };
      case "item":
      case undefined: {
        const selectableIndex = selectableOptions.indexOf(o);
        return {
          type: "item",
          icon: o.icon,
          disabled: o.disabled,
          selected: o.selected ?? selected.includes(getOptionKey(o)),
          className: cn(
            o.className,
            selectableIndex === activeIndex && styles.activeOption,
          ),
          onClick: (e) => {
            o.onClick?.(e);
            handleSelect(o, inputId);
          },
          children: o.label,
        };
      }
    }
  });
  const inputFieldProps: InputFieldProps = {
    label,
    error,
    helperText,
    size,
    beforeSurface: (
      <>
        {beforeSurface}
        {multiple && !!selected.length && (
          <div className={cn(styles.chips)}>
            {selected.map((val, i) => {
              const opt = options.find(
                (o) =>
                  (o.type === "item" || o.type === undefined) &&
                  getOptionKey(o) === val,
              );
              const optLabel =
                opt && opt.type == "item" ? opt.label : String(val);
              const optIcon = opt && opt.type == "item" ? opt.icon : undefined;
              return (
                <Chip
                  variant="outlined"
                  key={i}
                  size={size === "xs" || size === "xl" ? "md" : size}
                  onClose={(e) => {
                    e.stopPropagation();
                    removeChip(val);
                  }}
                  icon={optIcon}
                >
                  {optLabel}
                  {name && (
                    <input type="hidden" name={name} value={String(val)} />
                  )}
                </Chip>
              );
            })}
          </div>
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
              onClick={(_) => {
                eventWithRipple(createRipple);
                setPopoverActive(!popoverActive);
                inputRef.current?.focus();
                inputRef.current?.select();
              }}
              onFocus={() => {
                inputRef.current?.focus();
                inputRef.current?.select();
              }}
              onTouchStart={eventWithRipple(createRipple)}
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
                  {filterOptions(optionsToListItem).map((otli, i) => (
                    <ListItem {...(otli as ListItemProps)} key={i} />
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
function normalizeOptions<T>(
  aosOptions: (string | ComboBoxOption<T>)[],
): ComboBoxOption<T>[] {
  return aosOptions.map((a) => {
    if (typeof a === "string") return { type: "item", label: a };
    return a;
  });
}
