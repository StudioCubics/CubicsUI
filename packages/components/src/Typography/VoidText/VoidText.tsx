import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import type { ElementType } from "react";
import styles from "./VoidText.module.css";
import type { VoidTextBaseProps, VoidTextProps } from "./VoidText.types";

function VoidTextBase<C extends ElementType = "div">(props: VoidTextProps<C>) {
  const {
    as,
    className,
    title = "Nothing found!",
    subtitle,
    image,
    slotProps = {},
    ...rest
  } = props as VoidTextProps<"div">;
  const Component = as || "div";
  return (
    <Component {...rest} className={cn(className, styles.root)}>
      {title && (
        <span
          {...slotProps.image}
          className={cn(slotProps.image?.className, styles.image)}
        >
          {image}
        </span>
      )}
      {title && (
        <p
          {...slotProps.title}
          className={cn(slotProps.title?.className, styles.title)}
        >
          {title}
        </p>
      )}
      {subtitle && (
        <p
          {...slotProps.subtitle}
          className={cn(slotProps.subtitle?.className, styles.subtitle)}
        >
          {subtitle}
        </p>
      )}
    </Component>
  );
}

VoidTextBase.displayName = "VoidText";

export const VoidText = VoidTextBase as PolymorphicComponentType<
  VoidTextBaseProps,
  "div"
>;
