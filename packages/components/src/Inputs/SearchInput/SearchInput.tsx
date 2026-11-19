"use client";

import { useDisclosure, useId } from "@cubicsui/hooks";
import { SearchIcon } from "@cubicsui/icons";
import { cn, deepMerge, mergeEvents } from "@cubicsui/utils";
import {
  type Context,
  createContext,
  type ReactElement,
  useContext,
} from "react";
import { ListItem } from "../../Display/List/ListItem/ListItem";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button.types";
import { TextInput } from "../TextInput/TextInput";
import type { TextInputProps } from "../TextInput/TextInput.types";
import styles from "./SearchInput.module.css";
import type {
  SearchInputContextProps,
  SearchInputProps,
} from "./SearchInput.types";
import { deepMergeOptions, splitSearchInputProps } from "./SearchInput.utils";

const SearchInputContext: Context<SearchInputContextProps | null> =
  createContext<SearchInputContextProps | null>(null);

function useSearchInput(): SearchInputContextProps {
  const c = useContext(SearchInputContext);
  if (!c)
    throw new Error("Components must be wrapped in <SearchInputProvider/>");
  return c;
}

export function SearchInput(props: SearchInputProps): ReactElement {
  const {
    id: _id,
    triggerType = "full",
    resultType = "inline",
    queryResults = [],
    renderResult = (r) => <ListItem key={r.id}>{r.id}</ListItem>,
    renderLoading = <p>Searching...</p>,
    searchIcon = <SearchIcon />,
    LinkComponent = "a",
    placeholder = "Ctrl+K and type to search",
    ...rest
  } = props;
  const id = useId(_id);
  return (
    <SearchInputContext.Provider
      value={{
        id,
        triggerType,
        resultType,
        queryResults,
        renderResult,
        renderLoading,
        searchIcon,
        LinkComponent,
        placeholder,
        ...rest,
      }}
    >
      <SearchInputTrigger />
      <SearchInputResult />
      {/* Trigger */}
      {/* Results */}
    </SearchInputContext.Provider>
  );
}

function SearchInputTrigger() {
  const { triggerType, resultType } = useSearchInput();
  switch (triggerType) {
    case "icon":
      if (resultType == "dialog") return <SearchInputTriggerButton />;
      else return <SearchInputExpandingTextInput />;
    default:
      if (["dialog", "popover"].includes(resultType!))
        return <SearchInputTextInputTrigger />;
      return <SearchInputTextInput />;
  }
  // Switch for which triggertype should be rendered
}
function SearchInputResult() {
  const { resultType } = useSearchInput();

  // Switch for which resulttype should be rendered
  switch (resultType) {
    case "popover":
      break;
    case "dialog":
      break;
    default:
      break;
  }
  return <></>;
}

function SearchInputTriggerButton(props: ButtonProps) {
  const { searchIcon, slotProps = {} } = useSearchInput();
  return (
    <Button
      {...deepMerge([slotProps.triggerButton, props], deepMergeOptions)}
      icon
    >
      {searchIcon}
    </Button>
  );
}
function SearchInputTextInput(props: TextInputProps) {
  const searchInputProps = useSearchInput();
  const textInputProps = splitSearchInputProps(searchInputProps);
  return (
    <TextInput
      {...deepMerge([textInputProps, props], deepMergeOptions)}
      type="search"
    />
  );
}
function SearchInputExpandingTextInput() {
  const { open, handleToggle } = useDisclosure();
  return (
    <div className={cn(styles.expandingTextInput, open && styles.expanded)}>
      <SearchInputTextInput rootClass={cn(styles.inputRoot)} />
      <SearchInputTriggerButton
        onClick={mergeEvents((e) => {
          e.preventDefault();
        }, handleToggle)}
      />
    </div>
  );
}
function SearchInputTextInputTrigger() {
  const { resultType, id } = useSearchInput();
  const triggerProps =
    resultType == "dialog"
      ? {
          command: "show-modal",
          commandfor: `dialog-${id}`,
        }
      : {
          popoverTarget: `dialog-${id}`,
        };
  if (resultType == "inline") return;
  return (
    <div className={cn(styles.textInputTrigger)}>
      <SearchInputTextInput
        rootClass={cn(styles.inputRoot, styles.textInputTriggerInput)}
      />
      <button
        {...triggerProps}
        className={cn(styles.textInputTriggerButton)}
      ></button>
    </div>
  );
}
