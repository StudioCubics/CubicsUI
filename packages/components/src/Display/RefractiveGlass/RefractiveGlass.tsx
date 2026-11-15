"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn, mergeRefs } from "@cubicsui/utils";
import { type ElementType, type ReactElement } from "react";
import styles from "./RefractiveGlass.module.css";
import type {
  GlassCSSVariables,
  RefractiveGlassBaseProps,
  RefractiveGlassProps,
} from "./RefractiveGlass.types";
import { useRefractiveGlass } from "./useRefractiveGlass";

/**
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1808785
 * https://bugs.webkit.org/show_bug.cgi?id=245510
 */
function RefractiveGlassBase<C extends ElementType = "div">(
  props: RefractiveGlassProps<C>,
): ReactElement {
  const {
    as,
    ref,
    children,
    className,
    style,
    br = 5.6,
    blur = 2,
    bevelWidth = 10,
    smoothing = 0.14,
    refractionScale = 20,
    reflectionIntensity = 0.3,
    ...rest
  } = props;
  const { glassRef, glassStyle, svgFilterDefs } = useRefractiveGlass({
    br,
    blur,
    bevelWidth,
    smoothing,
    refractionScale,
    reflectionIntensity,
  });
  const Component = as || "div";
  return (
    <>
      {svgFilterDefs}
      <Component
        {...rest}
        ref={mergeRefs(ref, glassRef)}
        className={cn(className, styles.root)}
        style={
          {
            ...style,
            ...glassStyle,
          } as GlassCSSVariables
        }
      >
        {children}
      </Component>
    </>
  );
}
RefractiveGlassBase.displayName = "RefractiveGlass";

export const RefractiveGlass =
  RefractiveGlassBase as PolymorphicComponentType<RefractiveGlassBaseProps>;
