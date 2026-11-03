"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "./ErrorBoundary.types";

const hasChanged = (a: unknown[] = [], b: unknown[] = []) => {
  if (a.length !== b.length) return true;
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) return true;
  }
  return false;
};

/**
 * Catches errors thrown while rendering its children and shows a fallback
 * instead of crashing the whole tree.
 * Does not catch errors from event handlers, async code (promises,
 * `setTimeout`) or server-side rendering.
 *
 * @example
 * ```tsx
 * <ErrorBoundary
 *   deps={[files]}
 *   onError={(error, info) => console.error(error, info.componentStack)}
 *   fallback={({ error, reset }) => (
 *     <div>
 *       <pre>{error.message}</pre>
 *       <button onClick={reset}>Try again</button>
 *     </div>
 *   )}
 * >
 *   <Demo />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  /**
   * Stores the caught error in state so the next render shows the fallback.
   * Runs during the render phase, so it must stay free of side effects.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(
    prevProps: ErrorBoundaryProps,
    prevState: ErrorBoundaryState,
  ): void {
    // Only reset if the error was already showing before this update,
    // otherwise a changed key on the same render that threw would instantly clear it
    if (
      this.state.error !== null &&
      prevState.error !== null &&
      hasChanged(prevProps.deps, this.props.deps)
    ) {
      this.reset();
    }
  }

  /**
   * Clears the current error and re-renders the children.
   * Also exposed to the fallback render function as `reset`.
   */
  reset = (): void => {
    this.props.onReset?.();
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    const { fallback = null, children } = this.props;

    if (error) {
      // You can render any custom fallback UI
      return typeof fallback === "function"
        ? fallback({ error, reset: this.reset })
        : fallback;
    }

    return children;
  }
}
