"use client";

import type {
  PolymorphicComponentProps,
  PolymorphicComponentType,
} from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import { type ElementType } from "react";
import styles from "./TableCell.module.css";

export interface TableCellBaseProps {
  selected?: boolean;
}

const defaultElement = "td";
type DefaultElement = typeof defaultElement;

export type TableCellProps<C extends ElementType = DefaultElement> =
  PolymorphicComponentProps<C, TableCellBaseProps>;

function TableCellBase<C extends ElementType = DefaultElement>(
  props: TableCellProps<C>,
) {
  const { as, children, selected, ...rest } =
    props as TableCellProps<DefaultElement>;

  const Component = as || defaultElement;
  const componentProps = {
    className: cn(styles.root, selected ? styles.selected : ""),
    ...rest,
  };

  return <Component {...componentProps}>{children}</Component>;
}

TableCellBase.displayName = "TableCell";

export const TableCell = TableCellBase as PolymorphicComponentType<
  TableCellBaseProps,
  DefaultElement
>;
