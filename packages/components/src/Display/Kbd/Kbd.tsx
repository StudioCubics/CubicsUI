"use client";

import { cn } from "@cubicsui/utils";
import {
  type CSSProperties,
  Fragment,
  type ReactElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import styles from "./Kbd.module.css";
import type { KbdProps } from "./Kbd.types";
import { getCornerStops, KBD_BUTTON_LIST, normalizeButtons } from "./Kbd.utils";

export function Kbd(props: KbdProps): ReactElement | null {
  const {
    className,
    keys,
    size,
    color,
    realistic,
    fitContent,
    grouped,
    ...rest
  } = props;

  const keyRefs = useRef<(HTMLElement | null)[]>([]);
  const normalizedButtons = useMemo(() => normalizeButtons(keys), [keys]);

  useEffect(() => {
    if (!realistic) return;
    const observers: ResizeObserver[] = [];
    keyRefs.current.forEach((element) => {
      if (!element) return;
      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry.target.getBoundingClientRect();
        if (!width || !height) return;
        const stops = getCornerStops(width, height);

        element.style.setProperty("--stop-top-right", `${stops.topRight}%`);
        element.style.setProperty(
          "--stop-bottom-right",
          `${stops.bottomRight}%`,
        );
        element.style.setProperty("--stop-bottom-left", `${stops.bottomLeft}%`);
        element.style.setProperty("--stop-top-left", `${stops.topLeft}%`);
      });

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [keys, realistic, fitContent, size]);
  if (!keys) return null;

  return (
    <div
      className={cn(
        className,
        styles.root,
        realistic && styles.realistic,
        fitContent && styles.fitContent,
      )}
      data-size={size}
      data-color={color}
      {...rest}
    >
      {normalizedButtons.map((combo, comboIndex) => (
        <Fragment key={comboIndex}>
          {comboIndex > 0 && " / "}

          {grouped ? (
            <kbd className={styles.kbd}>
              {combo.map((button, keyIndex) => (
                <Fragment key={keyIndex}>
                  {keyIndex > 0 && "+"}
                  {button.content}
                </Fragment>
              ))}
            </kbd>
          ) : (
            combo.map((button, keyIndex) => {
              const lines = button.content.split("\n");
              const chars = Math.max(...lines.map((line) => [...line].length));

              return (
                <Fragment key={keyIndex}>
                  {keyIndex > 0 && "+"}
                  <kbd
                    ref={(element) => {
                      keyRefs.current.push(element);
                    }}
                    className={styles.kbd}
                    style={
                      {
                        "--kbd-size-x": button.sizeX ?? 1,
                        "--kbd-size-y": button.sizeY ?? 1,
                        "--kbd-chars": chars,
                        "--kbd-lines": lines.length,
                      } as CSSProperties
                    }
                  >
                    {button.content}
                  </kbd>
                </Fragment>
              );
            })
          )}
        </Fragment>
      ))}
    </div>
  );
}

export { KBD_BUTTON_LIST };
