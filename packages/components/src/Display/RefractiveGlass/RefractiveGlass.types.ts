import type { CSSProperties, ReactNode } from 'react';

export interface Vector2D {
  x: number;
  y: number;
}

export interface RefractiveGlassProps {
  /** Content rendered inside the refractive glass container */
  children?: ReactNode;
  /** Optional additional class name for the outer glass wrapper */
  className?: string;
  /** Optional inline styles */
  style?: CSSProperties;
  /** Strength of the SVG displacement refraction (default: 28) */
  refractionScale?: number;
  /** Width of the refractive & reflective bevel rim in pixels (default: 18) */
  bevelWidth?: number;
  /** Backdrop frost blur in pixels (default: 2) */
  blur?: number;
  /** Intensity multiplier (0 to 1.5) for internal rim & caustic reflections (default: 1) */
  reflectionIntensity?: number;
  /** Border radius of the glass card in pixels (default: 28) */
  br?: number;
  /** Damping factor (0.01 to 1) for pointer-tracked reflection smoothing (default: 0.14) */
  smoothing?: number;
  /** Enables dragging the glass card around the viewport (default: true) */
  draggable?: boolean;
  /** Displays live center crosshair, ray vectors, and hit markers (default: false) */
  debug?: boolean;
}

export interface GlassCSSVariables extends CSSProperties {
  '--bevel-width': string;
  '--br': string;
  '--frost-blur': string;
  '--reflection-intensity': string;
  '--near-x': string;
  '--near-y': string;
  '--far-x': string;
  '--far-y': string;
  '--nx': string;
  '--ny': string;
}