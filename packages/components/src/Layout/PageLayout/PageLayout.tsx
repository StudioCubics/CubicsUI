import styles from "./PageLayout.module.css";
import type { ElementType } from "react";
import { cn } from "@cubicsui/utils";
import type { PolymorphicComponentType } from "@cubicsui/types";
import type { PageLayoutBaseProps, PageLayoutProps } from "./PageLayout.types";
import { PageHeader } from "../../Typography/PageHeader/PageHeader";
function PageLayoutBase(props: PageLayoutProps) {
  const { as, children, titleBar, footer, slotProps = {}, ...rest } = props;
  const Component = (as || "main") as ElementType;
  return (
    <Component
      {...slotProps.root}
      className={cn(styles.root, slotProps.root?.className)}
    >
      <PageHeader {...rest} />
      {titleBar && (
        <div
          {...slotProps.titleBar}
          className={cn(styles.titleBar, slotProps.titleBar?.className)}
        >
          {titleBar}
        </div>
      )}

      <div
        {...slotProps.body}
        className={cn(styles.body, slotProps.body?.className)}
      >
        {children}
      </div>
      {footer && (
        <div
          {...slotProps.footer}
          className={cn(styles.footer, slotProps.footer?.className)}
        >
          {footer}
        </div>
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
