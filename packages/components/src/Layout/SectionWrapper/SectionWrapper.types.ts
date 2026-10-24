import type { ComponentProps, ReactNode } from "react";

export interface SectionWrapperProps extends Omit<
  ComponentProps<"section">,
  "title"
> {
  /** The title of the section if string is passed it will be used for the id, pass id if the title is a ReactNode */
  title?: ReactNode;
  /** Subtitle below the title */
  subtitle?: ReactNode;
  /** Removes border top from the section */
  noBorders?: boolean;
  /** Color of the title and subtitle */
  color?: "primary" | "secondary" | "tertiary" | "error";
  /** Size of the gaps and spacing between elements inside */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Element to be used for the title */
  TitleElement?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** If for some reason the html title of the section is required use this */
  htmlTitle?: ComponentProps<"section">["title"];
  slotProps?: {
    header?: ComponentProps<"div">;
    title?: ComponentProps<"h4">;
    subtitle?: ComponentProps<"p">;
    content?: ComponentProps<"div">;
  };
}
