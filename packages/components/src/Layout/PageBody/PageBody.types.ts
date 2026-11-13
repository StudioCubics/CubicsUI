import type { PersistScrollPositionWithId } from "@cubicsui/hooks";
import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ElementType } from "react";

export type PageBodyBaseProps = PersistScrollPositionWithId & {
  /** Removes padding around body */
  disablePadding?: boolean;
  /** Removes contentFlow styles */
  disableContentFlow?: boolean;
};
export type PageBodyProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, PageBodyBaseProps>;
