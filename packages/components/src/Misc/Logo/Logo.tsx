"use client";
import { useId, type ReactElement } from "react";
import type { LogoProps } from "./Logo.types";

export function Logo(props: LogoProps): ReactElement {
  const {
    onlyFavicon,
    faviconViewBox = " ",
    favicon,
    faviconClass,
    onlyText,
    textViewBox = " ",
    text,
    textClass,
    viewBox,
    style,
    ...rest
  } = props;

  const faviconMaskId = useId();

  const [textX, textY, textWidth, textHeight] = textViewBox
    .split(" ")
    .map(Number);

  return (
    <svg
      viewBox={onlyFavicon ? faviconViewBox : onlyText ? textViewBox : viewBox}
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style }}
      {...rest}
    >
      <defs>
        <mask id={faviconMaskId} maskUnits="userSpaceOnUse">
          <rect x="-50%" y="-50%" width="200%" height="200%" fill="white" />
          <rect
            x={textX}
            y={textY}
            width={textWidth}
            height={textHeight}
            fill="black"
          />
        </mask>
      </defs>
      {/* Favicon */}
      <g
        mask={`url(#${faviconMaskId})`}
        className={faviconClass}
        style={{
          transition: `all var(--transition-time) var(--transition-tf)`,
          scale: onlyText ? "0" : "1",
        }}
      >
        {favicon}
      </g>
      {/* Logo text */}
      <g
        className={textClass}
        style={{
          transition: `all var(--transition-time) var(--transition-tf)`,
          scale: onlyFavicon ? "0" : "1",
        }}
      >
        {text}
      </g>
    </svg>
  );
}
