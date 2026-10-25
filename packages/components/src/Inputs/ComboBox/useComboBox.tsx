import { useEffect, useRef, useState } from "react";
import type {
  ComboBoxOption,
  ComboBoxProps,
  UseComboBoxReturns,
} from "./ComboBox.types";

function getOptionKey<T>(o: ComboBoxOption<T>): T {
  return o.type === "separator" || o.type === "header"
    ? (undefined as T)
    : ((o.value ?? o.label) as T);
}
export function useComboBox<T, M extends boolean | undefined>(
  props: Pick<
    ComboBoxProps<T, M>,
    | "value"
    | "defaultValue"
    | "onChange"
    | "multiple"
    | "options"
    | "freeSolo"
    | "limitSelections"
    | "chipSeparator"
  >,
): UseComboBoxReturns<T> {
  const {
    value,
    defaultValue,
    onChange,
    multiple,
    freeSolo,
    options: _options = [],
    limitSelections,
    chipSeparator = ",",
  } = props;

  const options = (_options ?? []) as unknown as ComboBoxOption<T>[];
  const [inputValue, setInputValue] = useState(() => {
    if (multiple) return "";
    const initial = value ?? defaultValue;
    if (initial === undefined) return "";
    const match = options.find(
      (o) =>
        (o.type === "item" || o.type === undefined) &&
        getOptionKey<T>(o) === initial,
    );
    return match && match.type !== "separator" && match.type !== "header"
      ? match.label
      : String(initial);
  });
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // keyboard-highlighted index within the *selectable* filtered options
  const inputRef = useRef<HTMLInputElement>(null);

  // Internal selection state, kept in sync with a controlled `value` prop
  const [selected, setSelected] = useState<T[]>(() => {
    const initial = value ?? defaultValue;
    return multiple
      ? ((initial as T[] | undefined) ?? [])
      : initial !== undefined
        ? [initial as T]
        : [];
  });

  // helper: value if provided, otherwise fall back to label as identity

  useEffect(() => {
    if (value === undefined) return;
    setSelected(multiple ? (value as T[]) : [value as T]);
  }, [value, multiple]);

  // Resync internal state on native form reset. Only applies when uncontrolled
  // if `value` is provided, the parent owns resetting it.
  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form || value !== undefined) return;

    function handleReset() {
      if (multiple) {
        setSelected((defaultValue as T[] | undefined) ?? []);
        setInputValue("");
      } else {
        const initial = defaultValue;
        setSelected(initial !== undefined ? [initial as T] : []);
        const match = options.find(
          (o) =>
            (o.type === "item" || o.type === undefined) &&
            getOptionKey<T>(o) === initial,
        );
        setInputValue(
          match && match.type !== "separator" && match.type !== "header"
            ? match.label
            : initial !== undefined
              ? String(initial)
              : "",
        );
      }
    }

    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [options, defaultValue, multiple, value]);

  function emitChange(next: T[]) {
    setSelected(next);
    onChange?.((multiple ? next : next[0]) as M extends true ? T[] : T);
  }

  function handleSelect(option: ComboBoxOption<T>, inputId: string) {
    if (
      option.type === "separator" ||
      option.type === "header" ||
      option.disabled
    )
      return;
    const key = getOptionKey<T>(option);
    if (multiple) {
      const exists = selected.includes(key);
      if (exists) {
        emitChange(selected.filter((v) => v !== key));
      } else {
        emitChange(
          limitSelections && selected.length >= limitSelections
            ? selected
            : [...selected, key],
        );
      }
      setInputValue("");
    } else {
      emitChange([key]);
      setInputValue(option.label);
      document.getElementById(`popover-${inputId}`)?.hidePopover();
      setPopoverActive(false);
    }
  }

  function removeChip(val: T) {
    emitChange(selected.filter((v) => v !== val));
  }

  // Resolves a raw typed token to an option's key, matching by label (case-insensitive)
  function resolveTypedToken(token: string): T | undefined {
    const trimmed = token.trim();
    if (!trimmed) return undefined;
    const match = options.find(
      (o) =>
        (o.type === "item" || o.type === undefined) &&
        o.label.toLowerCase() === trimmed.toLowerCase(),
    );
    if (match) return getOptionKey<T>(match);
    return freeSolo ? (trimmed as unknown as T) : undefined;
  }

  function handleInputChange(raw: string) {
    if (multiple && raw.includes(chipSeparator)) {
      const parts = raw.split(chipSeparator);
      const remainder = parts.pop() ?? "";
      const newKeys: T[] = [];
      const unresolved: string[] = [];
      for (const part of parts) {
        if (!part.trim()) continue;
        const key = resolveTypedToken(part);
        if (key !== undefined) {
          if (!selected.includes(key) && !newKeys.includes(key)) {
            newKeys.push(key);
          }
        } else {
          unresolved.push(part.trim());
        }
      }
      if (newKeys.length) {
        emitChange([...selected, ...newKeys]);
      }
      const rejoined = [...unresolved, remainder.trimStart()]
        .filter(Boolean)
        .join(`${chipSeparator} `);
      setInputValue(rejoined);
    } else {
      setInputValue(raw);
    }
    setActiveIndex(-1);
  }

  // Substring filter against the current input value. Headers and separators are
  // dropped once a query is active, since they're just structural and shouldn't
  // linger in a filtered result set.
  function filterOptions(items: { type?: string; children?: unknown }[]) {
    const query = inputValue.trim().toLowerCase();
    if (!query) return items;
    return items.filter(
      (item) =>
        item.type === "item" &&
        typeof item.children === "string" &&
        item.children.toLowerCase().includes(query),
    );
  }

  // Same substring filter, applied to raw ComboBoxOptions, kept only to selectable "item" entries
  // so keyboard navigation and click-navigation stay index-aligned.
  function filterSelectableOptions(): ComboBoxOption<T>[] {
    const query = inputValue.trim().toLowerCase();
    return options.filter(
      (o) =>
        (o.type === "item" || o.type === undefined) &&
        !o.disabled &&
        (!query || o.label.toLowerCase().includes(query)),
    );
  }

  // Arrow-key navigation, Enter to select the active option
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    inputId: string,
  ) {
    const selectable = filterSelectableOptions();

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!popoverActive) {
          document.getElementById(`popover-${inputId}`)?.showPopover();
          setPopoverActive(true);
        }
        setActiveIndex((i) => (i + 1) % selectable.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!popoverActive) {
          document.getElementById(`popover-${inputId}`)?.showPopover();
          setPopoverActive(true);
        }
        setActiveIndex((i) => (i - 1 + selectable.length) % selectable.length);
        break;
      case "Enter":
        // A keyboard-highlighted option takes priority over free text
        if (popoverActive && activeIndex >= 0 && selectable[activeIndex]) {
          e.preventDefault();
          handleSelect(selectable[activeIndex], inputId);
          break;
        }
        if (multiple && freeSolo) {
          const key = resolveTypedToken(inputValue);
          if (key !== undefined) {
            e.preventDefault(); // don't submit the surrounding form
            const limitReached =
              limitSelections !== undefined &&
              selected.length >= limitSelections;
            if (!selected.includes(key) && !limitReached) {
              emitChange([...selected, key]);
            }
            setInputValue("");
            setActiveIndex(-1);
          }
        }
        break;
    }
  }

  return {
    inputValue,
    setInputValue,
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
  };
}
