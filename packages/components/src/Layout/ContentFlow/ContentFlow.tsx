import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import type { ElementType } from "react";
import styles from "./ContentFlow.module.css";
import type {
  ContentFlowBaseProps,
  ContentFlowProps,
} from "./ContentFlow.types";

function ContentFlowBase(props: ContentFlowProps) {
  const { as, size, className, ...rest } = props;
  const Component = (as || "div") as ElementType;
  return (
    <Component
      {...rest}
      className={cn(className, size && styles.sizes, styles.contentFlow)}
      data-size={size}
    />
  );
}
ContentFlowBase.displayName = "ContentFlow";

export const ContentFlow = ContentFlowBase as PolymorphicComponentType<
  ContentFlowBaseProps,
  "div"
>;
