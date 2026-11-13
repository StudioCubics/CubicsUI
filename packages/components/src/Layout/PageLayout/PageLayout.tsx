import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import type { ElementType } from "react";
import { PageHeader } from "../../Typography/PageHeader/PageHeader";
import { ContentFlow } from "../ContentFlow/ContentFlow";
import { PageBody } from "../PageBody/PageBody";
import styles from "./PageLayout.module.css";
import type { PageLayoutBaseProps, PageLayoutProps } from "./PageLayout.types";

function PageLayoutBase<C extends ElementType = "div">(
  props: PageLayoutProps<C>,
) {
  const {
    as,
    id,
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
    disableHeaderContentFlow,
    disableBodyContentFlow,
    disableFooterContentFlow,
    disableBodyPadding,
    disableBodyWrapper,
    beforeHeader,
    afterHeader,
    persistScrollPosition,
    collapseHeaderOnScroll,
    slotProps = {},
    ...rest
  } = props as PageLayoutProps<"div">;

  const Component = (as || "div") as ElementType;
  const renderHeader = beforeHeader || afterHeader || title || desc || actions;
  const HeaderWrapper =
    !disableContentFlow && !disableHeaderContentFlow ? ContentFlow : "div";
  const FooterWrapper =
    !disableContentFlow && !disableFooterContentFlow ? ContentFlow : "div";

  return (
    <Component
      {...rest}
      id={id}
      className={cn(
        styles.root,
        collapseHeaderOnScroll && styles.collapseHeaderOnScroll,
        className,
      )}
    >
      {renderHeader && (
        <HeaderWrapper
          {...slotProps?.headerWrapper}
          className={cn(
            slotProps.headerWrapper?.className,
            styles.headerWrapper,
          )}
        >
          {beforeHeader}
          <PageHeader
            {...slotProps.header}
            as={titleAs}
            title={title}
            desc={desc}
            actions={actions}
            className={cn(slotProps.header?.className, "breakout")}
          />
          {afterHeader}
        </HeaderWrapper>
      )}
      {titleBar && (
        <div
          {...slotProps.titleBar}
          className={cn(slotProps.titleBar?.className, styles.titleBar)}
        >
          {titleBar}
        </div>
      )}
      {disableBodyWrapper ? (
        children
      ) : (
        <PageBody
          {...slotProps.body}
          className={cn(
            slotProps.body?.className,
            collapseHeaderOnScroll && styles.scrollTimeline,
          )}
          disableContentFlow={disableContentFlow || disableBodyContentFlow}
          disablePadding={disableBodyPadding}
          id={`PageBody-${id}`}
          persistScrollPosition={persistScrollPosition}
        >
          {children}
        </PageBody>
      )}
      {footer && (
        <FooterWrapper
          {...slotProps?.footer}
          className={cn(slotProps.footer?.className, styles.footer)}
        >
          {footer}
        </FooterWrapper>
      )}
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
