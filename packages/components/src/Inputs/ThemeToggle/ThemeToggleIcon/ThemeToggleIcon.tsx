"use client";

import { useId, type ComponentProps, type ReactElement } from "react";
import { cn } from "@cubicsui/utils";
import styles from "./ThemeToggleIcon.module.css";
import type { Theme } from "../../../Providers/ThemeProvider/ThemeProvider.types";

export function ThemeToggleIcon(
  props: ComponentProps<"svg"> & { currentTheme: Theme },
): ReactElement {
  const { width = 24, height = width, currentTheme, ...rest } = props;
  const id = useId();
  const cl =
    currentTheme == "light"
      ? ""
      : currentTheme == "dark"
        ? styles.isMoon
        : styles.isSunMoon;
  return (
    <svg
      fill="none"
      stroke="currentColor"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn("lucide", styles.root, cl)}
    >
      <mask id={`${id}`} style={{ maskType: "luminance" }}>
        <rect x="0" y="0" width="24" height="24" fill="white" />
        <path
          className={cn(styles.moon, styles.mask)}
          fill="black"
          strokeWidth="0"
          d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
        />
      </mask>
      <g className={styles.sun} mask={`url(#${id})`}>
        <circle pathLength="1" cx="12" cy="12" r="4" />
        <path pathLength="1" d="M12 2v2" />
        <path pathLength="1" d="m19.07 4.93-1.41 1.41" />
        <path pathLength="1" d="M22 12h-2" />
        <path pathLength="1" d="M12 22v-2" />
        <path pathLength="1" d="m4.93 4.93 1.41 1.41" />
        <path pathLength="1" d="m19.07 19.07-1.41-1.41" />
        <path pathLength="1" d="M2 12h2" />
        <path pathLength="1" d="m4.93 19.07 1.41-1.41" />
      </g>
      <path
        className={styles.moon}
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      />
    </svg>
  );
}
