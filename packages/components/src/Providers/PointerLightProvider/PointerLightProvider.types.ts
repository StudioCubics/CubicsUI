import type { ComponentProps, CSSProperties, ReactNode } from "react";
import type { SetState } from "@cubicsui/types";

export interface PointerLightScriptProps {
  /** The key that is used to store the theme in localStorage
   * @default "pointerLightPreference"
   */
  storageKey?: string;

  /** Default value when all else fails
   * @default false
   */
  defaultPointerLight?: boolean;
}

export interface PointerLightProviderProps extends PointerLightScriptProps {
  children?: ReactNode;

  slotProps?: { pointerLight?: PointerLightProps };
}
export interface PointerLightContextProps {
  /** If PointerLight is on or not */
  pointerLight: boolean;
  /** Sets the current theme to the name */
  setPointerLight: (on: boolean) => void;
  /** Sets the current theme to the name */
  setPtrLightProps: SetState<PointerLightProps>;
  /** Resets pointer light props to the initial props */
  resetPointerProps: () => void;
}
export interface PointerLightPropsBase {
  /** Center color of the radial gradient */
  colorA?: CSSProperties["color"];
  /** Outer color of the radial gradient */
  colorB?: CSSProperties["color"];
  opacity?: CSSProperties["opacity"];
  slotProps?: {
    root?: ComponentProps<"div">;
  };
}
export type PointerLightProps = PointerLightPropsBase & ComponentProps<"div">;
