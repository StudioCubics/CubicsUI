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
    disableBodyWrapper,
    beforeHeader,
    afterHeader,
    slotProps = {},
    ...rest
  } = props as PageLayoutProps<"div">;

  const Component = (as || "div") as ElementType;
  const renderHeader = beforeHeader || afterHeader || title || desc || actions;
  const HeaderWrapper =
    !disableContentFlow && !disableHeaderContentFlow ? ContentFlow : "div";

  return (
    <Component {...rest} className={cn(styles.root, className)}>
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
          disableContentFlow={disableContentFlow || disableBodyContentFlow}
          disablePadding={disableBodyPadding}
        >
          {children}
        </PageBody>
      )}
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
