import { cn } from "@cubicsui/utils";
import { type CSSProperties, Fragment, type ReactElement } from "react";
import styles from "./Kbd.module.css";
import type { ButtonSpec, KbdProps } from "./Kbd.types";
import { KBD_BUTTON_LIST } from "./Kbd.utils";

/** TODO make keyboard tester using this */
export function Kbd(props: KbdProps): ReactElement {
  const { className, buttons, size, realistic, fitContent, ...rest } = props;

  return (
    <div
      className={cn(
        className,
        styles.root,
        realistic && styles.realistic,
        fitContent && styles.fitContent,
      )}
      data-size={size}
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
        // Longest line in characters (spread handles emoji/surrogate pairs)
        const chars = Math.max(...lines.map((l) => [...l].length));
        return (
          <Fragment key={i}>
            <kbd
              className={cn(styles.kbd)}
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

            {i >= 0 && i < buttons.length - 1 && "+"}
          </Fragment>
        );
      })}
    </div>
  );
}
export { KBD_BUTTON_LIST };
