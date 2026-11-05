import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import type { ElementType, ReactElement } from "react";
import styles from "./ResizeHandle.module.css";
import type {
  ResizeHandleBaseProps,
  ResizeHandleProps,
} from "./ResizeHandle.types";

/** An absolutely positioned handle that is styled to be used for resizing panels */
function ResizeHandleBase<C extends ElementType = "span">(
  props: ResizeHandleProps<C>,
): ReactElement {
  const { as, className, color, size, ...rest } =
    props as ResizeHandleProps<"span">;
  const Component = as || "span";

  return (
    <Component
      data-size={size}
      data-color={color}
      className={cn(className, styles.root)}
      {...rest}
    />
  );
}
ResizeHandleBase.displayName = "ResizeHandle";

export const ResizeHandle = ResizeHandleBase as PolymorphicComponentType<
  ResizeHandleBaseProps,
  "span"
>;
