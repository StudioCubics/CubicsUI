import type { PageLayoutTOCProps } from "@cubicsui/components";
import type { ReactNode } from "react";

export interface PageLayoutMDProps extends PageLayoutTOCProps {
  breadcrumbs?: ReactNode;
}
