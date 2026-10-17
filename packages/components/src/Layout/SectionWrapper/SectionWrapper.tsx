import { cn } from "@cubicsui/utils";
import type { ReactElement } from "react";
import type { SectionWrapperProps } from "./SectionWrapper.types";
import styles from "./SectionWrapper.module.css";

export function SectionWrapper(props: SectionWrapperProps): ReactElement {
  const {
    id,
    className,
    children,
    title,
    subtitle,
    noBorders,
    keepFirstBorder,
    TitleElement = "h4",
    color,
    size = "md",
    htmlTitle,
    slotProps = {},
    ...rest
  } = props;
  const noHeader = !title && !subtitle;
  return (
    <section
      {...rest}
      className={cn(
        className,
        styles.root,
        noBorders && styles.noBorders,
        noHeader && styles.noHeader,
      )}
      data-color={color}
      data-size={size}
      title={htmlTitle}
      id={id}
    >
      {!noHeader && (
        <div
          {...slotProps.header}
          className={cn(styles.header, slotProps.header?.className)}
        >
          {typeof title == "string" ? (
            <TitleElement
              {...slotProps.title}
              className={cn(slotProps.title?.className, styles.title)}
            >
              {title}
            </TitleElement>
          ) : (
            title
          )}
          {subtitle && typeof subtitle == "string" ? (
            <p
              {...slotProps.subtitle}
              className={cn(slotProps.subtitle?.className, styles.subtitle)}
            >
              {subtitle}
            </p>
          ) : (
            subtitle
          )}
        </div>
      )}
      <div
        {...slotProps.content}
        className={cn(styles.content, slotProps.content?.className)}
      >
        {children}
      </div>
    </section>
  );
}
