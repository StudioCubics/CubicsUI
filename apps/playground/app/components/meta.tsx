import type { ListItemProps } from "@cubicsui/components";
import type { Route } from "next";

export const componentsMeta: ListItemProps<Route>[] = [
  {
    type: "collapsible",
    id: "display",
    children: "Display",
    nodes: [
      { type: "separator" },
      { children: "Card", href: "/components/card" },
      { children: "Chip", href: "/components/chip" },
      { children: "GlassCard", href: "/components/glassCard" },
      { children: "List", href: "/components/list" },
    ],
  },

  {
    type: "collapsible",
    id: "inputs",
    children: "Inputs",
    nodes: [
      { type: "separator" },
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
      { type: "separator" },
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
      { type: "separator" },
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
      { type: "separator" },
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
    nodes: [
      { type: "separator" },
      { children: "TextOrList", href: "/components/textOrList" },
    ],
  },
];
