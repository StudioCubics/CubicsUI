import type { PolymorphicComponentProps, Size2D } from "@cubicsui/types";
import type {
  CSSProperties,
  ElementType,
  ReactElement,
  ReactNode,
  RefObject,
} from "react";

export interface UseRefractiveGlassProps {
  /** Strength of the SVG displacement refraction (default: 28) */
  refractionScale?: number;
  /** Width of the refractive & reflective bevel rim in pixels (default: 18) */
  bevelWidth?: number;
  /** Border radius of the glass card in pixels (default: 28) */
  br?: number;
  /** Damping factor (0.01 to 1) for pointer-tracked reflection smoothing (default: 0.14) */
  smoothing?: number;
  /** Backdrop frost blur in pixels (default: 2) */
  blur?: number;
  /** Intensity multiplier (0 to 1.5) for internal rim & caustic reflections (default: 1) */
  reflectionIntensity?: number;
}
export interface UseRefractiveGlassReturn {
  /** The svg filter element */
  svgFilterDefs: ReactElement;
  /** The size of the box */
  boxSize: Size2D;
  /** The ref for the glass element */
  glassRef: RefObject<HTMLDivElement | null>;
  /** The id of the svg */
  filterId: string;
  /** Inline styles for the glass element */
  glassStyle: GlassCSSVariables;
}
export interface RefractiveGlassBaseProps extends UseRefractiveGlassProps {
  /** Content rendered inside the refractive glass container */
  children?: ReactNode;
  /** Optional additional class name for the outer glass wrapper */
  className?: string;
  /** Optional inline styles */
  style?: CSSProperties;
}
export type RefractiveGlassProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, RefractiveGlassBaseProps>;

export interface GlassCSSVariables extends CSSProperties {
  "--bevel-width": string;
  "--br": string;
  "--frost-blur": string;
  "--reflection-intensity": string;
  "--near-x": string;
  "--near-y": string;
  "--far-x": string;
  "--far-y": string;
  "--nx": string;
  "--ny": string;
}
