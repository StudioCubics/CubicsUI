"use client";
import { useContrast, useTheme } from "@cubicsui/components";
import { useEffect, useRef, useState } from "react";

// Shows the resolved value of a CSS variable next to its name
export function CssVarValue({
  name,
  wrapWithSpan,
}: {
  name: string;
  wrapWithSpan?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { resolvedTheme } = useTheme();
  const { contrast } = useContrast();
  const [value, setValue] = useState("");
  const prevTheme = useRef<typeof resolvedTheme>(null);
  const prevContrast = useRef<typeof contrast>(null);
  useEffect(() => {
    if (
      ref.current &&
      (prevTheme.current !== resolvedTheme || prevContrast.current !== contrast)
    ) {
      setValue(getComputedStyle(ref.current).getPropertyValue(name).trim());
      prevTheme.current = resolvedTheme;
      prevContrast.current = contrast;
    }
  }, [name, resolvedTheme, contrast]);
  const Component = wrapWithSpan ? "span" : "code";

  return <Component ref={ref}>{value}</Component>;
}
