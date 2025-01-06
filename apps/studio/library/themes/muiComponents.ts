import type { Components, CssVarsTheme, Theme } from "@mui/material";

const components:
  | Components<Omit<Theme, "components" | "palette"> & CssVarsTheme>
  | undefined = {
  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: "var(--shape-borderRadius)",
        ":before": {
          all: "unset",
        },
        "&.Mui-expanded": {
          borderRadius: "var(--shape-borderRadius)",
          margin: "unset",
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      content: { "&.Mui-expanded": { margin: "unset" } },
      root: {
        padding: "calc(0 * var(--spacing)) calc(4 * var(--spacing))",
      },
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      ol: {
        flexWrap: "nowrap",
      },
    },
  },
  MuiButton: {
    defaultProps: { size: "small", variant: "contained" },
    styleOverrides: {
      root: {
        fontSize: "1em",
        textTransform: "none",
        fontWeight: "bolder",
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundImage: "unset",
        backgroundColor: "var(--palette-background-default)",
        boxShadow: "none",
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: { root: { padding: "calc(5 * var(--spacing))" } },
  },
  MuiDialogContent: { styleOverrides: { root: { padding: "unset" } } },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontFamily: "var(--font-h)",
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: "0.875rem",
        "& > a": {
          fontWeight: "bold",
          textDecoration: "underline",
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: { root: { borderRadius: "var(--shape-borderRadius)" } },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
        color: "inherit",
      },
    },
  },
  MuiListItem: { defaultProps: { disablePadding: true } },
  MuiListItemButton: {
    defaultProps: { disableGutters: true },
    styleOverrides: {
      root: {
        borderRadius: "var(--shape-borderRadius)",
        gap: "calc(2 * var(--spacing))",
        paddingInline: "calc(2 * var(--spacing))",
      },
    },
  },
  MuiPaper: { defaultProps: { elevation: 0 } },
  MuiPopover: {
    styleOverrides: {
      paper: { backgroundColor: "var(--palette-background-default)" },
    },
  },
  MuiSelect: { defaultProps: { size: "small" } },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        transition: "font-size 0.3s var(--transition-tf)",
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
    },
  },
  MuiTooltip: {
    defaultProps: { arrow: true },
  },
};
export default components;
