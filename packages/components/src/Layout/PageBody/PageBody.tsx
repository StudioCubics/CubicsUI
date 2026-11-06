"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import type { ElementType, ReactElement } from "react";
import { ContentFlow } from "../ContentFlow/ContentFlow";
import styles from "./PageBody.module.css";
import type { PageBodyBaseProps, PageBodyProps } from "./PageBody.types";

function PageBodyBase<C extends ElementType>(
  props: PageBodyProps<C>,
): ReactElement {
  const { as, className, disablePadding, disableContentFlow, ...rest } =
    props as PageBodyProps<"div">;

  const Component: ElementType = disableContentFlow ? as || "div" : ContentFlow;

  return (
    <Component
      {...rest}
      {...(!disableContentFlow && { as })}
      className={cn(
        className,
        styles.root,
        disablePadding && styles.disablePadding,
      )}
    />
  );
}

PageBodyBase.displayName = "PageBody";

export const PageBody = PageBodyBase as PolymorphicComponentType<
  PageBodyBaseProps,
  ElementType
>;
