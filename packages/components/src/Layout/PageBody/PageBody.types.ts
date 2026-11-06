import type { PolymorphicComponentProps } from "@cubicsui/types";
import type { ElementType } from "react";

type PersistWithId =
  | {
      /** Persists the scrollPosition of the body, requires an id to be passed*/
      persistScrollPosition: true;
      id: string;
    }
  | {
      persistScrollPosition?: false;
      id?: undefined;
    };
export type PageBodyBaseProps = PersistWithId & {
  /** Removes padding around body */
  disablePadding?: boolean;
  /** Removes contentFlow styles */
  disableContentFlow?: boolean;
};
export type PageBodyProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, PageBodyBaseProps>;
