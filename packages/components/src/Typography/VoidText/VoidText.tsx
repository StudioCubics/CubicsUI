import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import type { ElementType } from "react";
import styles from "./VoidText.module.css";
import type { VoidTextProps } from "./VoidText.types";

function VoidTextBase<C extends ElementType = "p">(props: VoidTextProps<C>) {
  const {
    as,
    children = "Welcome to the void!",
    className,
    ...rest
  } = props as VoidTextProps<"p">;
  const Component = as || "p";
  return (
    <Component {...rest} className={cn(className, styles.root)}>
      {children}
    </Component>
  );
}

VoidTextBase.displayName = "VoidText";

export const VoidText = VoidTextBase as PolymorphicComponentType<object, "p">;
