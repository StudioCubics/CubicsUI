import type { ReactNode } from "react";
import type { DEFAULT_CALLOUT_TYPES } from "./Callout.utils";

export interface CalloutProps {
  type?: DefaultRemarkCalloutTypes;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  icon?: string;
}

export type DefaultRemarkCalloutTypes = (typeof DEFAULT_CALLOUT_TYPES)[number];
