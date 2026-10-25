"use client";

import { useMounted } from "@cubicsui/hooks";
import { cn } from "@cubicsui/utils";
import { type ReactElement, useId } from "react";
import { Card } from "../../Display/Card/Card";
import { List } from "../../Display/List/List";
import { ListItem } from "../../Display/List/ListItem/ListItem";
import { Popover } from "../../Layout/Popover/Popover";
import { useTheme } from "../../Providers/ThemeProvider/ThemeProvider";
import type { Theme } from "../../Providers/ThemeProvider/ThemeProvider.types";
import { Button } from "../Button/Button";
import styles from "./ThemeToggle.module.css";
import type { ThemeObject, ThemeToggleProps } from "./ThemeToggle.types";
import { ThemeToggleIcon } from "./ThemeToggleIcon/ThemeToggleIcon";

const defaultThemeObject: ThemeObject = {
  light: { text: "Light Mode" },
  system: { text: "System Mode" },
  dark: { text: "Dark Mode" },
};

export function ThemeToggle(props: ThemeToggleProps): ReactElement | null {
  const {
    variant = "icon",
    currentTheme: _currentTheme,
    themeObject = {},
    slotProps = {},
    resolveSystem = false,
  } = props;

  const { theme, setTheme, systemEnabled, resolvedTheme } = useTheme();
  const { mounted } = useMounted();
  const popoverId = useId();

  if (!mounted) return null;

  const isControlled = _currentTheme !== undefined;

  const cleanThemeObject: ThemeObject = {
    light: {
      ...defaultThemeObject.light,
      ...themeObject.light,
      onClick: (e) => {
        if (!isControlled) {
          if (systemEnabled) setTheme("system");
          else setTheme("dark");
        }
        themeObject.light?.onClick?.(e);
      },
    },
    system: {
      ...defaultThemeObject.system,
      ...themeObject.system,
      onClick: (e) => {
        if (!isControlled) {
          if (resolveSystem && resolvedTheme === "dark") setTheme("light");
          else setTheme("dark");
        }
        themeObject.system?.onClick?.(e);
      },
    },
    dark: {
      ...defaultThemeObject.dark,
      ...themeObject.dark,
      onClick: (e) => {
        if (!isControlled) {
          setTheme("light");
        }
        themeObject.dark?.onClick?.(e);
      },
    },
  };
  const currentTheme = _currentTheme ?? theme;
  const current = cleanThemeObject[currentTheme];
  const icon = cleanThemeObject[currentTheme].icon ?? (
    <ThemeToggleIcon currentTheme={currentTheme} />
  );
  switch (variant) {
    case "list":
      return (
        <>
          <Button
            {...slotProps.button}
            startIcon={icon}
            popoverTarget={popoverId}
          >
            {current.text}
          </Button>
          <Popover {...slotProps.popover} id={popoverId}>
            <Card {...slotProps.card} disablePadding>
              {/* TODO replace with proper list */}
              <List
                {...slotProps.list}
                className={cn(slotProps.list?.className, styles.list)}
              >
                {Object.entries(cleanThemeObject).map(([k, v]) => {
                  return (
                    <ListItem
                      {...slotProps.listItem}
                      type="item"
                      onClick={(e) => {
                        if (!isControlled) setTheme(k as Theme);
                        themeObject[k as Theme]?.onClick?.(e);
                      }}
                      icon={
                        v.icon ?? <ThemeToggleIcon currentTheme={k as Theme} />
                      }
                      data-active={currentTheme === k ? k : undefined}
                      key={k}
                    >
                      {v.text}
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </Popover>
        </>
      );
    case "full":
      return (
        <Button
          {...slotProps.button}
          startIcon={icon}
          onClick={(e) => {
            current.onClick?.(e);
          }}
        >
          {current.text}
        </Button>
      );
    default:
      return (
        <Button
          {...slotProps.button}
          icon
          onClick={(e) => {
            current.onClick?.(e);
          }}
        >
          {icon}
        </Button>
      );
  }
}
