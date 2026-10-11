import type { ReactNode } from "react";

export interface SandcubeProps {
  children: ReactNode;
  /** Title of the Sandcube */
  title?: string;
  /** Path of the file that renders the demo */
  entry?: string;
}
export interface SandcubeClientFile {
  path: string;
  code: string;
  hidden?: boolean;
  readOnly?: boolean;
}

export interface SandcubeClientProps {
  files: SandcubeClientFile[];
  title?: string;
  /** Path of the file that renders the demo */
  entry?: string;
}

interface SandcubeFileState {
  code: string;
  /** Not shown in the tabs */
  hidden: boolean;
  /** Not editable in the editor */
  readOnly: boolean;
  /** Original code, for reset / "modified" indicators */
  initialCode: string;
}

export type SandcubeFiles = Record<string, SandcubeFileState>;
