import type { ComponentProps } from "react";

export interface LogoProps extends ComponentProps<"svg"> {
  /** Renders only the favicon of the favicon*/
  onlyFavicon?: boolean;
  /** The viewbox of the favicon*/
  faviconViewBox: Required<ComponentProps<"svg">["viewBox"]>;
  /** The paths or svg elements of only the favicon*/
  favicon: Required<ComponentProps<"svg">["children"]>;
  /** Classname that will be passed to the `<g/>` wrapping the favicon*/
  faviconClass?: ComponentProps<"g">["className"];
  /** Renders only the text of the logo */
  onlyText?: boolean;
  /** The viewbox of the text*/
  textViewBox: Required<ComponentProps<"svg">["viewBox"]>;
  /** The paths or svg elements of only the text*/
  text: Required<ComponentProps<"svg">["children"]>;
  /** Classname that will be passed to the `<g/>` wrapping the text*/
  textClass?: ComponentProps<"g">["className"];
  /** The viewbox of the full svg icon */
  viewBox: ComponentProps<"svg">["viewBox"];
}
