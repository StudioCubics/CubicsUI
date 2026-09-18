import type {
  ElementType,
  ComponentProps,
  ReactNode,
  CSSProperties,
} from "react";
import type { GlassCardProps } from "../GlassCard/GlassCard";
import type { MouseEvent } from "react";

export interface ListScriptProps extends ComponentProps<"script"> {
  storageKey: string;
}
export type ListDefaultHrefType = ComponentProps<"a">["href"];
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
export type ListContextProps = ListContextSharedProps & {
  /** Resolves effective collapsed state for an id: explicit toggle > item's own
   * defaultCollapsed > List's defaultCollapsedIds > expanded */
  getCollapsed: (id: string, defaultCollapsed?: boolean) => boolean;
  /** Toggle collapsed state of an item by id, given its current effective collapsed value */
  toggleCollapsed: (id: string, current: boolean) => void;
};
export interface ListUnorderedProps extends ComponentProps<"ul"> {
  ordered?: false;
}
export interface ListOrderedProps extends ComponentProps<"ol"> {
  ordered: true;
}
export type ListProps = ListContextSharedProps & {
  children: ReactNode;
  /** Unique id for this list, used as the localStorage key for collapsed state.
   * If omitted, one is generated with React's useId() — see caveats around
   * stability across reloads if the surrounding tree shape changes.
   */
  id?: string;
  /** Ids of collapsible items collapsed by default before localStorage is read (SSR-safe) */
  defaultCollapsedIds?: string[];
  /** Toggles rendering of indicator not yet implemented */
  renderGlider?: boolean;
  /** Component to use for the glider not yet implemented */
  GliderComponent?: ElementType;
  /** Pass nonce to save yourself from CORS issues */
  nonce?: string;
  /** Props of the script tag */
  scriptProps?: ComponentProps<"script">;
  slotProps?: {
    glider?: GlassCardProps;
  };
} & (ListOrderedProps | ListUnorderedProps);

// --------------------------------

export type ListItemTypeSeparatorProps = ComponentProps<"hr"> & {
  type: "separator";
};
export type ListItemTypeHeaderProps = ComponentProps<"hr"> & {
  type: "header";
  children?: ReactNode;
  renderLine?: boolean;
};
export type ListItemTypeItemProps<H extends ListDefaultHrefType = string> =
  ListSharedProps &
    ComponentProps<"div"> & {
      type?: "item";
      /** Classname of the surface of the input */
      className?: string;
      /**Icon at the start of the list item */
      icon?: ReactNode;
      /** Action at the end of the list item for type collapsible the action is the drop down button */
      action?: ReactNode;
      /** If the list item should be styled to look disabled */
      disabled?: boolean;
      /** If the list item should be styled to look selected */
      selected?: boolean;
      /** An href can be passed and along with the LinkComponent prop a list item can be made to work like a link */
      href?: H;
      /** Renders only the icon in a square, useful for sidebar shortened */
      onlyIcon?: boolean;
      children: ReactNode;
      onClick?: (e: MouseEvent) => void;
      slotProps?: {
        root?: ComponentProps<"li">;
        icon?: ComponentProps<"span">;
        content?: ComponentProps<"span">;
        action?: ComponentProps<"span">;
      };
    };
export type ListItemTypeCollapsibleProps<
  H extends ListDefaultHrefType = string,
> = Omit<ListItemTypeItemProps<H>, "action" | "type" | "slotProps"> & {
  type: "collapsible";
  /** A unique id in the whole list; used as the Set entry the parent List
   * persists to localStorage, and as the DOM id the collapse script targets */
  id: string;
  /** If the sublist should be collapsed initially or not */
  defaultCollapsed?: boolean;
  /** When the sublist is collapsed this will fire */
  onCollapsed?: () => void;

  /** Custom drop down icon */
  dropdownIcon?: ReactNode;
  /** The sublist will be ordered `<ol/>` or unordered `<ul/>` */
  ordered?: boolean;
  /** the nested listitems */
  nodes?: ListItemProps<H>[];
  /** Type of list to be used for the sublist */
  listType?: CSSProperties["listStyleType"];

  slotProps?: {
    /** The li element of the ListItem */
    root?: ComponentProps<"li">;
    /** The span containing the icon of the ListItem */
    icon?: ComponentProps<"span">;
    /** The span containing the content of the ListItem */
    content?: ComponentProps<"span">;
    /** The span containing the dropdownToggle */
    action?: ComponentProps<"span">;
    /** The dropdown toggle button */
    dropdownToggle?: ComponentProps<"button">;
    /** The list rendering the nodes its an `<ol/>` because `<ol/>` has more attributes than `<ul/>` */
    sublist?: ComponentProps<"ol">;
  };
};
export type ListItemProps<H extends ListDefaultHrefType = string> =
  | ListItemTypeSeparatorProps
  | ListItemTypeHeaderProps
  | ListItemTypeItemProps<H>
  | ListItemTypeCollapsibleProps<H>;

export interface ListScriptProps extends ComponentProps<"script"> {
  storageKey: string;
}
