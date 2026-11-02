import { PageLayoutTOC } from "@cubicsui/components";
import { cn } from "@cubicsui/utils";
import styles from "./PageLayoutMD.module.css";
import type { PageLayoutMDProps } from "./PageLayoutMD.types";

/** Based on PageLayoutTOC */
export function PageLayoutMd(props: PageLayoutMDProps) {
  const { breadcrumbs, slotProps = {}, titleBar, ...rest } = props;
  return (
    <PageLayoutTOC
      titleBar={
        breadcrumbs ? (
          <>
            {breadcrumbs}
            {titleBar}
          </>
        ) : (
          titleBar
        )
      }
      slotProps={{
        ...slotProps,
        sidebarViewport: {
          ...slotProps?.sidebarViewport,
          className: cn(slotProps?.sidebarViewport?.className, styles.root),
        },
      }}
      {...rest}
    />
  );
}
