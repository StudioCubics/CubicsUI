import type { ReactElement } from "react";
import type { CardHeaderProps } from "./CardHeader.types";
import { cn } from "@cubicsui/utils";
import styles from "./CardHeader.module.css";

export function CardHeader(props: CardHeaderProps): ReactElement {
  const { title, desc, action, as = "h3", slotProps = {} } = props;
  const TitleComponent = as;
  return (
    <div
      {...slotProps.root}
      data-slot={"card_header"}
      className={cn(slotProps.root?.className, styles.root)}
    >
      {/* Title */}
      <TitleComponent
        {...slotProps.title}
        className={cn(slotProps.title?.className, styles.title)}
      >
        {title}
      </TitleComponent>

      {/* Action */}
      {action && (
        <div
          {...slotProps.action}
          className={cn(slotProps.action?.className, styles.action)}
        >
          {action}
        </div>
      )}
      {/* Description */}
      {desc && (
        <p
          {...slotProps.desc}
          className={cn(slotProps.desc?.className, styles.desc)}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
