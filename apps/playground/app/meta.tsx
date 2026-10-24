import type { ListItemProps } from "@cubicsui/components";
import {
  BrushIcon,
  CodeXMLIcon,
  ComponentIcon,
  FishingHookIcon,
  ToolCaseIcon,
  XIcon,
} from "@cubicsui/icons";
import type { Route } from "next";
import type { ReactNode } from "react";

export const componentsMeta: ListItemProps<Route>[] = [
  // Global Styles
  {
    type: "collapsible",
    id: "globalStyles",
    children: "Global Styles",
    href: "/components/globalStyles",
    nodes: [
      { children: "Typography", href: "/components/globalStyles/typography" },
      { children: "Colors", href: "/components/globalStyles/colors" },
    ],
  },
  // Display
  {
    type: "collapsible",
    id: "display",
    children: "Display",
    nodes: [
      { children: "Accordion", href: "/components/accordion" },
      { children: "Card", href: "/components/card" },
      { children: "Chip", href: "/components/chip" },
      { children: "GlassCard", href: "/components/glassCard" },
      {
        children: "LabeledValue",
        href: "/components/labeledValue",
      },
      { children: "List", href: "/components/list" },
      { children: "TableOfContents", disabled: true, icon: "🚧" },
      { children: "Tabs", href: "/components/tabs" },
      { children: "Tooltip", disabled: true, icon: "🚧" },
    ],
  },
  // Inputs
  {
    type: "collapsible",
    id: "inputs",
    children: "Inputs",
    nodes: [
      { children: "Button", href: "/components/button" },
      { children: "Checkbox", href: "/components/checkbox" },
      { children: "CloseButton", href: "/components/closeButton" },
      { children: "ComboBox", href: "/components/comboBox" },
      {
        children: "CopyButton",
        disabled: true,
        icon: "🚧",
      },
      {
        children: "InputField",
        disabled: true,
        icon: "🚧",
      },
      { children: "PasswordInput", href: "/components/passwordInput" },
      { children: "Rolodex", href: "/components/rolodex", icon: "🚧" },
      { children: "Select", href: "/components/select" },
      { children: "Switch", href: "/components/switch" },
      { children: "TextAreaInput", href: "/components/textAreaInput" },
      { children: "TextInput", href: "/components/textInput" },
      { children: "ThemeToggle", href: "/components/themeToggle" },
    ],
  },
  // Layout
  {
    type: "collapsible",
    id: "layout",
    children: "Layout",
    nodes: [
      {
        children: "PageLayout",
        disabled: true,
        icon: "🚧",
      },
      {
        children: "PageLayoutTOC",
        disabled: true,
        icon: "🚧",
      },
      { children: "Popover", href: "/components/popover" },
      {
        children: "SectionWrapper",
        href: "/components/sectionWrapper",
      },
      {
        children: "SidebarLayout",
        href: "/components/sidebarLayout",
      },
      { children: "Table", href: "/components/table", icon: "🚧" },
    ],
  },
  // Providers
  {
    type: "collapsible",
    id: "providers",
    children: "Providers",
    nodes: [
      {
        children: "ContrastProvider",
        href: "/components/contrastProvider",
      },
      {
        children: "PointerLightProvider",
        href: "/components/pointerLightProvider",
      },
      { children: "ThemeProvider", href: "/components/themeProvider" },
    ],
  },
  // Typography
  {
    type: "collapsible",
    id: "typography",
    children: "Typography",
    nodes: [
      { children: "PageHeader", href: "/components/pageHeader" },
      { children: "TextOrList", href: "/components/textOrList" },
    ],
  },
  // Misc
  {
    type: "collapsible",
    id: "misc",
    children: "Misc",
    nodes: [
      { children: "Logo", href: "/components/logo" },
      {
        children: "Ripple",
        disabled: true,
        icon: "🚧",
      },
    ],
  },
];
export const hooksMeta: ListItemProps<Route>[] = [
  { children: "usePointerPosition", href: "/hooks/usePointerPosition" },
];
export const utilsMeta: ListItemProps<Route>[] = [
  { children: "cn()", href: "/utils/cn" },
];
export const iconsMeta: ListItemProps<Route>[] = [
  { icon: <XIcon />, children: "XIcon", href: "/icons/xicon" },
];
export type CubicsUISiteMapValue = {
  icon: ReactNode;
  label: string;
  pkg: string;
  meta: ListItemProps<Route>[];
};
export type CubicsUISiteMap = Record<string, CubicsUISiteMapValue>;

export const siteMap: CubicsUISiteMap = {
  components: {
    icon: <ComponentIcon width="1em" />,
    label: "Components",
    pkg: "@cubicsui/components",
    meta: componentsMeta,
  },
  hooks: {
    icon: <FishingHookIcon width="1em" />,
    label: "Hooks",
    pkg: "@cubicsui/hooks",
    meta: hooksMeta,
  },
  icons: {
    icon: <BrushIcon width="1em" />,
    label: "Icons",
    pkg: "@cubicsui/icons",
    meta: iconsMeta,
  },
  mdx: {
    icon: <CodeXMLIcon width="1em" />,
    label: "MDX",
    pkg: "@cubicsui/mdx",
    meta: [],
  },
  types: {
    icon: <BrushIcon width="1em" />,
    label: "Types",
    pkg: "@cubicsui/types",
    meta: [],
  },
  utils: {
    icon: <ToolCaseIcon width="1em" />,
    label: "Utilities",
    pkg: "@cubicsui/utils",
    meta: utilsMeta,
  },
};
