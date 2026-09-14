"use client";
import { type ReactElement } from "react";
import type { LogoProps } from "./Logo.types";

export function Logo(props: LogoProps): ReactElement {
  const {
    onlyFavicon,
    faviconViewBox,
    favicon,
    faviconClass,
    onlyText,
    textViewBox,
    text,
    textClass,
    viewBox,
    ...rest
  } = props;
  return (
    <svg
      viewBox={onlyFavicon ? faviconViewBox : onlyText ? textViewBox : viewBox}
      xmlns="http://www.w3.org/2000/svg"

      {...rest}
    >
      {/* Favicon */}
      <g
        className={faviconClass}
        style={{
          transition: "all var(--transition-time) var(--transition-tf)",
          scale: onlyText ? "0" : "1",
          opacity: onlyText ? "0" : "1",
        }}
      >
        {favicon}
      </g>
      {/* Logo text */}
      <g
        className={textClass}
        style={{
          transition: "all var(--transition-time) var(--transition-tf)",
          scale: onlyFavicon ? "0" : "1",
          opacity: onlyFavicon ? "0" : "1",
        }}
      >
        {text}
      </g>
    </svg>
  );
}
