import type { ErrorInfo, ReactNode } from "react";

export interface ErrorBoundaryFallbackProps {
  error: Error;
  /** Clears the error and re-renders the children */
  reset: () => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** Static node or render function. Defaults to rendering nothing */
  fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
  /** Called when an error is caught (logging, telemetry, etc.) */
  onError?: (error: Error, info: ErrorInfo) => void;
  /** Called after the boundary is reset, manually or via deps */
  onReset?: () => void;
  /** Boundary resets automatically when any of these values change */
  deps?: unknown[];
}

export interface ErrorBoundaryState {
  error: Error | null;
}
