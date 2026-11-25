"use client";

import { cn } from "@cubicsui/utils";
import {
  type CSSProperties,
  Fragment,
  type ReactElement,
  useEffect,
  useRef,
} from "react";
import styles from "./Kbd.module.css";
import type { ButtonSpec, KbdProps } from "./Kbd.types";
import { getCornerStops, KBD_BUTTON_LIST } from "./Kbd.utils";

/** TODO make keyboard tester using this */
export function Kbd(props: KbdProps): ReactElement {
  const { className, buttons, size, color, realistic, fitContent, ...rest } =
    props;

  const keyRefs = useRef<(HTMLElement | null)[]>([]);

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
  }, [buttons, realistic, fitContent, size]);

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
      {buttons.map((b, i) => {
        const button: ButtonSpec =
          typeof b === "string"
            ? ((KBD_BUTTON_LIST as Record<string, ButtonSpec>)[b] ?? {
                content: b,
              })
            : b;
        const lines = button.content.split("\n");
        const chars = Math.max(...lines.map((l) => [...l].length));

        return (
          <Fragment key={i}>
            <kbd
              ref={(element) => {
                keyRefs.current[i] = element;
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

            {i < buttons.length - 1 && "+"}
          </Fragment>
        );
      })}
    </div>
  );
}

export { KBD_BUTTON_LIST };
