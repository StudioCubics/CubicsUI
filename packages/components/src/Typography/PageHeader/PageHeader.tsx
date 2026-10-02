import type { ReactElement } from "react";
import type { PageHeaderProps } from "./PageHeader.types";
import { cn } from "@cubicsui/utils";
import styles from "./PageHeader.module.css";

export function PageHeader(props: PageHeaderProps): ReactElement {
  const {
    title,
    desc,
    actions,
    as = "h1",
    slotProps = {},
    className,
    ...rest
  } = props;
  const TitleComponent = as;
  return (
    <header {...rest} className={cn(className, styles.root)}>
      {/* Title */}
      <TitleComponent
        {...slotProps.title}
        className={cn(slotProps.title?.className, styles.title)}
      >
        {title}
      </TitleComponent>

      {/* Action */}
      {actions && (
        <div
          {...slotProps.action}
          className={cn(slotProps.action?.className, styles.action)}
        >
          {actions}
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
    </header>
  );
}
