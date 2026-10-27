import { cn } from "@cubicsui/utils";
import type { ReactElement } from "react";
import styles from "./PageHeader.module.css";
import type { PageHeaderProps } from "./PageHeader.types";

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
      <TitleComponent
        {...slotProps.title}
        className={cn(slotProps.title?.className, styles.title)}
      >
        {title}
      </TitleComponent>
      {actions && (
        <div
          {...slotProps.action}
          className={cn(slotProps.action?.className, styles.action)}
        >
          {actions}
        </div>
      )}
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
