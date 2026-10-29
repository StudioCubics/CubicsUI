import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import type { ElementType } from "react";
import { PageHeader } from "../../Typography/PageHeader/PageHeader";
import styles from "./PageLayout.module.css";
import type { PageLayoutBaseProps, PageLayoutProps } from "./PageLayout.types";

function PageLayoutBase(props: PageLayoutProps) {
  const {
    as,
    titleAs = "h1",
    title,
    desc,
    actions,
    children,
    titleBar,
    footer,
    className,
    size,
    disableContentFlow,
    disableBodyContentFlow,
    disableHeaderContentFlow,
    disableBodyPadding,
    beforeHeader,
    afterHeader,
    slotProps = {},
    ...rest
  } = props;
  const Component = (as || "div") as ElementType;
  const renderHeader = beforeHeader || afterHeader || title || desc || actions;
  return (
    <Component
      {...slotProps.root}
      className={cn(styles.root, slotProps.root?.className)}
      data-size={size}
    >
      {renderHeader && (
        <div
          {...slotProps.header}
          className={cn(
            slotProps.header?.className,
            styles.header,
            !disableContentFlow &&
              !disableHeaderContentFlow &&
              styles.contentFlow,
          )}
        >
          {beforeHeader}
          <PageHeader
            {...rest}
            as={titleAs}
            title={title}
            desc={desc}
            actions={actions}
            className={cn(className, "breakout")}
          />
          {afterHeader}
        </div>
      )}
      {titleBar && (
        <div
          {...slotProps.titleBar}
          className={cn(slotProps.titleBar?.className, styles.titleBar)}
        >
          {titleBar}
        </div>
      )}

      <div
        {...slotProps.body}
        className={cn(
          slotProps.body?.className,
          styles.body,
          !disableBodyPadding && styles.padBodyBlock,
          !disableContentFlow && !disableBodyContentFlow && styles.contentFlow,
        )}
      >
        {children}
      </div>
      {footer}
    </Component>
  );
}
PageLayoutBase.displayName = "PageLayout";

/**
 * A polymorphic PageLayout component.
 *
 * By default it renders a `<main>`, but any element can be used via the `as` prop:
 *
 * ```tsx
 * <PageLayout as="a" href="/docs">Read docs</PageLayout>
 * ```
 */
export const PageLayout = PageLayoutBase as PolymorphicComponentType<
  PageLayoutBaseProps,
  "main"
>;
