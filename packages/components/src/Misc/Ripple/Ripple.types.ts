import type {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  MouseEvent,
  ReactElement,
  TouchEvent,
} from "react";

export interface UseRippleProps {
  /**
   * duration of the ripple in miliseconds
   * @default 750
   */
  duration?: number;
  /**
   * color of the ripple
   * @default "currentColor"
   */
  color?: CSSProperties["color"];
  /**
   * disabled ripple effect
   * @default false
   */
  disabled?: boolean;
}

export type UseRippleReturns<C extends HTMLElement> = {
  createRipple: (
    event: TouchEvent<C> | MouseEvent<C> | ChangeEvent<C> | FocusEvent<C>,
  ) => void;
  rippleElements: ReactElement[];
};
export interface Ripple {
  key: number;
  size: number;
  x: number;
  y: number;
  blur: number;
}
