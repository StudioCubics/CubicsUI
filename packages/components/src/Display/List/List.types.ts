import type {
  UseDisclosureGroupProps,
  UseDisclosureGroupReturn,
} from "@cubicsui/hooks";
import type {
  ComponentProps,
  CSSProperties,
  ElementType,
  MouseEvent,
  ReactNode,
} from "react";
import type { GlassCardProps } from "../GlassCard/GlassCard";

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

export type ListContextProps = ListContextSharedProps &
  UseDisclosureGroupReturn;

export interface ListUnorderedProps extends ComponentProps<"ul"> {
  ordered?: false;
}
export interface ListOrderedProps extends ComponentProps<"ol"> {
  ordered: true;
}
export type ListProps = ListContextSharedProps &
  Omit<UseDisclosureGroupProps, "fallbackCollapsed" | "save-only"> & {
    children: ReactNode;
    /** Unique id for this list, used as the localStorage key for collapsed state
     * Providing an id enables persisting unless `persist` is set to false.
     * If omitted, one is generated with React's useId()
     */
    id?: string;
    /** Toggles rendering of indicator not yet implemented */
    renderGlider?: boolean;
    /** Persist collapsed state to localStorage.
     * Defaults to true when an `id` is provided, false otherwise.
     * Setting `persist` without an `id` falls back to a useId() key, which is
     * not stable across client-side navigations, so pass an `id` as well.
     */
    persist?: boolean;
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

// ListItemProps --------------------------------

export type ListItemTypeSeparatorProps = ComponentProps<"hr"> & {
  type: "separator";
};
export type ListItemTypeHeaderProps = ComponentProps<"span"> & {
  type: "header";
  children?: ReactNode;
  /** Wether to render a line as separator or not */
  renderLine?: boolean;
};
export type ListItemTypeItemProps<H extends ListDefaultHrefType = string> =
  ListSharedProps &
    ComponentProps<"li"> & {
      type?: "item";
      /**Icon at the start of the list item */
      icon?: ReactNode;
      /** Actions at the end of the list item for type collapsible the action is the drop down button */
      actions?: ReactNode;
      /** If the list item should be styled to look disabled */
      disabled?: boolean;
      /** If the list item should be styled to look selected */
      selected?: boolean;
      /** An href can be passed and along with the LinkComponent prop a list item can be made to work like a link */
      href?: H;
      /** Renders only the icon in a square, useful for sidebar shortened */
      onlyIcon?: boolean;
      /** The `onClick` for the root is `onRootClick` as this wont be used as much as `onClick` and that is the actual clickable element */
      onRootClick?: ComponentProps<"li">["onClick"];
      /** The `onClick` is actually put into surface as that is meant to be the main clickable element, to access root's `onClick` use `onRootClick` */
      onClick?: (
        e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLDivElement>,
      ) => void;
      /** The node in this renders before the surface */
      beforeSurface?: ReactNode;
      /** The node in this renders after the surface */
      afterSurface?: ReactNode;
      /** Slots available to ListItemTypeItem */
      slotProps?: {
        /** The polymorphic component which can be a `<div/>` or `<a/>` */
        surface?: ComponentProps<"a"> | ComponentProps<"div">;
        /** The `<span/>` containing the icon of the <ListItem/> */
        icon?: ComponentProps<"span">;
        /** The `<span/>` containing the content of the <ListItem/> */
        content?: ComponentProps<"span">;
        /** The `<span/>` containing the dropdownToggle */
        action?: ComponentProps<"span">;
      };
    };
export type ListItemTypeCollapsibleProps<
  H extends ListDefaultHrefType = string,
> = Omit<ListItemTypeItemProps<H>, "action" | "type" | "slotProps"> & {
  type: "collapsible";
  /** A unique id in the whole list; used as the Set entry the parent List
   * persists to localStorage, and as the DOM id the expanded script targets */
  id: string;
  /** If the sublist should be expanded initially or not */
  defaultCollapsed?: boolean;
  /** When the sublist is expanded this will fire */
  onCollapsed?: () => void;
  /** Custom drop down icon */
  dropdownIcon?: ReactNode;
  /** The sublist will be ordered `<ol/>` or unordered `<ul/>` */
  ordered?: boolean;
  /** the nested listitems */
  nodes?: ListItemProps<H>[];
  /** Type of list to be used for the sublist */
  listType?: CSSProperties["listStyleType"];
  /** Slots available to ListItemTypeCollapsible */
  slotProps?: ListItemTypeItemProps["slotProps"] & {
    /** The dropdown toggle button */
    dropdownToggle?: ComponentProps<"button">;
    /** The list rendering the nodes its an `<ol/>` because `<ol/>` has more attributes than `<ul/>` */
    sublist?: ComponentProps<"ol">;
  };
};
/** @template H - This is for making the href types so pathnames can be autocompleted if the types are passed. */
export type ListItemProps<H extends ListDefaultHrefType = string> =
  | ListItemTypeItemProps<H>
  | ListItemTypeCollapsibleProps<H>
  | ListItemTypeSeparatorProps
  | ListItemTypeHeaderProps;
