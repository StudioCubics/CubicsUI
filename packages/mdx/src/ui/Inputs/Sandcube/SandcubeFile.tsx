import type { ReactNode } from "react";

export interface SandcubeFileProps {
  children: ReactNode;
  path: string;
  /** Hides the file from the tabs, cannot be selected */
  hidden?: boolean;
  /** Makes the file readonly in the editor */
  readOnly?: boolean;
}
export function SandcubeFile(_: SandcubeFileProps) {
  return null;
}
