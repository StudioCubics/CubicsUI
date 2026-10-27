import type { ReactNode } from "react";

export interface CalloutProps {
  type?: "note" | "tip" | "important" | "warning" | "caution";
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}
