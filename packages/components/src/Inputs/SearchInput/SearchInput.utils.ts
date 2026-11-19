import { cn, type DeepMergeOptions } from "@cubicsui/utils";
import { createElement, Fragment, type ReactNode } from "react";
import type { TextInputProps } from "../TextInput/TextInput.types";
import type { SearchInputProps } from "./SearchInput.types";

/** Splits the SearchInput specific props from textinput props, doesnt split the slotProps tho */
export function splitSearchInputProps(
  props: SearchInputProps = {},
): TextInputProps {
  const {
    triggerType,
    resultType,
    queryResults,
    renderResult,
    resultHeader,
    resultFooter,
    loading,
    renderLoading,
    searchIcon,
    LinkComponent,
    ...textInputProps
  } = props;
  return textInputProps;
}
export const deepMergeOptions: DeepMergeOptions = {
  customMerge: {
    className: (a, b) => cn(a as string, b as string),
    endAdornment: (a, b) =>
      createElement(Fragment, null, a as ReactNode, b as ReactNode),
  },
};
