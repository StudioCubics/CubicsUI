import type {
  ElementType,
  ComponentProps,
  ReactNode,
  CSSProperties,
} from "react";
import type { GlassCardProps } from "../GlassCard/GlassCard";
import type { MouseEvent } from "react";

export type ListSharedProps = {
  /** The component to use for the href passed, something like the NextJS Link can be passed
   * @default "a"
   */
  LinkComponent?: ElementType;
  color?: "primary" | "secondary" | "tertiary" | "error" | "warn" | "success";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};
export type ListContextSharedProps = ListSharedProps & {
  /** If the selected state has to be set from the List instead of individually on every ListItem*/
  selectedWhen?: (props: ListItemProps) => boolean;
  /** Type of list to be used for the list and all sublists */
  listType?: CSSProperties["listStyleType"];
};
export type ListContextProps = ListContextSharedProps & {};
export interface ListUnorderedProps extends ComponentProps<"ul"> {
  ordered?: false;
}
export interface ListOrderedProps extends ComponentProps<"ol"> {
  ordered: true;
}
export type ListProps = ListContextSharedProps & {
  children: ReactNode;
  /** Toggles rendering of marker not yet implemented */
  renderMarker?: boolean;
  /** Component to use for the marker not yet implemented */
  MarkerComponent?: ElementType;
  slotProps?: {
    marker?: GlassCardProps;
  };
} & (ListOrderedProps | ListUnorderedProps);

export type ListItemTypeSeparatorProps = ComponentProps<"hr"> & {
  type: "separator";
};
export type ListItemTypeHeaderProps = ComponentProps<"hr"> & {
  type: "header";
  children?: ReactNode;
  renderLine?: boolean;
};
export type ListItemTypeItemProps = ListSharedProps & {
  type?: "item";
  /**Icon at the start of the list item */
  icon?: ReactNode;
  /** Action at the end of the list item for type collapsible the action is the drop down button */
  action?: ReactNode;
  /** If the list item should be styled to look disabled */
  disabled?: boolean;
  /** If the list item should be styled to look selected */
  selected?: boolean;
  /** An href can be passed and along with the LinkComponent prop a list item can be made to work like a link */
  href?: ComponentProps<"a">["href"];
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
};
export type ListItemTypeCollapsibleProps = Omit<
  ListItemTypeItemProps,
  "action" | "type"
> & {
  type: "collapsible";
  /** A unique id in the whole list, will be used to persist state in localstorage */
  id: string;
  /** If the collapsible list item should be collapsed initially or not */
  collapsed?: boolean;
  onCollapsed?: () => void;
  ordered?: boolean;
  /** the nested listitems */
  nodes?: ListItemProps[];
  /** Type of list to be used for the sublist */
  listType?: CSSProperties["listStyleType"];
};
export type ListItemProps =
  | ListItemTypeSeparatorProps
  | ListItemTypeHeaderProps
  | ListItemTypeItemProps
  | ListItemTypeCollapsibleProps;
