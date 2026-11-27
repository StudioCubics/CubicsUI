"use client";

import type { ReactElement } from "react";
import type { ListItemProps } from "../List.types";
import { ListItemTypeCollapsible } from "./ListItemTypeCollapsible";
import { ListItemTypeHeader } from "./ListItemTypeHeader";
import { ListItemTypeItem } from "./ListItemTypeItem";
import { ListItemTypeSeparator } from "./ListItemTypeSeparator";

export function ListItem<H extends string = string>(
  props: ListItemProps<H>,
): ReactElement {
  const { type } = props;
  switch (type) {
    case "separator":
      return <ListItemTypeSeparator {...props} />;
    case "collapsible":
      return <ListItemTypeCollapsible {...props} />;
    case "header":
      return <ListItemTypeHeader {...props} />;
    default:
      return <ListItemTypeItem {...props} />;
  }
}
