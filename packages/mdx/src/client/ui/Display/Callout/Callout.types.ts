import type { ReactNode } from "react";
import type { DefaultRemarkCalloutType } from "../../../../server/plugins/remarkCallout/remarkCallout.types";

export interface CalloutProps {
  type?: DefaultRemarkCalloutType;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  icon?: string;
}
