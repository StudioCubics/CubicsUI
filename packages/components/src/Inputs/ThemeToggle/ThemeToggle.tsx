"use client";

import { useMounted } from "@cubicsui/hooks";
import { mergeEvents } from "@cubicsui/utils";
import {
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useId,
} from "react";
import { Card } from "../../Display/Card/Card";
import { List } from "../../Display/List/List";
import { ListItem } from "../../Display/List/ListItem/ListItem";
import { Popover } from "../../Layout/Popover/Popover";
import { useTheme } from "../../Providers/ThemeProvider/ThemeProvider";
import type { Theme } from "../../Providers/ThemeProvider/ThemeProvider.types";
import { Button } from "../Button/Button";
import type { ThemeObjectValue, ThemeToggleProps } from "./ThemeToggle.types";
import { DEFAULT_THEME_OBJECT, getNextTheme } from "./ThemeToggle.utils";
import { ThemeToggleIcon } from "./ThemeToggleIcon/ThemeToggleIcon";

/** Resolved entry: text is always defined, icon always renderable. */
interface ResolvedEntry extends ThemeObjectValue {
  text: string;
  icon: ReactNode;
}

export function ThemeToggle(props: ThemeToggleProps): ReactElement | null {
  const {
    variant = "icon",
    currentTheme: controlledTheme,
    themeObject = {},
    slotProps = {},
    resolveSystem = false,
  } = props;

  const { theme, setTheme, systemEnabled, resolvedTheme } = useTheme();
  const { mounted } = useMounted();
  const popoverId = useId();

  if (!mounted) return null;

  // Controlled mode: never touch the provider, only call user handlers.
  const isControlled = controlledTheme !== undefined;
  const currentTheme = controlledTheme ?? theme;
  const displayTheme: Theme =
    !isControlled && resolveSystem ? resolvedTheme : currentTheme;

  const themeList = (Object.keys(DEFAULT_THEME_OBJECT) as Theme[]).map(
    (key): [Theme, ResolvedEntry] => [
      key,
      {
        ...DEFAULT_THEME_OBJECT[key],
        ...themeObject[key],
        text: themeObject[key]?.text ?? DEFAULT_THEME_OBJECT[key].text ?? "",
        icon: themeObject[key]?.icon ?? <ThemeToggleIcon currentTheme={key} />,
      },
    ],
  );
  const current = themeList.find(([key]) => key === displayTheme)![1];

  /** Applies a theme change (uncontrolled only), then calls the user's handler. */
  function handleClick(target: Theme, e: MouseEvent) {
    if (!isControlled) setTheme(target);
    themeObject[target]?.onClick?.(e);
  }
  /** Clicking the toggle button cycles to the next theme. */
  function cycleTheme(e: MouseEvent) {
    const next = getNextTheme(currentTheme, {
      systemEnabled,
      resolveSystem,
      resolvedTheme,
    });
    if (!isControlled) setTheme(next);
    themeObject[displayTheme]?.onClick?.(e);
  }

  switch (variant) {
    case "list":
      return (
        <>
          <Button
            {...slotProps.button}
            startIcon={current.icon}
            popoverTarget={popoverId}
          >
            {current.text}
          </Button>
          <Popover {...slotProps.popover} id={popoverId}>
            <Card {...slotProps.card} disablePadding>
              <List size="lg" {...slotProps.list}>
                {themeList.map(([key, entry]) => (
                  <ListItem
                    {...slotProps.listItem}
                    type="item"
                    key={key}
                    onClick={(e) => handleClick(key, e)}
                    icon={entry.icon}
                    data-active={currentTheme === key ? key : undefined}
                  >
                    {entry.text}
                  </ListItem>
                ))}
              </List>
            </Card>
          </Popover>
        </>
      );
    case "full":
      return (
        <Button
          {...slotProps.button}
          startIcon={
            <>
              {slotProps.button?.startIcon}
              {current.icon}
            </>
          }
          onClick={mergeEvents(slotProps.button?.onClick, cycleTheme)}
        >
          {current.text}
        </Button>
      );
    default:
      // Default: "icon"
      return (
        <Button
          {...slotProps.button}
          icon
          onClick={mergeEvents(slotProps.button?.onClick, cycleTheme)}
        >
          {current.icon}
        </Button>
      );
  }
}
