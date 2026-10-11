import type { ButtonProps } from "@cubicsui/components";
import type { ComponentProps, ReactNode } from "react";

export type CodeBlockProps = {
  /** An icon that will be rendered from `@cubiscui/icons` just pass the name of the icon in string */
  icon?: string;
  /** The title that will be rendered in the headerr */
  title?: string;
  /** The main content of the code element */
  children?: ReactNode;
  /** Name of the code block along with the extension */
  id?: string;
};
export type CodeBlockClientProps = ComponentProps<"div"> &
  CodeBlockProps & {
    code: string;
    name: string;
    slotProps?: {
      root?: ComponentProps<"div">;
      header?: ComponentProps<"header">;
      headerContent?: ComponentProps<"span">;
      icon?: ComponentProps<"span">;
      copy?: ButtonProps;
    };
  };
