import type { ComponentProps } from "react";

export interface LogoProps extends ComponentProps<"svg"> {
  onlyFavicon?: boolean;
  faviconViewBox?: ComponentProps<"svg">["viewBox"];
  favicon?: ComponentProps<"svg">["children"];
  faviconClass?: ComponentProps<"g">["className"];
  onlyText?: boolean;
  textViewBox?: ComponentProps<"svg">["viewBox"];
  text?: ComponentProps<"svg">["children"];
  textClass?: ComponentProps<"g">["className"];
  viewBox?: ComponentProps<"svg">["viewBox"];
}

