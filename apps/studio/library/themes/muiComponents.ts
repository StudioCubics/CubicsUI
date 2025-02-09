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
      content: {
        "& > .MuiTypography-root": {
          fontFamily: "var(--font-h)",
        },
        "&.Mui-expanded": {
          margin: "unset",
          "& > .MuiTypography-root": {
            color: "var(--palette-text-secondary)",
          },
        },
      },
      root: {
        padding: "calc(0 * var(--spacing)) calc(4 * var(--spacing))",
        "&.Mui-expanded": {
          minHeight: "3rem",
        },
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        position: "relative",
        padding:
          "calc(1 * var(--spacing)) calc(4 * var(--spacing)) calc(4 * var(--spacing))",
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      listbox: { background: "var(--palette-background-default)" },
      popper: {
        background: "var(--palette-background-default)",
        borderRadius: "var(--shape-borderRadius)",
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
  MuiButtonGroup: {
    styleOverrides: {
      firstButton: { borderRight: "1px solid var(--palette-divider)" },
      middleButton: { borderRight: "1px solid var(--palette-divider)" },
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
  MuiDialogContent: {
    styleOverrides: {
      root: { padding: "unset", maxWidth: "unset" },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontFamily: "var(--font-h)",
        "& > span": {
          color: "var(--palette-primary-main)",
          "&.error": {
            color: "var(--palette-error-main)",
          },
        },
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        marginLeft: "unset",
        marginRight: "unset",
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
  MuiMenu: {
    styleOverrides: {
      paper: {
        // border: "1px solid var(--palette-divider)",
        backgroundImage: "unset",
        backgroundColor: "rgba(var(--palette-background-paperChannel) / 0.8)",
        backdropFilter: "blur(3px)",
        boxShadow: "none",
      },
    },
  },

  MuiPaper: {
    defaultProps: { elevation: 0 },
  },

  MuiPopover: {
    styleOverrides: {
      paper: { backgroundColor: "var(--palette-background-default)" },
    },
  },
  MuiSelect: {
    defaultProps: { size: "small" },
    styleOverrides: {
      select: {
        height: "1.4375rem",
        minHeight: "unset",
      },
    },
  },
  MuiSkeleton: {
    defaultProps: { animation: "wave", variant: "rounded" },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        transition: "font-size 0.3s var(--transition-tf)",
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "unset",
        fontFamily: "var(--font-h)",
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
