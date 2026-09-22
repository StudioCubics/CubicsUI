import type { ListItemProps } from "@cubicsui/components";
import type { Route } from "next";

export const componentsMeta: ListItemProps<Route>[] = [
  {
    type: "collapsible",
    id: "display",
    children: "Display",
    nodes: [
      { children: "Card", href: "/components/card" },
      { children: "Chip", href: "/components/chip" },
      { children: "GlassCard", href: "/components/glassCard" },
      { children: "List", href: "/components/list" },
      { children: "Tabs", href: "/components/tabs" },
    ],
  },

  {
    type: "collapsible",
    id: "inputs",
    children: "Inputs",
    nodes: [
      { children: "Button", href: "/components/button" },
      { children: "Checkbox", href: "/components/checkbox" },
      { children: "CloseButton", href: "/components/closeButton" },
      { children: "ComboBox", href: "/components/comboBox" },
      { children: "PasswordInput", href: "/components/passwordInput" },
      { children: "Select", href: "/components/select" },
      { children: "Switch", href: "/components/switch" },
      { children: "TextAreaInput", href: "/components/textAreaInput" },
      { children: "TextInput", href: "/components/textInput" },
      { children: "ThemeToggle", href: "/components/themeToggle" },
    ],
  },

  {
    type: "collapsible",
    id: "layout",
    children: "Layout",
    nodes: [
      { children: "Popover", href: "/components/popover" },
      {
        children: "SidebarLayout",
        href: "/components/sidebarLayout",
      },
    ],
  },

  {
    type: "collapsible",
    id: "misc",
    children: "Misc",
    nodes: [
      {
        children: "Ripple",
        disabled: true,
      },
      { children: "Logo", href: "/components/logo" },
    ],
  },

  {
    type: "collapsible",
    id: "providers",
    children: "Providers",
    nodes: [
      { children: "ThemeProvider", href: "/components/themeProvider" },
      {
        children: "ContrastProvider",
        href: "/components/contrastProvider",
      },
      {
        children: "PointerLightProvider",
        href: "/components/pointerLightProvider",
      },
    ],
  },

  {
    type: "collapsible",
    id: "typography",
    children: "Typography",
    nodes: [{ children: "TextOrList", href: "/components/textOrList" }],
  },
];
