import { Children, isValidElement, type ReactNode } from "react";
import { extractText } from "@cubicsui/utils";
import type { SandcubeFileProps } from "./SandcubeFile";
import { SandcubeClient, type SandcubeClientFile } from "./SandcubeClient";

export interface SandcubeProps {
  children: ReactNode;
  title?: string;
  // Path of the file that renders the demo
  entry?: string;
}

export function Sandcube({ children, title, entry }: SandcubeProps) {
  // Runs on the server, where the fenced code is still a plain element tree
  const files: SandcubeClientFile[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const props = child.props as Partial<SandcubeFileProps>;
    if (!props.path) return;
    files.push({
      path: props.path,
      code: extractText(props.children).trim(),
      hidden: props.hidden,
      readOnly: props.readOnly,
    });
  });

  return <SandcubeClient files={files} title={title} entry={entry} />;
}